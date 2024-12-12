import { type Treaty, treaty } from "@elysiajs/eden";
import type { Accessor } from "solid-js";
import { getRequestEvent } from "solid-js/web";

import { getUrl } from "~/helpers/url";
import type { API } from "~/server/api";

const apiClient = treaty<API>(getUrl().toString(), {
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

export type TreatyParameter<
  T extends (
    ...args: U
  ) => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
  U extends unknown[] = Parameters<T>,
> = U[0] & undefined extends never ? Accessor<U[0]> : Accessor<null>;
export type TreatyData<
  T extends (
    ...args: U
  ) => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
  U extends unknown[] = Parameters<T>,
> = Awaited<ReturnType<T>>["data"];
export type TreatyError<
  T extends (
    ...args: U
  ) => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
  U extends unknown[] = Parameters<T>,
> = Awaited<ReturnType<T>>["error"];

export function treatyQueryFn<
  T extends (
    ...args: U
  ) => Promise<Treaty.TreatyResponse<Record<never, unknown>>>,
  U extends unknown[] = Parameters<T>,
>(fn: T): (...args: U) => Promise<TreatyData<T>> {
  return async (...args: U) => {
    const response = await fn(...args);

    if (response.error) throw response.error;
    return response.data;
  };
}

export default apiClient;
