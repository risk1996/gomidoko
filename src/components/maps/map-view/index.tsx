import { Loader } from "@googlemaps/js-api-loader";
import { useColorMode } from "@kobalte/core";
import { type Component, type JSX, createEffect } from "solid-js";

import clientEnv from "~/helpers/env-client";

export interface MapViewProps {
  children?: JSX.Element;
  class?: string;
  options: google.maps.MapOptions;
}

const MapView: Component<MapViewProps> = (props) => {
  const { colorMode } = useColorMode();
  const ref = (<div class={props.class}>{props.children}</div>) as HTMLElement;

  createEffect(() => {
    const loader = new Loader({
      apiKey: clientEnv.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });
    loader.importLibrary("maps").then((lib) => {
      new lib.Map(ref, {
        colorScheme:
          colorMode() === "dark"
            ? google.maps.ColorScheme.DARK
            : google.maps.ColorScheme.LIGHT,
        disableDefaultUI: true,
        ...props.options,
      });
    });
  });

  return ref;
};

export default MapView;
