<template>
  <div>
    <p>home</p>
    <a href="/questions" class="link">sex</a>
  </div>
</template>

<script lang="ts" setup>
  import { useAuth0 } from "@auth0/auth0-vue";

  const auth0 = process.client ? useAuth0() : undefined;
  const user = auth0?.user.value;
</script>
