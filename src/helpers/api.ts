import { type Treaty, treaty } from "@elysiajs/eden";
import { getRequestEvent } from "solid-js/web";

import clientEnv from "~/helpers/env-client";
import type { API } from "~/server/api";

const apiClient = treaty<API>(clientEnv.VITE_BASE_URL, {
  headers(_path, options) {
    const headers = new Headers(options.headers);
    const event = getRequestEvent();

    if (event) {
      const cookie = event.request.headers.get("cookie");
      if (cookie) headers.set("cookie", cookie);
    }

    return headers;
  },
});

export type TreatyData<
  T extends () => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
> = Awaited<ReturnType<T>>["data"];
export type TreatyError<
  T extends () => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
> = Awaited<ReturnType<T>>["error"];

export function treatyQueryFn<
  T extends () => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
>(fn: T): () => Promise<TreatyData<T>> {
  return async () => {
    const response = await fn();

    if (response.error) throw response.error;
    return response.data;
  };
}

export default apiClient;
