import { AuthLogoutMutation } from "~/data/auth/logout/mutation";
import { SpotCreateMutation } from "~/data/spot/create/mutation";
import { SpotListQuery } from "~/data/spot/list/query";
import { UserMeQuery } from "~/data/user/me/query";

const api = {
  auth: {
    logout: AuthLogoutMutation,
  },
  user: {
    me: UserMeQuery,
  },
  spot: {
    create: SpotCreateMutation,
    list: SpotListQuery,
  },
};

export default api;
