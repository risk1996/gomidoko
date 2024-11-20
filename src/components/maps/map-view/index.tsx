import { Loader } from "@googlemaps/js-api-loader";
import { useColorMode } from "@kobalte/core";
import { type Component, type JSX, createResource } from "solid-js";

import { MapContext } from "~/components/maps/context";

export interface MapViewProps {
  apiKey: string;
  version?: string;
  children?: JSX.Element;
  class?: string;
  options: google.maps.MapOptions;
}

const MapView: Component<MapViewProps> = (props) => {
  const { colorMode } = useColorMode();

  let ref: HTMLElement;
  const [context] = createResource(async () => {
    const loader = new Loader({
      apiKey: props.apiKey,
      version: props.version ?? "weekly",
    });
    const lib = await loader.importLibrary("maps");
    const map = new lib.Map(ref, {
      // TODO: Google Maps JavaScript API: A Map's styles property cannot be set when a mapId is present. When a mapId is present, Map styles are controlled via the cloud console. Please see documentation at https://developers.google.com/maps/documentation/javascript/styling#cloud_tooling
      colorScheme:
        colorMode() === "dark"
          ? google.maps.ColorScheme.DARK
          : google.maps.ColorScheme.LIGHT,
      disableDefaultUI: true,
      mapId: "e67de5bb81f556e0",
      ...props.options,
    });

    return { loader, map };
  });

  return (
    <MapContext.Provider value={() => context()}>
      <div
        class={props.class}
        ref={(el) => {
          ref = el;
        }}
      >
        {props.children}
      </div>
    </MapContext.Provider>
  );
};

export default MapView;
