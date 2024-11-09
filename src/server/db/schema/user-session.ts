import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

import AuthProvider from "~/enums/auth-provider";
import { Entity, type ID, secureIDGenerator } from "~/server/db/id";
import { createEnum, createTable } from "~/server/db/namespace";
import { userTable } from "~/server/db/schema/user";

export const pgAuthProvider = createEnum("auth_provider", AuthProvider);

export const userSessionTable = createTable("user_session", () => ({
  id: text("id")
    .$type<ID<Entity.UserSession>>()
    .$defaultFn(secureIDGenerator(Entity.UserSession))
    .primaryKey(),
  expiredAt: timestamp("expired_at").notNull(),
  userId: text("user_id")
    .$type<ID<Entity.User>>()
    .references(() => userTable.id)
    .notNull(),
  provider: pgAuthProvider("provider").notNull(),
}));

export const userSessionRelation = relations(userSessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userSessionTable.userId],
    references: [userTable.id],
  }),
}));
