// REF: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
export const MAP_TILE_SIZE = 256;

// REF: https://developers.google.com/maps/documentation/javascript/style-reference#style-features
export const MAP_STYLE_INFRASTRUCTURE_ONLY: google.maps.MapTypeStyle[] = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];
