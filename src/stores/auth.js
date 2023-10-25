import {defineStore} from "pinia";

import {computed, ref} from "vue";

import apiClient from "@/utils/api/client";
import HTTP_STATUSES from "@/utils/constants/httpStatuses";
import showErrorToast from "@/utils/plugins/pinia/showErrorToast";
import JWTService from "@/utils/services/JWTService";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);

    const isAuthorized = computed(() => !!user.value);

    async function register(credentials) {
        try {
            const resp = await apiClient.post("/users", {user: credentials}),
                {data: {user: {token, ...respUser}}} = resp;

            user.value = respUser;

            JWTService.setToken(token);

            return resp;
        } catch (error) {
            if (error.response?.status !== HTTP_STATUSES.VALIDATION_ERROR) showErrorToast();

            return Promise.reject(error);
        }
    }

    async function login(credentials) {
        try {
            const resp = await apiClient.post("/users/login", {user: credentials}),
                {data: {user: {token, ...respUser}}} = resp;

            user.value = respUser;

            JWTService.setToken(token);

            return resp;
        } catch (error) {
            if (error.response?.status !== HTTP_STATUSES.VALIDATION_ERROR) showErrorToast();

            return Promise.reject(error);
        }
    }

    async function getUser() {
        try {
            const resp = await apiClient.get("/user"),
                {data: {user: respUser}} = resp;

            user.value = respUser;

            return resp;
        } catch (error) {
            showErrorToast();

            return Promise.reject(error);
        }
    }

    function logout() {
        JWTService.clearToken();

        user.value = null;
    }

    return {
        user,

        isAuthorized,

        register,
        login,
        getUser,
        logout
    };
});