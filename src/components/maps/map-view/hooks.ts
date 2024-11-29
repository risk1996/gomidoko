import { type Accessor, createEffect } from "solid-js";
import {
  type TileBoundCoordinates,
  getAllVisibleTileBoundCoordinates,
} from "~/helpers/maps";

export function useVisibleTileBoundCoordinatesChangeHook(
  getMap: Accessor<google.maps.Map | undefined>,
  onVisibleTileBoundCoordinatesChange?: (tiles: TileBoundCoordinates[]) => void,
): void {
  createEffect(() => {
    const map = getMap();
    if (map === undefined) return;

    function listener() {
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

    return () => {
      idleListener.remove();
      boundsChangedListener.remove();
    };
  });
}
