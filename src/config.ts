import { UserManagerSettingsStore } from "oidc-client-ts";

const config = {
  auth: {
    authority: "http://localhost:8080/realms/oracaoapp",
    client_id: "webui",
    redirect_uri: `${window.origin}/login-callback`,
    scope: "openid profile",
    post_logout_redirect_uri: `${window.origin}/logout-callback`,
  } as UserManagerSettingsStore,
  baseApi: "http://localhost:5001",
  itemsPerPage: 50,
};

export default config;
