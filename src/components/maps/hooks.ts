import { type Accessor, createResource, onCleanup } from "solid-js";
import {
  type LatLng,
  type TileBoundCoordinates,
  getAllVisibleTileBoundCoordinates,
} from "~/helpers/maps";

type Listener = google.maps.MapsEventListener;

export function useVisibleTileBoundCoordinatesChangeHook(
  getMap: Accessor<google.maps.Map | undefined>,
  onVisibleTileBoundCoordinatesChange?: (tiles: TileBoundCoordinates[]) => void,
): void {
  const [listeners] = createResource<Listener[]>(
    () => {
      const map = getMap();
      if (map === undefined) return [];

      function listener(): void {
        if (map === undefined) return;
        const bounds = map.getBounds();
        const zoom = map.getZoom();
        if (bounds === undefined || zoom === undefined) return;
        onVisibleTileBoundCoordinatesChange?.(
          getAllVisibleTileBoundCoordinates(bounds, zoom),
        );
      }

      const idleListener = map.addListener("idle", listener);
      const boundsChangedListener = map.addListener("bounds_changed", listener);

      return [idleListener, boundsChangedListener];
    },
    { initialValue: [] },
  );

  onCleanup(() => {
    for (const listener of listeners()) listener.remove();
  });
}

export function useMarkerDragEndHook(
  getMarker: Accessor<google.maps.marker.AdvancedMarkerElement | undefined>,
  onDrag?: (position: LatLng) => void,
): void {
  const [listeners] = createResource<Listener[]>(
    () => {
      const marker = getMarker();
      if (marker === undefined) return [];

      const dragEndListener = marker.addListener("dragend", () => {
        onDrag?.(marker.position as LatLng);
      });

      return [dragEndListener];
    },
    { initialValue: [] },
  );

  onCleanup(() => {
    for (const listener of listeners()) listener.remove();
  });
}