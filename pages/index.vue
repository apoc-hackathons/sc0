<script setup>
  import { initFlowbite } from "flowbite";

  // initialize components based on data attribute selectors
  onMounted(() => {
    initFlowbite();
  });
</script>

<template>
  <div class="text-red-500 font-extrabold text-3xl">hello world</div>
</template>
