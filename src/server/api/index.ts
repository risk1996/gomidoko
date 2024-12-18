import Elysia from "elysia";
import logixlysia from "logixlysia";

import { authRoute } from "~/server/api/routes/auth";
import { spotRoute } from "~/server/api/routes/spot";
import { userRoute } from "~/server/api/routes/user";

const api = new Elysia({ prefix: "/api" })
  .use(logixlysia())
  .use(authRoute)
  .use(userRoute)
  .use(spotRoute);

export type API = typeof api;

export default api;
