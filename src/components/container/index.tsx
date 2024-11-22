import { type Component, splitProps } from "solid-js";

import { Flex, type FlexProps } from "~/components/ui/flex";
import { cn } from "~/helpers/styling";

export type ContainerProps = FlexProps;

const Container: Component<ContainerProps> = (props) => {
  const [local, others] = splitProps(props, [
    "flexDirection",
    "alignItems",
    "class",
  ]);

  return (
    <Flex
      flexDirection={local.flexDirection ?? "col"}
      alignItems={local.alignItems ?? "stretch"}
      class={cn(
        "mx-auto max-w-screen-sm p-2 lg:p-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl",
        local,
      )}
      {...others}
    />
  );
};

export default Container;
