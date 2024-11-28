import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

import api from "~/data";

export type UseAuthenticatedResult = ReturnType<typeof api.user.me.useQuery>;

export function useAuthenticated() {
  const user = api.user.me.useQuery(() => null);
  const navigate = useNavigate();

  createEffect(() => {
    if (user.status === "pending") return;
    if (
      user.status === "error" ||
      (user.status === "success" &&
        typeof user.data?.data?.username !== "string")
    )
      navigate("/");
  });

  return user;
}
