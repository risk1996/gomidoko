import {
  type Accessor,
  createEffect,
  createResource,
  onCleanup,
} from "solid-js";
import {
  type LatLng,
  type TileBoundCoordinates,
  getAllVisibleTileBoundCoordinates,
} from "~/helpers/maps";

type Map = google.maps.Map;
type Marker = google.maps.marker.AdvancedMarkerElement;
type Listener = google.maps.MapsEventListener;

export function useVisibleTileBoundCoordinatesChangeHook(
  getMap: Accessor<google.maps.Map | undefined>,
  onVisibleTileBoundCoordinatesChange?: (tiles: TileBoundCoordinates[]) => void,
): void {
  const [listeners] = createResource<Listener[], Map>(
    getMap,
    (map) => {
      function listener(): void {
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

export function useMapCenterSync(
  getMap: Accessor<Map | undefined>,
  getCenter: Accessor<Parameters<Map["setCenter"]>[0] | null | undefined>,
): void {
  createEffect(() => {
    const map = getMap();
    if (!map) return;

    const center = getCenter();
    if (center === null || center === undefined) return;
    map.setCenter(center);
  });
}

export function useMarkerDragEndHook(
  getMarker: Accessor<Marker | undefined>,
  onDrag?: (position: LatLng) => void,
): void {
  const [listeners] = createResource<Listener[], Marker>(
    getMarker,
    (marker) => {
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

export function useMarkerPositionSync(
  getMarker: Accessor<Marker | undefined>,
  getPosition: Accessor<LatLng>,
): void {
  createEffect(() => {
    const marker = getMarker();
    if (!marker) return;

    marker.position = getPosition();
  });
}
