import { type StringEnumLike, allEnumMembers } from "~/helpers/enum";

export type PgEnumMember = [string, ...string[]];
export function enumToPgEnum<T extends StringEnumLike>(
  tsEnum: T,
): PgEnumMember {
  return allEnumMembers(tsEnum).map((value) => `${value}`) as PgEnumMember;
}
