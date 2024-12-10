import { AuthLogoutMutation } from "~/data/auth/logout/mutation";
import { SpotCreateMutation } from "~/data/spot/create/mutation";
import { SpotListQuery } from "~/data/spot/list/query";
import { UserMeQuery } from "~/data/user/me/query";
import { UsernameChangeMutation } from "~/data/user/username/change/mutation";
import { UsernameCheckMutation } from "~/data/user/username/check/mutation";

const api = {
  auth: {
    logout: AuthLogoutMutation,
  },
  user: {
    me: UserMeQuery,
    username: {
      check: UsernameCheckMutation,
      change: UsernameChangeMutation,
    },
  },
  spot: {
    create: SpotCreateMutation,
    list: SpotListQuery,
  },
};

export default api;
