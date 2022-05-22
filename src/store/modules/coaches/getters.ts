import { ICoach } from "@/pages/coaches/types";
import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { CoachesState } from "./types";

const getters: GetterTree<CoachesState, RootState> = {
    coaches(state) {
        return state.coaches
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true
        }
        const currentTimestamp = new Date().getTime();
        return (currentTimestamp - Number(lastFetch)) / 1000 > 60;
    },
    hasCoaches(state) {
        return !!state.coaches && state.coaches.length > 0;
    },
    isCoach(state, getters, rootState, rootGetters) {
        const coaches = getters.coaches as ICoach[];
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id === userId)
    }
}

export default getters;