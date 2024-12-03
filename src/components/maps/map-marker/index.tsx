import { type Component, createResource, onCleanup } from "solid-js";

import { useMapContext } from "~/components/maps/context";
import { useMarkerDragEndHook } from "~/components/maps/hooks";
import type { LatLng } from "~/helpers/maps";

export interface MapMarkerProps {
  position: LatLng;
  title?: string | null;
  onDrag?: (position: LatLng) => void;
}

const MapMarker: Component<MapMarkerProps> = (props) => {
  const context = useMapContext();

  const [marker] = createResource(context, async (context) => {
    const lib = await context.loader.importLibrary("marker");

    const marker = new lib.AdvancedMarkerElement({
      position: props.position,
      map: context.map,
      gmpDraggable: typeof props.onDrag === "function",
      title: props.title ?? null,
    });

    return marker;
  });

  useMarkerDragEndHook(marker, props.onDrag);

  onCleanup(() => {
    const m = marker();
    if (m) m.map = null;
  });

  return null;
};

export default MapMarker;
