import { QueryClient } from "@tanstack/solid-query";

import dayjs from "~/lib/dayjs";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: dayjs.duration(1, "day").asMilliseconds(),
    },
  },
});
