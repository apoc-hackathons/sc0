<template>
  <div class="text-white">
    <a v-if="!isAuthenticated" @click="login">
      <slot>Log In</slot>
    </a>

    <a v-else @click="logout">
      <slot>Log Out</slot>
      {{ auth0?.user?.value?.name }}
    </a>
  </div>
</template>

<script lang="ts" setup>
  import { useAuth0 } from "@auth0/auth0-vue";

  // Composition API
  const auth0 = process.client ? useAuth0() : undefined;

  const isAuthenticated = computed(() => {
    return auth0?.isAuthenticated.value;
  });

  const login = () => {
    auth0?.loginWithRedirect();
  };

  const logout = () => {
    navigateTo("/");
    auth0?.logout();
  };
</script>
