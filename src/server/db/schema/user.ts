import { relations } from "drizzle-orm";
import { index, text, timestamp } from "drizzle-orm/pg-core";

import { Entity, type ID, idGenerator } from "~/server/db/id";
import { createTable } from "~/server/db/namespace";
import { spotTable } from "~/server/db/schema/spot";
import { spotVoteTable } from "~/server/db/schema/spot-vote";
import { userSessionTable } from "~/server/db/schema/user-session";

export const userTable = createTable(
  "user",
  () => ({
    id: text("id")
      .$type<ID<Entity.User>>()
      .$defaultFn(idGenerator(Entity.User))
      .primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    email: text("email").notNull().unique("user_email_unique"),
    username: text("username").notNull().unique("user_username_unique"),
    googleId: text("google_id").unique("user_google_id_unique"),
  }),
  (self) => [
    { googleIdIndex: index("user_google_id_index").on(self.googleId) },
  ],
);

export const userRelation = relations(userTable, ({ many }) => ({
  sessions: many(userSessionTable),
  spots: many(spotTable),
  spotVotes: many(spotVoteTable),
}));
