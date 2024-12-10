import { useNavigate } from "@solidjs/router";
import { type QueryKey, useQueryClient } from "@tanstack/solid-query";
import { type Component, createRenderEffect } from "solid-js";

import api from "~/data";
import type { UserMeQuery } from "~/data/user/me/query";

const OAuthLoggedInPage: Component = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  createRenderEffect(async () => {
    const user = await queryClient.fetchQuery<
      UserMeQuery.Response,
      UserMeQuery.Error,
      UserMeQuery.Response,
      QueryKey
    >({ queryKey: api.user.me.getQueryKey(() => null) });

    const shouldChangeUsername = user?.data?.username === user?.data?.email;
    if (shouldChangeUsername) navigate("/me/username");
    else navigate("/");
  });

  return null;
};

export default OAuthLoggedInPage;
