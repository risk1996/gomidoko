import { sql } from "drizzle-orm";

import { db } from "~/server/db";

async function setup() {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS postgis;`);
}

await setup();
