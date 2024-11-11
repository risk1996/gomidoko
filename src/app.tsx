// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import type { Component } from "solid-js";

import I18nProvider from "~/components/i18n-provider";
import Layout from "~/components/layout";
import { queryClient } from "~/helpers/query";

import "~/app.css";

const App: Component = () => {
  return (
    <MetaProvider>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <Router root={Layout}>
            <FileRoutes />
          </Router>

          <SolidQueryDevtools />
        </QueryClientProvider>
      </I18nProvider>
    </MetaProvider>
  );
};

export default App;
