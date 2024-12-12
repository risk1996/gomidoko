import { drizzle } from "drizzle-orm/node-postgres";

import serverEnv from "~/helpers/env-server";
import * as schema from "~/server/db/schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

export const db = drizzle({
  connection: {
    connectionString: serverEnv.DATABASE_URL,
  },
  schema,
});
export type DB = typeof db;
