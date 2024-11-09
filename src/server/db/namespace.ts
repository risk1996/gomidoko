import { pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

import { enumToPgEnum } from "~/helpers/db";
import type { StringEnumLike } from "~/helpers/enum";

export const createTable = pgTableCreator((name) => `gomidoko_${name}`);

export const createEnum = (name: string, values: StringEnumLike) =>
  pgEnum(`gomidoko_${name}`, enumToPgEnum(values));
