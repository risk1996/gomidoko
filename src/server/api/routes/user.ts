import Elysia, { t } from "elysia";

import { maybeUserSession } from "~/server/api/plugins/auth";

export const userRoute = new Elysia({ prefix: "/user" })
  .use(maybeUserSession())
  .get("/me", ({ user }) => ({ data: user ?? null }), {
    response: t.Object({
      data: t.Nullable(
        t.Object({
          id: t.String(),
          email: t.String(),
          username: t.String(),
        }),
      ),
    }),
  });
