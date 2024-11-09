import { type Component, type JSX, Show, Suspense } from "solid-js";
import { useI18n } from "~/i18n";

export interface I18nProviderProps {
  children?: JSX.Element;
}

const I18nProvider: Component<I18nProviderProps> = (props) => {
  const { dict } = useI18n();

  return (
    <Suspense>
      <Show when={dict()}>{props.children}</Show>
    </Suspense>
  );
};

export default I18nProvider;
