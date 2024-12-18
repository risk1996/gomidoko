import {
  type MutationKey,
  type MutationOptions,
  createMutation,
  useQueryClient,
} from "@tanstack/solid-query";

import { UserMeQuery } from "~/data/user/me/query";
import type { TreatyData, TreatyError } from "~/helpers/api";
import apiClient, { treatyQueryFn } from "~/helpers/api";

export namespace AuthLogoutMutation {
  export const post = apiClient.api.auth.logout.post;
  export type Endpoint = typeof post;
  export type Request = () => null;
  export type Response = TreatyData<Endpoint>;
  export type Error = TreatyError<Endpoint>;
  export type Options = Omit<
    MutationOptions<Response, Error, Request, MutationKey>,
    "mutationKey" | "mutationFn"
  >;

  export function getMutationKey(): MutationKey {
    return ["auth", "logout"];
  }

  export function useMutation(options?: Options) {
    const queryClient = useQueryClient();

    return createMutation<Response, Error, Request, MutationKey>(() => ({
      mutationKey: getMutationKey(),
      mutationFn: treatyQueryFn(() => post(undefined)),
      ...options,
      onSuccess(data, variables, context) {
        options?.onSuccess?.(data, variables, context);
        queryClient.invalidateQueries({
          queryKey: UserMeQuery.getQueryKey(() => null),
        });
      },
    }));
  }
}
