import {
  type MutationKey,
  type MutationOptions,
  createMutation,
} from "@tanstack/solid-query";

import type { TreatyData, TreatyError, TreatyParameter } from "~/helpers/api";
import apiClient, { treatyQueryFn } from "~/helpers/api";

export namespace SpotCreateMutation {
  export const post = apiClient.api.spot.index.post;
  export type Endpoint = typeof post;
  export type Request = TreatyParameter<Endpoint>;
  export type Response = TreatyData<Endpoint>;
  export type Error = TreatyError<Endpoint>;
  export type Options = Omit<
    MutationOptions<Response, Error, Request, MutationKey>,
    "mutationKey" | "mutationFn"
  >;

  export function getMutationKey(): MutationKey {
    return ["spot", "create"];
  }

  export function useMutation(options?: Options) {
    return createMutation<Response, Error, Request, MutationKey>(() => ({
      mutationKey: getMutationKey(),
      mutationFn: treatyQueryFn((request: Request) => post(request())),
      ...options,
    }));
  }
}
