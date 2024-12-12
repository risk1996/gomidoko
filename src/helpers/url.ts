import clientEnv from "~/helpers/env-client";

export function getBaseUrl(): string {
  return clientEnv.VERCEL_URL ?? clientEnv.VITE_BASE_URL;
}
