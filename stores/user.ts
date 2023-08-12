import { defineStore } from "pinia";
import type { User } from "@auth0/auth0-vue";

export const userStore = defineStore("user", {
  state: () => ({
    user: {} as User | undefined,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
