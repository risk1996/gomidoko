import { relations } from "drizzle-orm";
import { boolean, index, text, timestamp } from "drizzle-orm/pg-core";

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
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
    email: text("email").notNull().unique("user_email_unique"),
    emailVerified: boolean("email_verified").notNull().default(false),
    // NOTE: Username will be equal to the email address initially, can only change when it is the same as the email address
    username: text("username").notNull().unique("user_username_unique"),
    googleId: text("google_id").unique("user_google_id_unique"),
    picture: text("picture"),
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
