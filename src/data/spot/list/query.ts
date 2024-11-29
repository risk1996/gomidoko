import {
  type QueryKey,
  type UndefinedInitialDataOptions,
  createQueries,
} from "@tanstack/solid-query";

import type { TreatyData, TreatyError } from "~/helpers/api";
import apiClient, { treatyQueryFn } from "~/helpers/api";

export namespace SpotListQuery {
  export const get = apiClient.api.spot.index.get;
  export type Endpoint = typeof get;
  export type OneRequest = () => Parameters<Endpoint>[0]["query"];
  export type MultipleRequest = () => Parameters<Endpoint>[0]["query"][];
  export type Response = TreatyData<Endpoint>;
  export type Error = TreatyError<Endpoint>;
  export type Options = Omit<
    UndefinedInitialDataOptions<Response, Error, Response, QueryKey>,
    "queryKey" | "queryFn"
  >;

  export function getQueryKey(request: OneRequest): QueryKey {
    return ["spot", "list", request()];
  }

  export function useQueries(request: MultipleRequest, options?: Options) {
    return createQueries(() => ({
      queries: request().map((query) => ({
        queryKey: getQueryKey(() => query),
        queryFn: treatyQueryFn(() => get({ query })),
        ...options,
      })),
    }));
  }
}
