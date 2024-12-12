import type { ColorMode } from "@kobalte/core";
import type { LatLng } from "~/helpers/maps";

// REF: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
export const MAP_TILE_SIZE = 256;

export const MAP_IDS = {
  dark: "9235befb4c140b54",
  light: "e67de5bb81f556e0",
} satisfies Record<ColorMode, string>;

export const DEFAULT_LOCATION: LatLng = {
  // NOTE: Imperial Palace, Tokyo
  lat: 35.6851739,
  lng: 139.7197384,
} as const;
