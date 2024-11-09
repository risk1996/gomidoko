import { type StringEnumLike, allEnumMembers } from "~/helpers/enum";

export type PgEnumMember = [string, ...string[]];
export function enumToPgEnum(tsEnum: StringEnumLike): PgEnumMember {
  return allEnumMembers(tsEnum).map((value) => `${value}`) as PgEnumMember;
}
