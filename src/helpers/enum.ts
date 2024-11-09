export type EnumLike = Record<string, string | number>;
export type StringEnumLike = Record<string, string>;

export function allEnumMembers<V extends string>(
  enumDef: Record<string, V>,
): V[] {
  return Object.values(enumDef);
}

export function isEnumMember<V extends string>(
  enumDef: Record<string, V>,
  candidate: unknown,
): candidate is V {
  const values: unknown[] = allEnumMembers(enumDef);

  return values.includes(candidate);
}
