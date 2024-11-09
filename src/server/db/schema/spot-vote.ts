import { relations } from "drizzle-orm";
import { integer, text, timestamp, unique } from "drizzle-orm/pg-core";

import { Entity, type ID, idGenerator } from "~/server/db/id";
import { createTable } from "~/server/db/namespace";
import { spotTable } from "~/server/db/schema/spot";
import { userTable } from "~/server/db/schema/user";

export const spotVoteTable = createTable(
  "spot_vote",
  () => ({
    id: text("id")
      .$type<ID<Entity.SpotVote>>()
      .$default(idGenerator(Entity.SpotVote))
      .primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdBy: text("created_by")
      .$type<ID<Entity.User>>()
      .references(() => userTable.id)
      .notNull(),
    spotId: text("spot_id")
      .$type<ID<Entity.Spot>>()
      .references(() => spotTable.id)
      .notNull(),
    vote: integer("vote").notNull(),
  }),
  (self) => [
    {
      spotIdCreatedByUnique: unique("spot_id_created_by_unique")
        .on(self.spotId, self.createdBy)
        .nullsNotDistinct(),
    },
  ],
);

export const spotVoteRelation = relations(spotVoteTable, ({ one }) => ({
  voter: one(userTable, {
    fields: [spotVoteTable.createdBy],
    references: [userTable.id],
  }),
  spot: one(spotTable, {
    fields: [spotVoteTable.id],
    references: [spotTable.id],
  }),
}));
