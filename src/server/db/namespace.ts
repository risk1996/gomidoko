import { pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

import { enumToPgEnum } from "~/helpers/db";
import type { StringEnumLike } from "~/helpers/enum";

const NAMESPACE = "gomidoko";

export const createTable = pgTableCreator((name) => `${NAMESPACE}_${name}`);

export function createEnum<T extends StringEnumLike>(name: string, values: T) {
  return pgEnum(`${NAMESPACE}_${name}`, enumToPgEnum(values));
}
