import { createGeolocationWatcher } from "@solid-primitives/geolocation";
import { createPermission } from "@solid-primitives/permission";
import { type Accessor, mergeProps } from "solid-js";

export interface UseGeolocationResult
  extends ReturnType<typeof createGeolocationWatcher> {
  permission: Accessor<PermissionState | "unknown">;
}

export default function useGeolocation(
  options: Accessor<PositionOptions>,
): UseGeolocationResult {
  const permission = createPermission("geolocation");
  const geolocationWatcher = createGeolocationWatcher(
    () =>
      permission() === "unknown" ||
      permission() === "prompt" ||
      permission() === "granted",
    options,
  );

  return mergeProps(geolocationWatcher, { permission });
}
