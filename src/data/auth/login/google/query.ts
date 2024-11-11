import {
  type QueryKey,
  type UndefinedInitialDataOptions,
  createQuery,
} from "@tanstack/solid-query";

import type { TreatyData, TreatyError } from "~/helpers/api";
import apiClient, { treatyQueryFn } from "~/helpers/api";

export namespace AuthLoginGoogle {
  export const get = apiClient.api.auth.login.google.get;
  export type Endpoint = typeof get;
  export type Request = () => null;
  export type Response = TreatyData<Endpoint>;
  export type Error = TreatyError<Endpoint>;
  export type Options = Omit<
    UndefinedInitialDataOptions<Response, Error, Response, QueryKey>,
    "queryKey" | "queryFn"
  >;

  export function getQueryKey(request: Request): QueryKey {
    return ["auth", "login", "google", request()];
  }

  export function useQuery(request: Request, options?: Options) {
    return createQuery<Response, Error, Response, QueryKey>(() => ({
      queryKey: getQueryKey(request),
      queryFn: treatyQueryFn(get),
      ...options,
    }));
  }
}
