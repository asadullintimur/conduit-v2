import {defineStore} from "pinia";

import {computed, ref} from "vue";
import type {Ref} from "vue";

import axios from "axios";

import apiClient from "@/utils/api/client";
import {HTTP_STATUSES} from "@/utils/ts/enums/httpStatuses";
import showErrorToast from "@/utils/plugins/pinia/showErrorToast";
import JWTService from "@/utils/services/JWTService";
import { User, RegisterCredentials, RegisterPayload, LoginCredentials, LoginPayload } from "@/utils/ts/types/auth";

export const useAuthStore = defineStore("auth", () => {
    const user: Ref<null | User> = ref(null);

    const isAuthorized = computed(() => !!user.value);

    async function register(credentials: RegisterCredentials) {
        try {
            const registerPayload: RegisterPayload = {
                user: credentials
            };

            const resp = await apiClient.post("/users", registerPayload),
                {data: {user: {token, ...respUser}}} = resp;

            user.value = respUser;

            JWTService.setToken(token);

            return resp;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status !== HTTP_STATUSES.VALIDATION_ERROR) showErrorToast();
            }

            return Promise.reject(error);
        }
    }

    async function login(credentials: LoginCredentials) {
        try {
            const loginPayload: LoginPayload = {
                user: credentials
            };

            const resp = await apiClient.post("/users/login", loginPayload),
                {data: {user: {token, ...respUser}}} = resp;

            user.value = respUser;

            JWTService.setToken(token);

            return resp;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status !== HTTP_STATUSES.VALIDATION_ERROR) showErrorToast();
            }

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