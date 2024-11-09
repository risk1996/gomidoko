import Elysia from "elysia";
import { authRoute } from "~/server/api/routes/auth";

const api = new Elysia({ prefix: "/api" }).use(authRoute);
export type API = typeof api;

export default api;
