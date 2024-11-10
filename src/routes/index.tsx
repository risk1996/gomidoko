import type { RouteDefinition } from "@solidjs/router";
import type { Component } from "solid-js";

export const route = {
  preload() {},
} satisfies RouteDefinition;

const Home: Component = () => {
  // const user = createAsync(() => getUser(), { deferStream: true });
  return (
    <>
      <div class="z-[-1] flex flex-grow bg-slate-900 p-4" />

      {/* <MapView
        class="absolute inset-0 z-[-1]"
        options={{
          center: { lng: 139.7425031, lat: 35.6782385 },
          zoom: 16,
          minZoom: 12,
          styles: MAP_STYLE_INFRASTRUCTURE_ONLY,
        }}
      /> */}

      <div class="w-full space-y-2 p-4">
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
};

export default Home;
