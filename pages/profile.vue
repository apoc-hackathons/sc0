<template>
  <client-only>
    <div class="p-5">
      <div class="card w-96 bg-slate-700">
        <div class="card-body">
          <img
            :src="user?.picture"
            :alt="user?.name"
            class="rounded-full w-40"
          />
          <p class="text-xl">
            Greetings <span class="font-bold">{{ user?.name }}</span>
          </p>
          <p>@{{ user?.nickname }}</p>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
  import { useAuth0 } from "@auth0/auth0-vue";

  // Composition API
  const auth0 = process.client ? useAuth0() : undefined;

  const isAuthenticated = computed(() => {
    return auth0?.isAuthenticated.value;
  });

  const user = computed(() => {
    return auth0?.user.value;
  });
</script>
