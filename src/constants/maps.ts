import type { ColorMode } from "@kobalte/core";

// REF: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
export const MAP_TILE_SIZE = 256;

export const MAP_IDS = {
  dark: "9235befb4c140b54",
  light: "e67de5bb81f556e0",
} satisfies Record<ColorMode, string>;
