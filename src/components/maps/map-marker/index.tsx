import { type Component, createResource } from "solid-js";

import { useMapContext } from "~/components/maps/context";
import type { LatLng } from "~/helpers/geo";

export interface MapMarkerProps {
  position: LatLng;
  title?: string | null;
  onDrag?: (position: LatLng) => void;
}

const MapMarker: Component<MapMarkerProps> = (props) => {
  const context = useMapContext();
  createResource(context, async (context) => {
    const lib = await context.loader.importLibrary("marker");
    const marker = new lib.AdvancedMarkerElement({
      position: props.position,
      map: context.map,
      gmpDraggable: typeof props.onDrag === "function",
      title: props.title ?? null,
    });

    if (typeof props.onDrag === "function")
      marker.addListener("dragend", () =>
        props.onDrag?.(marker.position as LatLng),
      );
  });

  return null;
};

export default MapMarker;
