import { Loader } from "@googlemaps/js-api-loader";
import { type Component, type JSX, createResource } from "solid-js";
import type { SetRequired } from "type-fest";

import { MapContext } from "~/components/maps/context";
import { useVisibleTileBoundCoordinatesChangeHook } from "~/components/maps/hooks";
import type { TileBoundCoordinates } from "~/helpers/maps";

export interface MapViewProps {
  apiKey: string;
  version?: string;
  children?: JSX.Element;
  class?: string;
  options: SetRequired<
    Omit<google.maps.MapOptions, "colorScheme" | "styles">,
    "mapId"
  >;
  onVisibleTileBoundCoordinatesChange?: (tiles: TileBoundCoordinates[]) => void;
}

const MapView: Component<MapViewProps> = (props) => {
  let ref: HTMLElement;
  const [context] = createResource(
    () => props.options.mapId,
    async () => {
      const loader = new Loader({
        apiKey: props.apiKey,
        version: props.version ?? "weekly",
      });
      const lib = await loader.importLibrary("maps");
      const map = new lib.Map(ref, props.options);

      return { loader, map };
    },
  );

  useVisibleTileBoundCoordinatesChangeHook(
    () => context()?.map,
    props.onVisibleTileBoundCoordinatesChange,
  );

  return (
    <MapContext.Provider value={context}>
      <div class={props.class}>
        <div
          class="flex flex-grow"
          ref={(el) => {
            ref = el;
          }}
        />
        {props.children}
      </div>
    </MapContext.Provider>
  );
};

export default MapView;
