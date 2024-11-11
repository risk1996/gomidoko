import { AuthLogoutMutation } from "~/data/auth/logout/mutation";
import { UserMeQuery } from "~/data/user/me/query";

const api = {
  auth: {
    logout: AuthLogoutMutation,
  },
  user: {
    me: UserMeQuery,
  },
};

export default api;
