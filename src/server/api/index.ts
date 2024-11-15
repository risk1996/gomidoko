import Elysia from "elysia";

import { authRoute } from "~/server/api/routes/auth";
import { userRoute } from "~/server/api/routes/user";

const api = new Elysia({ prefix: "/api" }).use(authRoute).use(userRoute);

export type API = typeof api;

export default api;
