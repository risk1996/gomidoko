import { Icon } from "@iconify-icon/solid";
import { useColorMode } from "@kobalte/core";
import { debounce } from "@solid-primitives/scheduled";
import type { RouteDefinition } from "@solidjs/router";
import { type Component, For, Show, createMemo, createSignal } from "solid-js";

import Container from "~/components/container";
import { MapMarker, MapView } from "~/components/maps";
import { Button } from "~/components/ui/button";
import { DEFAULT_LOCATION, MAP_IDS } from "~/constants/maps";
import api from "~/data";
import clientEnv from "~/helpers/env-client";
import type { TileBoundCoordinates } from "~/helpers/maps";
import useGeolocation from "~/hooks/use-geolocation";
import day from "~/lib/dayjs";

export const route = {
  preload() {},
} satisfies RouteDefinition;

const HomePage: Component = () => {
  const { colorMode } = useColorMode();
  const user = api.user.me.useQuery(() => null);
  const geolocation = useGeolocation(
    () => ({
      enableHighAccuracy: true,
      maximumAge: day.duration(1, "minute").asMilliseconds(),
    }),
    DEFAULT_LOCATION,
  );

  const [getCoords, setCoords] = createSignal<TileBoundCoordinates[]>([]);
  const spotListQueries = api.spot.list.useQueries(
    () => getCoords().map((coords) => ({ area: coords })),
    () => ({ enabled: getCoords().length > 0 }),
  );
  const spots = createMemo(() =>
    spotListQueries.flatMap((q) => q.data?.data ?? []),
  );

  return (
    <>
      <MapView
        apiKey={clientEnv.VITE_GOOGLE_MAPS_API_KEY}
        class="relative flex flex-grow bg-slate-900"
        options={{
          center: geolocation.getLocation(),
          zoom: 16,
          minZoom: 12,
          mapId: MAP_IDS[colorMode()],
          disableDefaultUI: true,
        }}
        onVisibleTileBoundCoordinatesChange={debounce(setCoords, 500)}
      >
        <Show when={!geolocation.isDefault()}>
          <MapMarker position={geolocation.getLocation()} />
        </Show>

        <For each={spots()}>
          {(spot) => (
            <MapMarker
              position={{
                lat: spot.location[0],
                lng: spot.location[1],
              }}
            >
              <Icon icon="tabler:pennant-filled" width="24px" />
            </MapMarker>
          )}
        </For>

        <Show when={typeof user.data?.data?.username === "string"}>
          <Button
            as="a"
            href="/spot/create"
            class="absolute right-0 bottom-0 m-4 size-10 rounded-full"
          >
            <Icon icon="tabler:plus" width="24px" />
          </Button>
        </Show>
      </MapView>

      <Container>
        <h2 class="font-bold text-3xl">
          {typeof user.data?.data?.username === "string"
            ? `Hello ${user.data.data.username}`
            : "Not logged in"}
        </h2>

        <p class="text-base">
          Your location is:{" "}
          {`(${geolocation.getLocation().lat}, ${geolocation.getLocation().lng})`}
          {geolocation.isDefault() ? " (default)" : ""}
        </p>
      </Container>
    </>
  );
};

export default HomePage;
