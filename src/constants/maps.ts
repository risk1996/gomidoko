// REF: https://developers.google.com/maps/documentation/javascript/style-reference#style-features
export const MAP_STYLE_INFRASTRUCTURE_ONLY: google.maps.MapTypeStyle[] = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];