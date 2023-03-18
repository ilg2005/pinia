import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
    state: () => ({
        products: [],
    }),

    actions: {
       async fill() {
          this.products = (await import("@/data/products.json")).default;
       }
    }

    // getters
});
