import type { APIEvent } from "@solidjs/start/server";

import api from "~/server/api";

async function handler(event: APIEvent): Promise<Response> {
  return await api.handle(event.request);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
