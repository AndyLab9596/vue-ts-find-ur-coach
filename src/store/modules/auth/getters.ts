import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { AuthState } from "./types";

const getters: GetterTree<AuthState, RootState> = {
    userId(state) {
        return state.userId
    },
    token(state) {
        return state.token
    },
    didAutoLogout(state) {
        return state.didAutoLogout
    },
    isAuthenticated(state) {
        return !!state.token
    }
};

export default getters;