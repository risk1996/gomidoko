import { maxValue, minValue, number, object, pipe, safeParse } from "valibot";

export type LatLng = google.maps.LatLngLiteral;

export function convertToLatLng(tuple: [number, number]): LatLng {
  return { lat: tuple[0], lng: tuple[1] };
}

const LatLngSchema = object({
  lat: pipe(number(), minValue(-90), maxValue(90)),
  lng: pipe(number(), minValue(-180), maxValue(180)),
});

export function isValidLatLng(point: LatLng): boolean {
  return safeParse(LatLngSchema, point).success;
}
