<template>
  <client-only>
    <div class="hero h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold text-discord-blurple">EduApp</h1>
          <p class="text-3xl my-5">Tests made easy</p>
          <a v-if="isAuthenticated" href="/guilds" class="mt-4 btn btn-primary"
            >Take test</a
          >
          <button
            v-if="!isAuthenticated"
            @click="login"
            class="mt-4 ml-3 btn btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
  import { useAuth0 } from "@auth0/auth0-vue";

  // Composition API
  const auth0 = process.client ? useAuth0() : undefined;

  const isAuthenticated = computed(() => {
    return auth0?.isAuthenticated.value;
  });

  const login = async () => {
    await auth0?.loginWithRedirect();
  };
</script>
