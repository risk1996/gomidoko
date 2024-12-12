import { createGeolocation } from "@solid-primitives/geolocation";
import { createPermission } from "@solid-primitives/permission";
import {
  type Accessor,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { isServer } from "solid-js/web";

import type { LatLng } from "~/helpers/maps";

export interface UseGeolocationResult {
  getLocation: Accessor<LatLng>;
  setLocation: (location: LatLng) => void;
  isDefault: Accessor<boolean>;
  permission: Accessor<PermissionState | "unknown">;
}

export default function useGeolocation(
  options: Accessor<PositionOptions>,
  defaultLocation: LatLng,
): UseGeolocationResult {
  const permission = createPermission("geolocation");

  const [geolocation, refetchGeolocation] = isServer
    ? // HACK: Hydration error otherwise
      [createResource(() => undefined)[0], () => {}]
    : createGeolocation(options);
  const [getState, setState] = createSignal({
    isDefault: true,
    location: defaultLocation,
  });

  createEffect(() => {
    if (isServer) return;
    if (geolocation() !== undefined) return;

    const perm = permission();
    if (perm === "unknown" || perm === "prompt" || perm === "granted")
      refetchGeolocation();
  });

  createEffect(() => {
    if (isServer) return;

    const pos = geolocation();
    if (pos === undefined) return;

    setState({
      isDefault: false,
      location: { lat: pos.latitude, lng: pos.longitude },
    });
  });

  return {
    getLocation: () => getState().location,
    setLocation: (location: LatLng) => setState({ isDefault: false, location }),
    isDefault: () => getState().isDefault,
    permission,
  };
}
