import type { RouteSectionProps } from "@solidjs/router";
import MapView from "~/components/mapgl-view";

import Button from "~/components/ui/button";
import apiClient from "~/helpers/api";

export default function Login(props: RouteSectionProps) {
  // const loggingIn = useSubmission(loginOrRegister);

  const handleClick = () => apiClient.api.auth.login.google.get();

  return (
    <>
      <MapView />
      <h1>Login</h1>
      <form method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={props.params.redirectTo ?? "/"}
        />
        <fieldset>
          <legend>Login or Register?</legend>
          <label>
            <input type="radio" name="loginType" value="login" checked={true} />{" "}
            Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>
        </fieldset>
        <div>
          <label for="username-input">Username</label>
          <input name="username" placeholder="kody" />
        </div>
        <div>
          <label for="password-input">Password</label>
          <input name="password" type="password" placeholder="twixrox" />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleClick}>
          Login with Google
        </button>
        <Button>Login with Google</Button>
        {/* <Show when={loggingIn.result}>
          <p style={{ color: "red" }} role="alert" id="error-message">
            {loggingIn.result!.message}
          </p>
        </Show> */}
      </form>
    </>
  );
}
