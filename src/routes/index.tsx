import type { RouteDefinition } from "@solidjs/router";
import { MapView } from "~/components/maps";
import { MAP_STYLE_INFRASTRUCTURE_ONLY } from "~/constants/maps";

export const route = {
  preload() {},
} satisfies RouteDefinition;

export default function Home() {
  // const user = createAsync(() => getUser(), { deferStream: true });
  return (
    <>
      <MapView
        class="absolute inset-0 z-[-1]"
        options={{
          center: { lng: 139.7425031, lat: 35.6782385 },
          zoom: 16,
          minZoom: 12,
          styles: MAP_STYLE_INFRASTRUCTURE_ONLY,
        }}
      />

      <div class="w-full p-4 space-y-2">
        <h2 class="font-bold text-3xl">Hello {/* user()?.username */}</h2>
        <h3 class="font-bold text-xl">Message board</h3>
        <form method="post">
          <button name="logout" type="submit">
            Logout
          </button>
        </form>
      </div>
    </>
  );
}
