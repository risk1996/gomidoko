import {
  type InferOutput,
  literal,
  object,
  optional,
  parse,
  string,
  union,
} from "valibot";

const ClientEnvSchema = object({
  VITE_APP_ENV: union([literal("production"), literal("development")]),
  VITE_BASE_URL: string(),

  VERCEL_URL: optional(string()),

  VITE_GOOGLE_MAPS_API_KEY: string(),
});
export type Env = InferOutput<typeof ClientEnvSchema>;

const clientEnv = parse(ClientEnvSchema, import.meta.env);

export default clientEnv;
