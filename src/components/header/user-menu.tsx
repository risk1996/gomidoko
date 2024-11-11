import { Icon } from "@iconify-icon/solid";
import { type Component, Show } from "solid-js";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import api from "~/data";

const HeaderUserMenu: Component = () => {
  const meQuery = api.user.me.useQuery(() => null);
  const logoutMutation = api.auth.logout.useMutation(() => null);

  async function logout() {
    await logoutMutation.mutateAsync(null);
  }

  return (
    <Avatar class="ml-auto">
      <Show
        // TODO: File bug, when flipping this condition, the state is stuck to the old state
        when={meQuery.data?.data && meQuery.isSuccess}
        fallback={
          <AvatarFallback as="a" target="_self" href="/api/auth/login/google">
            <Icon icon="tabler:user" width="24px" />
          </AvatarFallback>
        }
      >
        <AvatarFallback as="button" onClick={logout}>
          {meQuery.data?.data?.username.slice(0, 2).toUpperCase() ?? ""}
        </AvatarFallback>
      </Show>
    </Avatar>
  );
};

export default HeaderUserMenu;
