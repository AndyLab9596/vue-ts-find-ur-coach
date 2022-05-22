import { RootState } from "@/store/types";
import { Module } from "vuex";
import { RequestsState } from "./types";
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const requests: Module<RequestsState, RootState> = {
    namespaced: true,
    state() {
        return {
            requests: [],
        };
    },
    mutations,
    actions,
    getters,
}

export default requests;