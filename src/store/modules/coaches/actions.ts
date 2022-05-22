import config from "@/config";
import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { CoachesState } from "./types";

const actions: ActionTree<CoachesState, RootState> = {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            // id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas,
        };
        const token = context.rootGetters.token
        // sending to firebase must include [key].json in the end of the url
        // store data in server
        const url = config.BASE_URL + `/coaches/${userId}.json?auth=${token}`;
        const response = await fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(coachData),
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            // error...
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId,
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }
        const url = config.BASE_URL + `/coaches.json`;
        const response = await fetch(url);

        const responseData = await response.json();

        if (!response.ok) {
            // error...
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    },
}

export default actions;