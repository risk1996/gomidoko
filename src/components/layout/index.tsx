import { Title } from "@solidjs/meta";
import type { RouteSectionProps } from "@solidjs/router";
import { type Component, Suspense } from "solid-js";

import ColorSchemeProvider from "~/components/color-scheme-provider";
import { useI18n } from "~/i18n";

const Layout: Component<RouteSectionProps> = (props) => {
  const { t } = useI18n();

  return (
    <ColorSchemeProvider>
      <Title>{t.title()}</Title>
      <main>
        <a href="/">Index</a>
        <a href="/about">About</a>
        <Suspense>{props.children}</Suspense>
      </main>
    </ColorSchemeProvider>
  );
};

export default Layout;
