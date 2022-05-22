import { Module } from "vuex";
import { RootState } from "../../types";
import { AuthState } from "./types";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const auth: Module<AuthState, RootState> = {
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false,
        }
    },
    actions,
    mutations,
    getters
}

export default auth;