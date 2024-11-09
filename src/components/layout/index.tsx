import type { RouteSectionProps } from "@solidjs/router";
import { type Component, Suspense } from "solid-js";

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <>
      <a href="/">Index</a>
      <a href="/about">About</a>
      <Suspense>{props.children}</Suspense>
    </>
  );
};

export default Layout;
