import { createGeolocationWatcher } from "@solid-primitives/geolocation";
import { createPermission } from "@solid-primitives/permission";
import type { Accessor } from "solid-js";

export type UseGeolocationResult = ReturnType<typeof createGeolocationWatcher>;

export default function useGeolocation(
  options: Accessor<PositionOptions>,
): UseGeolocationResult {
  const permission = createPermission("geolocation");
  const geolocationWatcher = createGeolocationWatcher(
    () => permission() === "granted",
    options,
  );

  return geolocationWatcher;
}
