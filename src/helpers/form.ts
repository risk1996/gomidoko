import type { DeepKeys, FieldApi, Validator } from "@tanstack/solid-form";
import type { BaseIssue, GenericSchema, GenericSchemaAsync } from "valibot";

type AnyFieldApi<T> = FieldApi<
  T,
  DeepKeys<T>,
  undefined,
  Validator<
    unknown,
    | GenericSchema<unknown, unknown, BaseIssue<unknown>>
    | GenericSchemaAsync<unknown, unknown, BaseIssue<unknown>>
  >
>;

export function getFieldValidationState<T>(
  field: AnyFieldApi<T>,
): "valid" | "invalid" {
  return field.state.meta.errors.filter(Boolean).length > 0
    ? "invalid"
    : "valid";
}

export function getFieldErrorMessage<T>(field: AnyFieldApi<T>): string {
  return field.state.meta.errors.filter(Boolean).join(", ");
}

export function handleFormSubmit(
  handleSubmit: () => Promise<void>,
): (e: SubmitEvent) => Promise<void> {
  return async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    await handleSubmit();
  };
}
