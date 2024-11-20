import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import dayjs from "dayjs";
import { eq, or } from "drizzle-orm";
import Elysia, { t } from "elysia";
import invariant from "tiny-invariant";

import AuthProvider from "~/enums/auth-provider";
import serverEnv from "~/helpers/env-server";
import { tryOrNull, tryOrNullAsync } from "~/helpers/fallible";
import { convertToUsername } from "~/helpers/user";
import { db } from "~/server/db";
import type { Entity, ID } from "~/server/db/id";
import { userSessionTable, userTable } from "~/server/db/schema";
import GoogleOAuth from "~/server/oauth/google";

export const authRoute = new Elysia({ prefix: "/auth" })
  .get(
    "/login/google",
    ({ cookie }) => {
      const state = generateState();
      const codeVerifier = generateCodeVerifier();
      const url = GoogleOAuth.client.createAuthorizationURL(
        state,
        codeVerifier,
        GoogleOAuth.scope,
      );

      cookie.oauth.set({
        value: { state, codeVerifier },
        path: "/",
        httpOnly: true,
        secure: serverEnv.VITE_APP_ENV === "production",
        maxAge: dayjs.duration(10, "minutes").asSeconds(),
        sameSite: true,
      });

      return new Response(null, {
        status: 302,
        headers: { location: url.toString() },
      });
    },
    {
      cookie: t.Cookie(
        {
          oauth: t.Optional(
            t.Object({
              state: t.String(),
              codeVerifier: t.String(),
            }),
          ),
        },
        { httpOnly: true, secure: serverEnv.VITE_APP_ENV === "production" },
      ),
      response: t.Null(),
    },
  )
  .get(
    "/login/google/callback",
    async ({ query, cookie, error }) => {
      const { code, state } = query;
      const { state: storedState, codeVerifier } = cookie.oauth.value;

      if (state !== storedState) return error(400, null);

      const tokens = await tryOrNullAsync(() =>
        GoogleOAuth.client.validateAuthorizationCode(code, codeVerifier),
      );
      if (tokens === null) return error(400, null);

      const claims = tryOrNull(() =>
        GoogleOAuth.parseToken(decodeIdToken(tokens.idToken())),
      );
      if (claims === null) return error(500, null);

      const {
        sub: googleId,
        name,
        email,
        email_verified: emailVerified,
        picture,
      } = claims;
      const username = convertToUsername(name);

      let existingUsers = await db
        .select({ id: userTable.id })
        .from(userTable)
        .where(
          or(eq(userTable.googleId, googleId), eq(userTable.email, email)),
        );
      if (existingUsers.length === 0)
        existingUsers = await db
          .insert(userTable)
          .values({ email, emailVerified, username, googleId, picture })
          .returning({ id: userTable.id });
      const existingUser = existingUsers[0];
      invariant(existingUser, "User was not created");

      const sessions = await db
        .insert(userSessionTable)
        .values({
          userId: existingUser.id,
          expiredAt: dayjs().add(1, "day").toDate(),
          provider: AuthProvider.Google,
        })
        .returning({ id: userSessionTable.id });
      const session = sessions[0];
      invariant(session, "Session was not created");

      cookie.auth.set({
        value: session.id,
        path: "/",
        httpOnly: true,
        secure: serverEnv.VITE_APP_ENV === "production",
        maxAge: dayjs.duration(1, "day").asSeconds(),
        sameSite: "lax",
      });
      cookie.oauth.remove();

      return new Response(null, {
        status: 302,
        headers: { location: `${serverEnv.VITE_BASE_URL}/oauth/logged-in` },
      });
    },
    {
      query: t.Object({ code: t.String(), state: t.String() }),
      cookie: t.Cookie(
        {
          auth: t.Optional(t.String()),
          oauth: t.Object({
            state: t.String(),
            codeVerifier: t.String(),
          }),
        },
        { httpOnly: true, secure: serverEnv.VITE_APP_ENV === "production" },
      ),
      response: {
        302: t.Null(),
        400: t.Null(),
        500: t.Null(),
      },
    },
  )
  .post(
    "/logout",
    async ({ cookie: { auth } }) => {
      const session = auth.value;
      if (!session) return null;

      await db
        .delete(userSessionTable)
        .where(eq(userSessionTable.id, auth.value as ID<Entity.UserSession>));
      auth.remove();

      return null;
    },
    {
      cookie: t.Cookie(
        { auth: t.Optional(t.String()) },
        { httpOnly: true, secure: serverEnv.VITE_APP_ENV === "production" },
      ),
      response: t.Null(),
    },
  );
