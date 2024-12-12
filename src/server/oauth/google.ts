import { type Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { Google } from "arctic";

import serverEnv from "~/helpers/env-server";
import { getBaseUrl } from "~/helpers/url";

namespace GoogleOAuth {
  export const client = new Google(
    serverEnv.OAUTH_GOOGLE_CLIENT_ID,
    serverEnv.OAUTH_GOOGLE_CLIENT_SECRET,
    `${getBaseUrl()}api/auth/login/google/callback`,
  );

  export const scope = ["openid", "profile", "email"];

  export const tokenSchema = Type.Object({
    iss: Type.String(),
    azp: Type.String(),
    aud: Type.String(),
    sub: Type.String(),
    email: Type.String(),
    email_verified: Type.Boolean(),
    at_hash: Type.String(),
    name: Type.String(),
    picture: Type.String(),
    given_name: Type.String(),
    family_name: Type.String(),
    iat: Type.Number(),
    exp: Type.Number(),
  });
  type TokenSchema = Static<typeof tokenSchema>;

  export function parseToken(data: unknown): TokenSchema {
    return Value.Decode(tokenSchema, data);
  }
}

export default GoogleOAuth;
