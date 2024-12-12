import clientEnv from "~/helpers/env-client";

export function getUrl(path = ""): URL {
  const url = new URL(clientEnv.VERCEL_URL ?? clientEnv.VITE_BASE_URL);
  url.pathname = path;

  return url;
}
