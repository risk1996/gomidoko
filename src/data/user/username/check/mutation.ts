import {
  createMutation,
  type MutationKey,
  type MutationOptions,
} from "@tanstack/solid-query";

import apiClient, {
  treatyQueryFn,
  type TreatyData,
  type TreatyError,
  type TreatyParameter,
} from "~/helpers/api";

export namespace UsernameCheckMutation {
  export const post = apiClient.api.user.username.check.post;
  export type Endpoint = typeof post;
  export type Request = TreatyParameter<Endpoint>;
  export type Response = TreatyData<Endpoint>;
  export type Error = TreatyError<Endpoint>;
  export type Options = Omit<
    MutationOptions<Response, Error, Request, MutationKey>,
    "mutationKey" | "mutationFn"
  >;

  export function getMutationKey(): MutationKey {
    return ["user", "username", "check"];
  }

  export function useMutation(options?: Options) {
    return createMutation<Response, Error, Request, MutationKey>(() => ({
      mutationKey: getMutationKey(),
      mutationFn: treatyQueryFn((request: Request) => post(request())),
      ...options,
    }));
  }
}
