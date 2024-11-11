import { AuthLoginGoogle } from "~/data/auth/login/google/query";
import { UserMe } from "~/data/user/me/query";

const api = {
  auth: {
    login: {
      google: AuthLoginGoogle,
    },
  },
  user: {
    me: UserMe,
  },
};

export default api;
