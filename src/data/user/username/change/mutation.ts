import {
  createMutation,
  useQueryClient,
  type MutationKey,
  type MutationOptions,
} from "@tanstack/solid-query";

import { UserMeQuery } from "~/data/user/me/query";
import apiClient, {
  treatyQueryFn,
  type TreatyData,
  type TreatyError,
  type TreatyParameter,
} from "~/helpers/api";

export namespace UsernameChangeMutation {
  export const patch = apiClient.api.user.username.patch;
  export type Endpoint = typeof patch;
  export type Request = TreatyParameter<Endpoint>;
  export type Response = TreatyData<Endpoint>;
  export type Error = TreatyError<Endpoint>;
  export type Options = Omit<
    MutationOptions<Response, Error, Request, MutationKey>,
    "mutationKey" | "mutationFn"
  >;

  export function getMutationKey(): MutationKey {
    return ["user", "username", "change"];
  }

  export function useMutation(options?: Options) {
    const queryClient = useQueryClient();

    return createMutation<Response, Error, Request, MutationKey>(() => ({
      mutationKey: getMutationKey(),
      mutationFn: treatyQueryFn((request: Request) => patch(request())),
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
