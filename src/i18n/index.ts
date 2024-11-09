import {
  type Flatten,
  type NullableChainedTranslator,
  flatten,
  proxyTranslator,
  translator,
} from "@solid-primitives/i18n";
import {
  type Resource,
  createResource,
  createSignal,
  startTransition,
} from "solid-js";

import type en from "~/i18n/locales/en";

export type Locale = "en" | "jp";
export type RawDictionary = typeof en;
export type Dictionary = Flatten<RawDictionary>;

export async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const dict: RawDictionary = (await import(`./locales/${locale}.ts`)).default;
  return flatten(dict);
}

const [getLocale, setLocale] = createSignal<Locale>("en");

export interface I18n {
  t: NullableChainedTranslator<Dictionary, string>;
  dict: Resource<Dictionary>;
  getLocale: typeof getLocale;
  changeLocale: (locale: Locale) => void;
}
export function useI18n(): I18n {
  const [dict] = createResource(getLocale, fetchDictionary);
  const t = proxyTranslator(translator(dict));

  const changeLocale = (locale: Locale) =>
    startTransition(() => setLocale(locale));

  return { t, dict, getLocale, changeLocale };
}
