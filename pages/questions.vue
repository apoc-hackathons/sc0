<script lang="ts" setup>
  const aChecked = ref(false);
  const bChecked = ref(false);
  const cChecked = ref(false);
  const dChecked = ref(false);
  const correct = ref(false);

  const checkedNum = computed(() => {
    let num = 0;
    if (aChecked.value) num = 1;
    if (bChecked.value) num = 2;
    if (cChecked.value) num = 3;
    if (dChecked.value) num = 4;
    return num;
  });

  const checkAns = () => {
    const correctAns = 2;
    if (checkedNum.value - 1 === correctAns) {
      console.log("correcttt");
    }
    correct.value = true;
  };
</script>

<template>
  <client-only>
    <div class="p-5">
      <div class="card max-w-full bg-slate-700">
        <div class="card-body">
          <h2 class="card-title">What is 1 + 1?</h2>
          <div class="grid grid-cols-2">
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                v-model="aChecked"
                class="checkbox checkbox-primary"
                :disabled="bChecked || cChecked || dChecked"
              />
              <span class="text-white ml-2">1 </span>
            </label>
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                v-model="bChecked"
                class="checkbox checkbox-primary"
                :disabled="aChecked || cChecked || dChecked"
              />
              <span class="text-white ml-2">yes</span>
            </label>
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                v-model="cChecked"
                :disabled="aChecked || bChecked || dChecked"
                class="checkbox checkbox-primary"
              />
              <span class="text-white ml-2">2</span>
            </label>
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                :disabled="aChecked || bChecked || cChecked"
                v-model="dChecked"
                class="checkbox checkbox-primary"
              />
              <span class="text-white ml-2">2</span>
            </label>
          </div>

          <div class="card-actions justify-start mt-5">
            <button
              :disabled="!checkedNum"
              @click="checkAns"
              class="btn btn-primary"
            >
              Next
              <Icon name="mingcute:right-line" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {{ correct ? "Correct!" : "" }}
    </div>
  </client-only>
</template>
