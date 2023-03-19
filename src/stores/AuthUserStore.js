import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => ({
        username: "danielkelly_io"
    }),
    actions: {
        visitTwitterProfile() {
            window.open(`https://twitter.com/${this.username}`, '_blank');
        }
    }
})
