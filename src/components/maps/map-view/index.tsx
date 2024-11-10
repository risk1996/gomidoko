import { Loader } from "@googlemaps/js-api-loader";
import { type Component, createEffect } from "solid-js";

import clientEnv from "~/helpers/env-client";

export interface MapViewProps {
  class?: string;
  options: google.maps.MapOptions;
}

const MapView: Component<MapViewProps> = (props) => {
  const ref = (<div class={props.class} />) as HTMLElement;

  createEffect(() => {
    const loader = new Loader({
      apiKey: clientEnv.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });
    loader.importLibrary("maps").then((lib) => {
      new lib.Map(ref, {
        // TODO Maps ColorScheme
        colorScheme: google.maps.ColorScheme.DARK,
        disableDefaultUI: true,
        ...props.options,
      });
    });
  });

  return ref;
};

export default MapView;
