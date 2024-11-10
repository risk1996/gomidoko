import {
  type InferOutput,
  literal,
  object,
  parse,
  string,
  union,
} from "valibot";

const ClientEnvSchema = object({
  VITE_APP_ENV: union([literal("production"), literal("development")]),
  VITE_BASE_URL: string(),

  VITE_GOOGLE_MAPS_API_KEY: string(),
});
export type Env = InferOutput<typeof ClientEnvSchema>;

const clientEnv = parse(ClientEnvSchema, import.meta.env);

export default clientEnv;
