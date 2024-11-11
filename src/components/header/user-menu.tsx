import { Icon } from "@iconify-icon/solid";
import { type Component, Show } from "solid-js";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import api from "~/data";

const HeaderUserMenu: Component = () => {
  const meQuery = api.user.me.useQuery(() => null);

  return (
    <Avatar class="ml-auto">
      <Show
        when={meQuery.isSuccess && meQuery.data?.data}
        fallback={
          <AvatarFallback
            as="button"
            onClick={() => api.auth.login.google.get()}
          >
            <Icon icon="tabler:user" width="24px" />
          </AvatarFallback>
        }
      >
        <AvatarFallback>
          {meQuery.data?.data?.username.slice(0, 2).toUpperCase() ?? ""}
        </AvatarFallback>
      </Show>
    </Avatar>
  );
};

export default HeaderUserMenu;
