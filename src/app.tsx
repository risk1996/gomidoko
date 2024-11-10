// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";

import I18nProvider from "~/components/i18n-provider";
import Layout from "~/components/layout";

import "~/app.css";

export default function App() {
  return (
    <I18nProvider>
      <Router root={Layout}>
        <FileRoutes />
      </Router>
    </I18nProvider>
  );
}
