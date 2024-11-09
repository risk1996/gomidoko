import { treaty } from "@elysiajs/eden";

import clientEnv from "~/helpers/env-client";
import type { API } from "~/server/api";

const apiClient = treaty<API>(clientEnv.VITE_BASE_URL);

export default apiClient;
