import {
  ColorModeProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
} from "@kobalte/core";
import type { Component, JSX } from "solid-js";
import { isServer } from "solid-js/web";
import { getCookie } from "vinxi/http";

function getServerCookies() {
  "use server";
  const colorMode = getCookie("kb-color-mode");
  return colorMode ? `kb-color-mode=${colorMode}` : "";
}

export interface ColorSchemeProviderProps {
  children: JSX.Element;
}

const ColorSchemeProvider: Component<ColorSchemeProviderProps> = (props) => {
  const storageManager = cookieStorageManagerSSR(
    isServer ? getServerCookies() : document.cookie,
  );

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        {props.children}
      </ColorModeProvider>
    </>
  );
};

export default ColorSchemeProvider;
