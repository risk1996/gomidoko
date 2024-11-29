import { describe, expect, test } from "vitest";

import { getCoordinates, getLatLng, project, unproject } from "~/helpers/maps";

const NEW_YORK = {
  zoom: 18.3,
  scale: 262144,
  latLng: { lat: 40.71279999999999, lng: -74.006 },
  world: { x: 75.37351111111111, y: 96.25108435405023 },
  pixel: { x: 19758713, y: 25231644 },
  pixelEdgeLatLng: { lat: 40.71280104463165, lng: -74.00600373744965 },
  tile: { x: 77182, y: 98561 },
  tileEdgeLatLng: { lat: 40.712914897234, lng: -74.00665283203125 },
};

describe(project.name, () => {
  test("it should project a latLng to a world coordinate", () => {
    expect(project(NEW_YORK.latLng)).toEqual(NEW_YORK.world);
  });
});

describe(unproject.name, () => {
  test("it should unproject a world coordinate to a latLng", () => {
    expect(unproject(NEW_YORK.world)).toEqual(NEW_YORK.latLng);
  });
});

describe(getCoordinates.name, () => {
  test("it should get the coordinates of a latLng at a given zoom level", () => {
    const coordinates = getCoordinates(NEW_YORK.latLng, NEW_YORK.zoom);
    expect(coordinates.scale).toEqual(NEW_YORK.scale);
    expect(coordinates.latLng).toEqual(NEW_YORK.latLng);
    expect(coordinates.world).toEqual(NEW_YORK.world);
    expect(coordinates.pixel).toEqual(NEW_YORK.pixel);
    expect(coordinates.tile).toEqual(NEW_YORK.tile);
  });
});

describe(getLatLng.name, () => {
  test("it should get a latLng from a given coordinate", () => {
    expect(getLatLng(NEW_YORK.world, NEW_YORK.zoom, "world")).toEqual(
      NEW_YORK.latLng,
    );
    expect(getLatLng(NEW_YORK.pixel, NEW_YORK.zoom, "pixel")).toEqual(
      NEW_YORK.pixelEdgeLatLng,
    );
    expect(getLatLng(NEW_YORK.tile, NEW_YORK.zoom, "tile")).toEqual(
      NEW_YORK.tileEdgeLatLng,
    );
  });
});
