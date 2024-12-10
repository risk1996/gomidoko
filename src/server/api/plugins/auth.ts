import { and, eq, gte } from "drizzle-orm";
import Elysia, { error } from "elysia";

import { tryOrNull } from "~/helpers/fallible";
import { db } from "~/server/db";
import { Entity, parseId } from "~/server/db/id";
import { userSessionTable, userTable } from "~/server/db/schema";

export function maybeUserSession() {
  return new Elysia({ name: "~/maybe-user-session" }).resolve(
    { as: "scoped" },
    async ({ cookie }) => {
      const authValue = cookie["auth"]?.value;
      if (typeof authValue !== "string") return { user: null };

      const sessionId = tryOrNull(() => parseId(authValue, Entity.UserSession));
      if (!sessionId) return { user: null };

      const users = await db
        .select({
          id: userTable.id,
          email: userTable.email,
          username: userTable.username,
        })
        .from(userTable)
        .leftJoin(
          userSessionTable,
          and(
            eq(userTable.id, userSessionTable.userId),
            gte(userSessionTable.expiredAt, new Date()),
          ),
        )
        .where(eq(userSessionTable.id, sessionId));

      const user = users[0];
      return { user };
    },
  );
}

export function userSession() {
  return new Elysia({ name: "~/user-session" })
    .use(maybeUserSession())
    .resolve({ as: "scoped" }, async ({ user }) => {
      if (!user) throw error(401, {});

      return { user };
    });
}
