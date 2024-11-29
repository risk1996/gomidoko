import { relations } from "drizzle-orm";
import { geometry, index, text, timestamp } from "drizzle-orm/pg-core";

import GarbageType from "~/enums/garbage-type";
import { Entity, type ID, idGenerator } from "~/server/db/id";
import { createEnum, createTable } from "~/server/db/namespace";
import { spotVoteTable } from "~/server/db/schema/spot-vote";
import { userTable } from "~/server/db/schema/user";

export const pgGarbageType = createEnum("garbage_type", GarbageType);

export const spotTable = createTable(
  "spot",
  () => ({
    id: text("id")
      .$type<ID<Entity.Spot>>()
      .$defaultFn(idGenerator(Entity.Spot))
      .primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdBy: text("created_by")
      .$type<ID<Entity.User>>()
      .references(() => userTable.id)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
    updatedBy: text("updated_by")
      .$type<ID<Entity.User>>()
      .references(() => userTable.id)
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    deletedBy: text("deleted_by")
      .$type<ID<Entity.User>>()
      .references(() => userTable.id),
    types: pgGarbageType("types").array().$type<GarbageType[]>().notNull(),
    location: geometry("location", {
      type: "point",
      mode: "tuple",
      srid: 4326,
    }).notNull(),
  }),
  (self) => [
    { locationIndex: index("spatial_index").using("gist", self.location) },
  ],
);

export const spotRelation = relations(spotTable, ({ one, many }) => ({
  creator: one(userTable, {
    fields: [spotTable.createdBy],
    references: [userTable.id],
  }),
  votes: many(spotVoteTable),
}));
