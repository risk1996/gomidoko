import {
  type Flatten,
  type NullableChainedTranslator,
  flatten,
  proxyTranslator,
  translator,
} from "@solid-primitives/i18n";
import {
  type Accessor,
  type Resource,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import type en from "~/i18n/locales/en";
import day from "~/lib/dayjs";

export type Locale = "en" | "ja";
export type RawDictionary = typeof en;
export type Dictionary = Flatten<RawDictionary>;

export async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const dict: RawDictionary = (await import(`./locales/${locale}.ts`)).default;
  return flatten(dict);
}

export interface I18n {
  t: NullableChainedTranslator<Dictionary, string>;
  dict: Resource<Dictionary>;
  getLocale: Accessor<Locale>;
  changeLocale: (locale: Locale) => void;
}
export type I18nT = I18n["t"];
export function useI18n(): I18n {
  const [getLocale, setLocale] = createSignal<Locale>("en");
  createEffect(() => day.locale(getLocale()));

  const [dict] = createResource(getLocale, fetchDictionary);
  const t = proxyTranslator(translator(dict));

  return { t, dict, getLocale, changeLocale: setLocale };
}
