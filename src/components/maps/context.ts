import type { Loader } from "@googlemaps/js-api-loader";
import { type Accessor, createContext, useContext } from "solid-js";

export interface MapContextData {
  loader: Loader;
  map: google.maps.Map;
}
export const MapContext = createContext<Accessor<MapContextData | undefined>>();

export function useMapContext(): Accessor<MapContextData | undefined> {
  const context = useContext(MapContext);
  if (context === undefined)
    throw new Error("useMapContext must be used within a MapContextProvider");

  return context;
}
