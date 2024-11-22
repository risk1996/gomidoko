import { Icon } from "@iconify-icon/solid";
import type { Component } from "solid-js";

import Container from "~/components/container";
import HeaderUserMenu from "~/components/header/user-menu";
import {
  NavigationMenu,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { useI18n } from "~/i18n";

const Header: Component = () => {
  const { t } = useI18n();

  return (
    <Container flexDirection="row" class="items-center">
      <NavigationMenu>
        <NavigationMenuTrigger
          as="a"
          href="/"
          class="-ml-2 h-8 font-bold text-xl"
        >
          <Icon icon="tabler:trash" width="24px" class="mr-1" />
          {t.title()}
        </NavigationMenuTrigger>

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>
            Getting started
            <NavigationMenuIcon />
          </NavigationMenuTrigger>

          <NavigationMenuContent class="grid grid-flow-col grid-rows-3 gap-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] [&>li:first-child]:row-span-3">
            <NavigationMenuLink
              class="box-border flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline focus:shadow-md"
              href="https://solid-ui.com"
            >
              <IconLogo class="size-6" />
              <NavigationMenuLabel class="mt-4 mb-2 font-medium text-lg">
                SolidUI
              </NavigationMenuLabel>
              <NavigationMenuDescription class="text-muted-foreground text-sm leading-tight">
                Beautifully designed components. Built with Kobalte & corvu.
                Styled with Tailwind CSS.
              </NavigationMenuDescription>
            </NavigationMenuLink>

            <NavigationMenuLink href="/docs">
              <NavigationMenuLabel>Introduction</NavigationMenuLabel>
              <NavigationMenuDescription>
                Re-usable components. Built with Kobalte & corvu. Styled with
                Tailwind CSS.
              </NavigationMenuDescription>
            </NavigationMenuLink>

            <NavigationMenuLink href="/docs/installation/overview">
              <NavigationMenuLabel>Installation</NavigationMenuLabel>
              <NavigationMenuDescription>
                How to install dependencies and structure your app.
              </NavigationMenuDescription>
            </NavigationMenuLink>

            <NavigationMenuLink href="/docs/dark-mode/overview">
              <NavigationMenuLabel>Dark Mode</NavigationMenuLabel>
              <NavigationMenuDescription>
                Adding dark mode to your site.
              </NavigationMenuDescription>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>
            Overview
            <NavigationMenuIcon />
          </NavigationMenuTrigger>

          <NavigationMenuContent class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/introduction">
              <NavigationMenuLabel>Introduction</NavigationMenuLabel>
              <NavigationMenuDescription>
                Build high-quality, accessible design systems and web apps.
              </NavigationMenuDescription>
            </NavigationMenuLink>

            <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/getting-started">
              <NavigationMenuLabel>Getting started</NavigationMenuLabel>
              <NavigationMenuDescription>
                A quick tutorial to get you up and running with Kobalte.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/styling">
              <NavigationMenuLabel>Styling</NavigationMenuLabel>
              <NavigationMenuDescription>
                Unstyled and compatible with any styling solution.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/animation">
              <NavigationMenuLabel>Animation</NavigationMenuLabel>
              <NavigationMenuDescription>
                Use CSS keyframes or any animation library of your choice.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink href="https://kobalte.dev/docs/core/overview/polymorphism">
              <NavigationMenuLabel>Polymorphism</NavigationMenuLabel>
              <NavigationMenuDescription>
                Customize behavior or integrate existing libraries.
              </NavigationMenuDescription>
            </NavigationMenuLink>
            <NavigationMenuLink href="https://kobalte.dev/docs/changelog">
              <NavigationMenuLabel>Changelog</NavigationMenuLabel>
              <NavigationMenuDescription>
                Kobalte releases and their changelogs.
              </NavigationMenuDescription>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenu>

      <HeaderUserMenu />
    </Container>
  );
};

export default Header;
