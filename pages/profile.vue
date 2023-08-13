<template>
  <client-only>
    <div class="p-5">
      <div class="card w-96 bg-slate-700 mr-5">
        <div class="card-body">
          <img
            :src="user?.picture"
            :alt="user?.name"
            class="rounded-full w-40"
          />
          <p class="text-xl">
            Greetings <span class="font-bold">{{ user?.given_name }}</span>
          </p>
          <p>@{{ user?.nickname }}</p>
        </div>
      </div>
      <div class="mt-5 card w-96 bg-slate-700">
        <div class="card-body">
          <p class="font-bold">Recent tests</p>
          <ul>
            <li
              v-for="sub in history"
              :key="sub._id"
              class="border-y-gray-400/50 first:border-b-2 first:border-t-0 border-b-2 last:border-y-0"
            >
              {{ sub.subject }} - {{ sub.score }}/10
            </li>
          </ul>
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

  const { data: history } = await useFetch("/api/history");
</script>
