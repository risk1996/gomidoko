import {
  type MutationOptions,
  type QueryKey,
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
    MutationOptions<Response, Error, Response, QueryKey>,
    "mutationKey" | "mutationFn"
  >;

  export function getQueryKey(request: Request): QueryKey {
    return ["auth", "logout", request()];
  }

  export function useMutation(request: Request, options?: Options) {
    const queryClient = useQueryClient();

    return createMutation<Response, Error, Response, QueryKey>(() => ({
      mutationKey: getQueryKey(request),
      mutationFn: treatyQueryFn(post),
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
