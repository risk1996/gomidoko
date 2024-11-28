import { Icon } from "@iconify-icon/solid";
import { useNavigate } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import {
  type ValibotValidator,
  valibotValidator,
} from "@tanstack/valibot-form-adapter";
import { type Component, For, createSignal } from "solid-js";

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
import { MAP_STYLE_INFRASTRUCTURE_ONLY } from "~/constants/maps";
import api from "~/data";
import GarbageType, { getGarbageIcon } from "~/enums/garbage-type";
import { allEnumMembers } from "~/helpers/enum";
import clientEnv from "~/helpers/env-client";
import { handleFormSubmit } from "~/helpers/form";
import type { LatLng } from "~/helpers/geo";
import { useI18n } from "~/i18n";

// TODO: Protect with auth
const SpotCreationPage: Component = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [getPosition, setPosition] = createSignal<LatLng>({
    lng: 139.7425031,
    lat: 35.6782385,
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
      await spotCreateMutation.mutateAsync(() => ({
        location: [getPosition().lat, getPosition().lng],
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
    <>
      <MapView
        apiKey={clientEnv.VITE_GOOGLE_MAPS_API_KEY}
        class="flex flex-grow bg-slate-900 p-4"
        options={{
          center: { lng: 139.7425031, lat: 35.6782385 },
          zoom: 16,
          minZoom: 12,
          styles: MAP_STYLE_INFRASTRUCTURE_ONLY,
        }}
      >
        <MapMarker position={getPosition()} onDrag={setPosition} />
      </MapView>

      <Container>
        <h1 class="font-bold text-2xl">{t.spot.create.title()}</h1>

        <form class="mt-4" onSubmit={handleFormSubmit(form.handleSubmit)}>
          <p class="text-base">
            Location is: {getPosition().lat}, {getPosition().lng}
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
  );
};

export default SpotCreationPage;
