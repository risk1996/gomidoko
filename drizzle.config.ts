import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import serverEnv from "~/helpers/env-server";

export default defineConfig({
  schema: "./src/server/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
  tablesFilter: ["gomidoko_*"],
});
