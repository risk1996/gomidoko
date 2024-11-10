// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import type { Component } from "solid-js";

import I18nProvider from "~/components/i18n-provider";
import Layout from "~/components/layout";

import "~/app.css";

const App: Component = () => {
  return (
    <MetaProvider>
      <I18nProvider>
        <Router root={Layout}>
          <FileRoutes />
        </Router>
      </I18nProvider>
    </MetaProvider>
  );
};

export default App;
