import { type Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const ServerEnvSchema = Type.Object({
  VITE_APP_ENV: Type.Union([
    Type.Literal("production"),
    Type.Literal("development"),
  ]),
  VITE_BASE_URL: Type.String(),

  DB_URL: Type.String(),

  OAUTH_GOOGLE_CLIENT_ID: Type.String(),
  OAUTH_GOOGLE_CLIENT_SECRET: Type.String(),
});
export type Env = Static<typeof ServerEnvSchema>;

const serverEnv = Value.Decode(ServerEnvSchema, process.env);

export default serverEnv;
