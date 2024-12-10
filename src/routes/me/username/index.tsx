import { useNavigate } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import {
  type ValibotValidator,
  valibotValidator,
} from "@tanstack/valibot-form-adapter";
import type { Component } from "solid-js";
import {
  type InferOutput,
  maxLength,
  minLength,
  object,
  pipe,
  regex,
  string,
} from "valibot";

import Container from "~/components/container";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import api from "~/data";
import {
  getFieldErrorMessage,
  getFieldValidationState,
  handleFormSubmit,
} from "~/helpers/form";
import { useAuthenticated } from "~/hooks/use-authenticated";
import { useI18n } from "~/i18n";

const MyUsernamePage: Component = () => {
  const user = useAuthenticated();
  const { t } = useI18n();
  const navigate = useNavigate();

  // TODO: Implement username check
  // const usernameCheckMutation = api.user.username.check.useMutation();
  const usernameChangeMutation = api.user.username.change.useMutation();

  const formSchema = object({
    username: pipe(
      string(),
      minLength(6, t.common.form.validations.minLength({ minLength: 6 })),
      maxLength(24, t.common.form.validations.maxLength({ maxLength: 24 })),
      regex(/^[a-zA-Z0-9_]+$/g, t.me.username.form.validations.username()),
    ),
  });
  type FormData = InferOutput<typeof formSchema>;
  const form = createForm<FormData, ValibotValidator>(() => ({
    defaultValues: {
      username:
        /[a-zA-Z0-9_]+/g.exec(user.data?.data?.username ?? "")?.[0] ?? "",
    },
    validatorAdapter: valibotValidator(),
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      await usernameChangeMutation.mutateAsync(() => value);
      showToast({
        title: t.me.username.toast.success.title(),
        variant: "success",
      });
      navigate("/");
    },
  }));

  return (
    <Container>
      <h1 class="font-bold text-2xl">{t.me.username.title()}</h1>

      <form class="mt-4" onSubmit={handleFormSubmit(form.handleSubmit)}>
        <form.Field name="username">
          {(field) => (
            <>
              <TextField validationState={getFieldValidationState(field())}>
                <TextFieldLabel for={field().name}>
                  {t.me.username.form.fields.username.label()}
                </TextFieldLabel>
                <TextFieldInput
                  id={field().name}
                  name={field().name}
                  type="text"
                  onChange={(e) => field().handleChange(e.target.value)}
                  onBlur={field().handleBlur}
                  value={field().state.value}
                  placeholder={t.me.username.form.fields.username.placeholder()}
                />
                <TextFieldErrorMessage class="mt-2">
                  {getFieldErrorMessage(field())}
                </TextFieldErrorMessage>
              </TextField>
            </>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              disabled={state().values.username.length < 1}
              class="mt-6 w-full"
            >
              {t.common.actions.submit()}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Container>
  );
};

export default MyUsernamePage;
