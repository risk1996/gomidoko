import type { Entity, ID } from "~/server/db/id";

export interface User {
  id: ID<Entity.User>;
  email: string;
  username: string;
}
