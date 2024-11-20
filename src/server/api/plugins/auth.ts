import { and, eq, gte } from "drizzle-orm";
import Elysia, { error } from "elysia";
import { tryOrNull } from "~/helpers/fallible";

import { db } from "~/server/db";
import { Entity, parseId } from "~/server/db/id";
import { userSessionTable, userTable } from "~/server/db/schema";

export function userSession() {
  return new Elysia({ name: "~/user-session" }).resolve(
    { as: "global" },
    async ({ cookie }) => {
      const authValue = cookie["auth"]?.value;
      if (typeof authValue !== "string") return error(401, null);

      const sessionId = tryOrNull(() => parseId(authValue, Entity.UserSession));
      if (!sessionId) return error(401, null);

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
      if (!user) return error(401, null);

      return { user };
    },
  );
}
