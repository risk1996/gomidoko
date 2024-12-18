import type { Tagged } from "type-fest";
import { fromString, fromUUID, typeid } from "typeid-js";

import { assertNever } from "~/helpers/assert";

export enum Entity {
  User = "USER",
  UserSession = "USER_SESSION",
  Spot = "SPOT",
  SpotVote = "SPOT_VOTE",
}

function getEntityPrefix(entity: Entity): string {
  switch (entity) {
    case Entity.User:
      return "usr";
    case Entity.UserSession:
      return "uss";
    case Entity.Spot:
      return "s";
    case Entity.SpotVote:
      return "sv";
    default:
      assertNever(entity);
  }
}

export type ID<T extends Entity> = Tagged<string, T>;

export function idGenerator<T extends Entity>(entity: T): () => ID<T> {
  return () => typeid(getEntityPrefix(entity)).toString() as ID<T>;
}

export function secureIDGenerator<T extends Entity>(entity: T): () => ID<T> {
  return () => {
    const uuid = crypto.randomUUID();
    return fromUUID(uuid, getEntityPrefix(entity)).toString() as ID<T>;
  };
}

export function parseId<T extends Entity>(
  candidate: string,
  entity: Entity,
): ID<T> {
  return fromString(
    candidate,
    getEntityPrefix(entity),
  ).toString() as unknown as ID<T>;
}
