import { MutationTree } from "vuex";
import { CoachesState } from "./types";

const mutations: MutationTree<CoachesState> = {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
}

export default mutations;