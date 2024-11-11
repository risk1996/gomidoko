import Elysia, { t } from "elysia";

import { userSession } from "~/server/api/plugins/auth";

export const userRoute = new Elysia({ prefix: "/user" })
  .use(userSession())
  .get("/me", ({ user }) => ({ data: user ?? null }), {
    response: t.Object({
      data: t.Nullable(
        t.Object({ id: t.String(), email: t.String(), username: t.String() }),
      ),
    }),
  });
