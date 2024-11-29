import { MAP_TILE_SIZE } from "~/constants/maps";
import { assertNever } from "~/helpers/assert";

export type LatLng = google.maps.LatLngLiteral;
export type XY = { x: number; y: number };

// REF: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
export function project(latLng: LatLng): XY {
  const sinY = Math.sin((latLng.lat * Math.PI) / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  const saturatedSinY = Math.min(Math.max(sinY, -0.9999), 0.9999);

  return {
    x: MAP_TILE_SIZE * (0.5 + latLng.lng / 360),
    y:
      MAP_TILE_SIZE *
      (0.5 -
        Math.log((1 + saturatedSinY) / (1 - saturatedSinY)) / (4 * Math.PI)),
  };
}

export function unproject(point: XY): LatLng {
  const lng = (point.x / MAP_TILE_SIZE - 0.5) * 360;
  const y = 0.5 - point.y / MAP_TILE_SIZE;
  const lat =
    (180 / Math.PI) * (2 * Math.atan(Math.exp(y * 2 * Math.PI)) - Math.PI / 2);

  return { lat, lng };
}

export interface Coordinates {
  scale: number;
  latLng: LatLng;
  world: XY;
  pixel: XY;
  tile: XY;
}

export function getCoordinates(latLng: LatLng, zoom: number): Coordinates {
  return {
    get scale() {
      return 1 << zoom;
    },
    latLng,
    get world() {
      return project(latLng);
    },
    get pixel() {
      return {
        x: Math.floor(this.world.x * this.scale),
        y: Math.floor(this.world.y * this.scale),
      };
    },
    get tile() {
      return {
        x: Math.floor(this.pixel.x / MAP_TILE_SIZE),
        y: Math.floor(this.pixel.y / MAP_TILE_SIZE),
      };
    },
  };
}

export function getLatLng(
  { x, y }: XY,
  zoom: number,
  type: "world" | "pixel" | "tile",
): LatLng {
  const scale = 1 << zoom;

  switch (type) {
    case "world":
      return unproject({ x, y });
    case "pixel":
      return unproject({ x: x / scale, y: y / scale });
    case "tile":
      return unproject({
        x: (x * MAP_TILE_SIZE) / scale,
        y: (y * MAP_TILE_SIZE) / scale,
      });
    default:
      assertNever(type);
  }
}

export type TileBoundCoordinates = [number, number, number, number];

export function getAllVisibleTileBoundCoordinates(
  bounds: google.maps.LatLngBounds,
  zoom: number,
): TileBoundCoordinates[] {
  const ne = getCoordinates(
    { lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng() },
    zoom,
  ).tile;
  const sw = getCoordinates(
    { lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng() },
    zoom,
  ).tile;

  const tileBounds: TileBoundCoordinates[] = [];
  for (let x = sw.x; x <= ne.x; x++) {
    for (let y = ne.y; y <= sw.y; y++) {
      const nw = getLatLng({ x, y }, zoom, "tile");
      const se = getLatLng({ x: x + 1, y: y + 1 }, zoom, "tile");

      tileBounds.push([se.lat, nw.lng, nw.lat, se.lng]);
    }
  }

  return tileBounds;
}
