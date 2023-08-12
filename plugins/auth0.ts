import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    clientId: "QfjXdZ3fTwd7h2Uxu5f4MK0WHvsVyP9A",
    domain: "dev-gxmeel3ks2k83oxu.us.auth0.com",
    authorizationParams: {
      redirect_uri: "http://localhost:3000/",
    },
    cacheLocation: "localstorage",
    useRefreshTokens: true,
  });

  if (process.client) {
    nuxtApp.vueApp.use(auth0);
  }
});
