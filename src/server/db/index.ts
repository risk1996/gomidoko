import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import serverEnv from "~/helpers/env-server";
import * as schema from "~/server/db/schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  pool: Pool;
};

export const pool =
  globalForDb.pool ?? new Pool({ connectionString: serverEnv.DB_URL });
if (serverEnv.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle({
  client: pool,
  schema,
});
export type DB = typeof db;
