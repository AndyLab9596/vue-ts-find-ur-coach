<template>
  <div>
    <!-- Error modal -->
    <base-dialog :show="!!error" @close="handleError" title="An error occurred">
      <p>{{ error }}</p>
    </base-dialog>
    <!-- Main Section -->
    <section>
      <!-- Filter -->
      <coach-filter @change-filters="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            Refresh
          </base-button>
          <base-button
            link
            to="/register"
            v-if="!isCoach && !isLoading && isLoggedIn"
          >
            Register as Coach
          </base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches && !isLoading">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :lastName="coach.lastName"
            :firstName="coach.firstName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { ICoach, IFilters } from "./types";
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default defineComponent({
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      error: null as string | null,
      isLoading: false as boolean,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      } as IFilters,
    };
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"] as ICoach[];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
      });
    },
    ...mapGetters({
      hasCoaches: "coaches/hasCoaches",
      isCoach: "coaches/isCoach",
      isLoggedIn: "isAuthenticated",
    }),
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (e) {
        if (e instanceof Error) {
          this.error = e.message || "Something went wrong";
        } else {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
      this.isLoading = false;
    },
    setFilters(updateFilter: IFilters) {
      this.activeFilters = updateFilter;
    },
  },
});
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
