import { clientOnly } from "@solidjs/start";

export const MapView = clientOnly(() => import("~/components/maps/map-view"));
export const MapMarker = clientOnly(
  () => import("~/components/maps/map-marker"),
);
