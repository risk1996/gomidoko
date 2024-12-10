import { and, eq, not } from "drizzle-orm";
import Elysia, { error, t } from "elysia";

import { maybeUserSession, userSession } from "~/server/api/plugins/auth";
import { db } from "~/server/db";
import { userTable } from "~/server/db/schema";

export const userRoute = new Elysia({ prefix: "/user" })
  .use(maybeUserSession())
  .get("/me", ({ user }) => ({ data: user ?? null }), {
    response: {
      200: t.Object({
        data: t.Nullable(
          t.Object({
            id: t.String(),
            email: t.String(),
            username: t.String(),
          }),
        ),
      }),
    },
  })
  .use(userSession())
  .post(
    "/username/check",
    async ({ body, user }) => {
      const existingUser = await db
        .select({ id: userTable.id })
        .from(userTable)
        .where(
          and(
            eq(userTable.username, body.username),
            not(eq(userTable.id, user.id)),
          ),
        );

      return {
        data: {
          username: body.username,
          available: existingUser.length === 0,
        },
      };
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 6,
          maxLength: 24,
          pattern: "^[a-zA-Z0-9_]+$",
        }),
      }),
      response: {
        200: t.Object({
          data: t.Object({
            username: t.String(),
            available: t.Boolean(),
          }),
        }),
      },
    },
  )
  .patch(
    "/username",
    async ({ body, user }) => {
      const [selectedUsers, existingUsers] = await Promise.all([
        db
          .select({ email: userTable.email, username: userTable.username })
          .from(userTable)
          .where(eq(userTable.id, user.id)),
        db
          .select({ id: userTable.id })
          .from(userTable)
          .where(eq(userTable.username, body.username)),
      ]);
      const selectedUser = selectedUsers[0];
      if (!selectedUser) return error(404, {});
      if (existingUsers.length > 0) return error(400, {});
      if (selectedUser.email !== selectedUser.username) return error(400, {});

      await db
        .update(userTable)
        .set({ username: body.username })
        .where(eq(userTable.id, user.id));

      return new Response(null, { status: 204 });
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 6,
          maxLength: 24,
          pattern: "^[a-zA-Z0-9_]+$",
        }),
      }),
      response: {
        204: t.Null(),
        400: t.Object({}),
        404: t.Object({}),
      },
    },
  );
