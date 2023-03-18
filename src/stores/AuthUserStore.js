import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => ({
        username: "danielkelly_io"
    }),
})
