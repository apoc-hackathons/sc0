<script lang="ts" setup>
  const { data: questions } = useFetch<Question[]>(
    "https://statuscode.shiemi.repl.co/test",
    {
      method: "post",
      body: {
        response: [],
      },
    }
  );

  const currentQues = ref(0);
  const done = ref(false);
  const aChecked = ref(false);
  const bChecked = ref(false);
  const cChecked = ref(false);
  const dChecked = ref(false);
  const correct = ref(false);

  const correctAnswers = ref<String[]>([]);
  const wrongAnswers = ref<String[]>([]);

  const checkedNum = computed(() => {
    let num = 0;
    if (aChecked.value) num = 1;
    if (bChecked.value) num = 2;
    if (cChecked.value) num = 3;
    if (dChecked.value) num = 4;
    return num;
  });

  const checkCorrect = () => {
    if (
      checkedNum.value - 1 ===
      questions.value?.[currentQues.value].correctAns
    ) {
      correctAnswers.value?.push(questions.value?.[currentQues.value]._id);
      correct.value = true;

      currentQues.value++;

      aChecked.value = false;
      bChecked.value = false;
      cChecked.value = false;
      dChecked.value = false;

      return true;
    }

    correct.value = false;

    aChecked.value = false;
    bChecked.value = false;
    cChecked.value = false;
    dChecked.value = false;
    wrongAnswers.value?.push(questions.value![currentQues.value]._id);
    currentQues.value++;

    return false;
  };

  watch(currentQues, () => {
    if (currentQues.value === questions.value?.length) {
      // TODO: Make API call to store score, wrong and right answers

      done.value = true;
    }
  });
</script>

<template>
  <client-only>
    <div class="p-5">
      <div class="card max-w-full bg-slate-700" v-if="!done">
        <div class="card-body">
          <h2 class="card-title flex">
            {{ currentQues + 1 }}. {{ questions![currentQues].question }}
          </h2>
          <div class="grid grid-cols-2">
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                v-model="aChecked"
                class="checkbox checkbox-primary"
                :disabled="bChecked || cChecked || dChecked"
              />
              <span class="text-white ml-2">
                {{ questions![currentQues].answers[0] }}
              </span>
            </label>
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                v-model="bChecked"
                class="checkbox checkbox-primary"
                :disabled="aChecked || cChecked || dChecked"
              />
              <span class="text-white ml-2">{{
                questions![currentQues].answers[1]
              }}</span>
            </label>
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                v-model="cChecked"
                :disabled="aChecked || bChecked || dChecked"
                class="checkbox checkbox-primary"
              />
              <span class="text-white ml-2">{{
                questions![currentQues]?.answers[2]
              }}</span>
            </label>
            <label class="flex cursor-pointer mt-3">
              <input
                type="checkbox"
                :disabled="aChecked || bChecked || cChecked"
                v-model="dChecked"
                class="checkbox checkbox-primary"
              />
              <span class="text-white ml-2">{{
                questions![currentQues].answers[3]
              }}</span>
            </label>
          </div>

          <div class="card-actions justify-start mt-5">
            <button
              :disabled="!checkedNum"
              @click="checkCorrect"
              class="btn btn-primary"
            >
              Next
              <Icon name="mingcute:right-line" class="w-6 h-6" />
            </button>

            <div
              class="radial-progress"
              :style="`--value: ${
                ((currentQues + 1) / questions!.length) * 100
              };   --size=1.2rem`"
            >
              {{ currentQues + 1 }}/{{ questions!.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero h-screen" v-if="done">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h3 class="text-6xl font-bold text-discord-blurple">Done! 🎉</h3>
          <p class="mt-5 text-xl font-semibold">
            You've scored: {{ correctAnswers?.length }}/{{ questions!.length }}
          </p>
        </div>
      </div>
    </div>
  </client-only>
</template>

<!-- this code is terrible, I bet there are better ways to do this
but it works so idc
-->
