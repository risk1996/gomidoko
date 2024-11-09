import { relations } from "drizzle-orm";
import { point, text, timestamp } from "drizzle-orm/pg-core";

import GarbageType from "~/enums/GarbageType";
import { Entity, type ID, idGenerator } from "~/server/db/id";
import { createEnum, createTable } from "~/server/db/namespace";
import { spotVoteTable } from "~/server/db/schema/spot-vote";

export const pgGarbageType = createEnum("garbage_type", GarbageType);

export const spotTable = createTable("spot", () => ({
  id: text("id")
    .$type<ID<Entity.Spot>>()
    .$defaultFn(idGenerator(Entity.Spot))
    .primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: text("created_by").$type<unknown>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull()
    .defaultNow(),
  updatedBy: text("updated_by").$type<unknown>().notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  deletedBy: text("deleted_by").$type<unknown>(),
  types: pgGarbageType("types").array().notNull(),
  location: point("location").notNull(),
}));

export const spotRelation = relations(spotTable, ({ many }) => ({
  votes: many(spotVoteTable),
}));
