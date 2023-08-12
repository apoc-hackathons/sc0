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

  const logout = () => {
    auth0?.logout({
      logoutParams: {
        returnTo: "http://localhost:3000/",
      },
    });
  };
</script>

<template>
  <body class="bg-slate-800 min-h-screen">
    <div class="navbar bg-slate-700">
      <div class="flex-1">
        <div class="drawer-content">
          <!-- Page content here -->
          <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button">
            <Icon name="ci:hamburger-lg" class="w-6 h-6" />
          </label>
        </div>
        <a href="/" class="btn btn-ghost font-extrabold normal-case text-xl"
          >EduApp</a
        >
      </div>
      <div class="flex-none">
        <div v-if="!auth0?.user?.value?.name" class="dropdown dropdown-end">
          <a tabindex="0" class="btn btn-ghost btn-circle" @click="login">
            <div class="indicator">
              <Icon name="ic:outline-login" class="w-6 h-6" />
            </div>
          </a>
        </div>
        <div v-if="auth0?.user?.value?.picture" class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="auth0?.user?.value?.picture" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li @click="logout"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="drawer z-50">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />

      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>

        <ul class="menu p-4 w-80 h-full bg-slate-800 text-base-content">
          <a href="/" class="btn btn-ghost font-extrabold normal-case text-xl"
            >EduApp</a
          >
          <!-- Sidebar content here -->
          <li><a href="/">Home</a></li>
        </ul>
      </div>
    </div>
    <main class="text-white">
      <slot />
    </main>
  </body>
</template>
