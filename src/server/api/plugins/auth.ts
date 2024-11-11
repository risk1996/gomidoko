import { and, eq, gte } from "drizzle-orm";
import Elysia from "elysia";

import { db } from "~/server/db";
import type { Entity, ID } from "~/server/db/id";
import { userSessionTable, userTable } from "~/server/db/schema";

export function userSession() {
  return new Elysia({ name: "~/user-session" }).derive(
    { as: "global" },
    async ({ cookie: { auth } }) => {
      const user = await db
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
        .where(
          eq(
            userSessionTable.id,
            (auth?.value ?? "") as ID<Entity.UserSession>,
          ),
        );

      return { user: user[0] };
    },
  );
}
