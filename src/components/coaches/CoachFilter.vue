<template>
    <base-card>
        <h2>Find your coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter" />
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="setFilter" />
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter" />
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import { IFilters } from "@/pages/coaches/types";

export default defineComponent({
    emits: ["change-filters"],
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true,
            } as IFilters,
        };
    },
    methods: {
        setFilter(e: Event ) {
            const inputId = (e.target as HTMLInputElement).id;
            const isActive = (e.target as HTMLInputElement).checked;
            const updateFilter = {
                ...this.filters,
                [inputId]: isActive,
            };
            this.filters = updateFilter;
            this.$emit("change-filters", updateFilter);
        },
    },
});
</script>

<style lang="scss" scoped>
h2 {
    margin: 0.5rem 0;
}

.filter-option {
    margin-right: 1rem;

    label {
        vertical-align: middle;
        margin-left: 0.25rem;
    }

    input {
        vertical-align: middle;
    }

    .active {
        label {
            font-weight: bold;
        }
    }
}
</style>
