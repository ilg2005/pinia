import {defineStore} from "pinia";
import {groupBy, sumBy} from "lodash";
import {useAuthUserStore} from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
    state: () => ({
        items: []
    }),

    actions: {
        checkout() {
            const authUserStore = useAuthUserStore();

            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
        },
        addItems(count, item) {
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
                this.items.push({...item});
            }
        },
        deleteItem(name) {
            this.items = this.items.filter(i => i.name !== name);
        },
        setItemCount(item, count) {
            if (count === 0) {
                this.deleteItem(item.name)
                return
            }

            const groupCount = this.groupCount(item.name)
            const diff = Math.abs(count - groupCount)

            for (let i = 0; i < diff; i++) {
                if (count > groupCount) {
                    this.addItems(1, item)
                } else {
                    const index = this.items.findIndex(i => i.name === item.name);
                    this.items.splice(index, 1)
                }
            }
        },
    },

    getters: {
        count: state => state.items.length,
        isEmpty: state => state.count === 0,
        grouped: state => {
            const grouped = groupBy(state.items, item => item.name);
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach(key => inOrder[key] = grouped[key]);
            return inOrder;
        },
        groupCount: state => name => state.grouped[name].length,
        total: state => sumBy(state.items, item => item.price),
    }
})
