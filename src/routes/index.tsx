import type { RouteDefinition } from "@solidjs/router";
import type { Component } from "solid-js";

import Container from "~/components/container";
import api from "~/data";
import useGeolocation from "~/hooks/use-geolocation";
import day from "~/lib/dayjs";

export const route = {
  preload() {},
} satisfies RouteDefinition;

const HomePage: Component = () => {
  const user = api.user.me.useQuery(() => null);
  const geolocation = useGeolocation(() => ({
    enableHighAccuracy: true,
    maximumAge: day.duration(1, "minute").asMilliseconds(),
    timeout: day.duration(3, "seconds").asMilliseconds(),
  }));

  return (
    <>
      <div class="z-[-1] flex flex-grow bg-slate-900 p-4" />

      {/* <MapView
        apiKey={clientEnv.VITE_GOOGLE_MAPS_API_KEY}
        class="flex flex-grow bg-slate-900 p-4"
        options={{
          center: { lng: 139.7425031, lat: 35.6782385 },
          zoom: 16,
          minZoom: 12,
          styles: MAP_STYLE_INFRASTRUCTURE_ONLY,
        }}
      /> */}

      <Container>
        <h2 class="font-bold text-3xl">
          {typeof user.data?.data?.username === "string"
            ? `Hello ${user.data.data.username}`
            : "Not logged in"}
        </h2>

        <p class="text-base">
          Your location is:{" "}
          {geolocation.location
            ? `(${geolocation.location.latitude}, ${geolocation.location.longitude})`
            : "Unknown"}
        </p>
      </Container>
    </>
  );
};

export default HomePage;
