import { useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import { type Component, createRenderEffect } from "solid-js";

import api from "~/data";

const OAuthLoggedIn: Component = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  createRenderEffect(() => {
    queryClient.refetchQueries({
      queryKey: api.user.me.getQueryKey(() => null),
    });
    navigate("/");
  });

  return null;
};

export default OAuthLoggedIn;
