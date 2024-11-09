import { type Accessor, createMemo } from "solid-js";

import { useI18n } from "~/i18n";

export interface Intl {
  date: {
    medium: () => Intl.DateTimeFormat;
  };
}

export default function useIntl(): Accessor<Intl> {
  const { getLocale } = useI18n();

  return createMemo(() => ({
    date: {
      medium: () =>
        new Intl.DateTimeFormat(getLocale(), { dateStyle: "medium" }),
    },
  }));
}
