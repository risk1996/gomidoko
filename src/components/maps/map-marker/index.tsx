import {
  type Component,
  type JSX,
  createMemo,
  createResource,
  onCleanup,
} from "solid-js";

import { useMapContext } from "~/components/maps/context";
import { useMarkerDragEndHook } from "~/components/maps/hooks";
import type { LatLng } from "~/helpers/maps";

export interface MapMarkerProps {
  position: LatLng;
  title?: string | null | undefined;
  children?: JSX.Element;
  onDrag?: (position: LatLng) => void;
}

function wrapChildren(children: JSX.Element): Node | null {
  if (children === null || children === undefined) return null;
  if (children instanceof Node) return children;
  return (<span>{children}</span>) as Node;
}

const MapMarker: Component<MapMarkerProps> = (props) => {
  const context = useMapContext();

  const children = createMemo(() => wrapChildren(props.children));
  const [marker] = createResource(context, async (context) => {
    const lib = await context.loader.importLibrary("marker");

    const marker = new lib.AdvancedMarkerElement({
      position: props.position,
      map: context.map,
      gmpDraggable: typeof props.onDrag === "function",
      content: children(),
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
