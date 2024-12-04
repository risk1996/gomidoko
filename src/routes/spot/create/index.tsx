import { Icon } from "@iconify-icon/solid";
import { useColorMode } from "@kobalte/core";
import { useNavigate } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import {
  type ValibotValidator,
  valibotValidator,
} from "@tanstack/valibot-form-adapter";
import {
  type Component,
  For,
  Show,
  createEffect,
  createSignal,
} from "solid-js";

import { type InferOutput, array, enum_, object } from "valibot";
import Container from "~/components/container";
import { MapMarker, MapView } from "~/components/maps";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/ui/flex";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";
import { showToast } from "~/components/ui/toast";
import { MAP_IDS } from "~/constants/maps";
import api from "~/data";
import GarbageType, { getGarbageIcon } from "~/enums/garbage-type";
import { allEnumMembers } from "~/helpers/enum";
import clientEnv from "~/helpers/env-client";
import { handleFormSubmit } from "~/helpers/form";
import type { LatLng } from "~/helpers/maps";
import { useAuthenticated } from "~/hooks/use-authenticated";
import useGeolocation from "~/hooks/use-geolocation";
import { useI18n } from "~/i18n";
import day from "~/lib/dayjs";

const SpotCreationPage: Component = () => {
  useAuthenticated();
  const { colorMode } = useColorMode();
  const { t } = useI18n();
  const navigate = useNavigate();

  const geolocation = useGeolocation(() => ({
    enableHighAccuracy: true,
    maximumAge: day.duration(1, "minute").asMilliseconds(),
    timeout: day.duration(3, "seconds").asMilliseconds(),
  }));
  const [getPosition, setPosition] = createSignal<LatLng | null>(null);

  createEffect(() => {
    if (geolocation.location === null) return;
    // TODO: Remove this jitter
    const jitter = clientEnv.VITE_APP_ENV === "development" ? 0.1 : 0;
    setPosition({
      lat: geolocation.location.latitude + (Math.random() - 0.5) * 2 * jitter,
      lng: geolocation.location.longitude + (Math.random() - 0.5) * 2 * jitter,
    });
  });

  const spotCreateMutation = api.spot.create.useMutation();

  const formSchema = object({
    types: array(enum_(GarbageType)),
  });
  type FormData = InferOutput<typeof formSchema>;
  const form = createForm<FormData, ValibotValidator>(() => ({
    defaultValues: { types: [] },
    validatorAdapter: valibotValidator(),
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const position = getPosition();
      if (position === null) return;
      await spotCreateMutation.mutateAsync(() => ({
        location: [position.lat, position.lng],
        types: value.types,
      }));
      showToast({
        title: t.spot.create.toast.success.title(),
        variant: "success",
      });
      navigate("/");
    },
  }));

  return (
    <Show when={getPosition()}>
      {(position) => (
        <>
          <MapView
            apiKey={clientEnv.VITE_GOOGLE_MAPS_API_KEY}
            class="flex flex-grow bg-slate-900"
            options={{
              center: position(),
              zoom: 16,
              minZoom: 12,
              mapId: MAP_IDS[colorMode()],
              disableDefaultUI: true,
            }}
          >
            <MapMarker position={position()} onDrag={setPosition} />
          </MapView>

          <Container>
            <h1 class="font-bold text-2xl">{t.spot.create.title()}</h1>

            <form class="mt-4" onSubmit={handleFormSubmit(form.handleSubmit)}>
              <p class="text-base">
                Location is: {position().lat}, {position().lng}
              </p>

              <span class="mt-4 font-semibold text-lg">
                {t.enums.garbageType.name()}
              </span>
              <Flex flexDirection="col" class="mt-2 gap-2" alignItems="start">
                <For each={allEnumMembers(GarbageType)}>
                  {(type) => (
                    <form.Field name="types">
                      {(field) => (
                        <Switch
                          class="flex items-center"
                          checked={field().state.value.includes(type)}
                          onChange={(checked) =>
                            field().handleChange((prev) =>
                              checked
                                ? prev.concat(type)
                                : prev.filter((t) => t !== type),
                            )
                          }
                        >
                          <SwitchControl>
                            <SwitchThumb />
                          </SwitchControl>
                          <SwitchLabel class="flex items-center">
                            <Icon
                              icon={getGarbageIcon(type)}
                              width="24px"
                              class="mx-2"
                            />
                            <span>{t.enums.garbageType.member[type]()}</span>
                          </SwitchLabel>
                        </Switch>
                      )}
                    </form.Field>
                  )}
                </For>
              </Flex>

              <form.Subscribe>
                {(state) => (
                  <Button
                    type="submit"
                    disabled={state().values.types.length < 1}
                    class="mt-6 w-full"
                  >
                    {t.common.actions.submit()}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </Container>
        </>
      )}
    </Show>
  );
};

export default SpotCreationPage;
