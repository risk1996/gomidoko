import { isServer } from "solid-js/web";
import clientEnv from "~/helpers/env-client";

import serverEnv from "~/helpers/env-server";

export function getBaseUrl(): string {
  if (isServer) return serverEnv.VERCEL_URL ?? serverEnv.VITE_BASE_URL;
  return clientEnv.VERCEL_URL ?? clientEnv.VITE_BASE_URL;
}
