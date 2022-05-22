import { MutationTree } from "vuex";
import { AuthState } from "./types";

const mutations: MutationTree<AuthState> = {
    setUser(state, payload) {
        const { token, userId } = payload;
        state.userId = userId;
        state.token = token;
    },

    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
}

export default mutations;