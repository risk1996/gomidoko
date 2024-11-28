// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import type { Component } from "solid-js";

import I18nProvider from "~/components/i18n-provider";
import Layout from "~/components/layout";
import { Toaster } from "~/components/ui/toast";
import day from "~/lib/dayjs";

import "~/app.css";

const App: Component = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: day.duration(1, "day").asMilliseconds(),
      },
    },
  });

  return (
    <MetaProvider>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <Router root={Layout}>
            <FileRoutes />
          </Router>

          <Toaster />

          <SolidQueryDevtools />
        </QueryClientProvider>
      </I18nProvider>
    </MetaProvider>
  );
};

export default App;
