import { Module } from "vuex";
import { RootState } from "../../types";
import { CoachesState } from "./types";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const coaches: Module<CoachesState, RootState> = {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            coaches: []
        }
    },
    actions,
    mutations,
    getters
}

export default coaches;