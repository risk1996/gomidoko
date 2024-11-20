import Elysia, { t } from "elysia";

import { userSession } from "~/server/api/plugins/auth";

export const userRoute = new Elysia({ prefix: "/user" })
  .use(userSession())
  .get("/me", ({ user }) => ({ data: user }), {
    response: t.Object({
      data: t.Object({
        id: t.String(),
        email: t.String(),
        username: t.String(),
      }),
    }),
  });
