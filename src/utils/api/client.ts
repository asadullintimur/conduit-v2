import axios from "axios";

import {useAuthStore} from "@/stores/auth";

import {HTTP_STATUSES} from "@/utils/ts/enums/httpStatuses";
import JWTService from "@/utils/services/JWTService";

const apiClient =  axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        timeout: 12000,
        headers: {
            "Authorization": `Bearer ${JWTService.getToken()}`
        }
    }
);

apiClient.interceptors.response.use(null, error => {
    if (error.response?.status === HTTP_STATUSES.UNAUTHORIZED) {
        const authStore = useAuthStore();

        authStore.logout();
    }

    return Promise.reject(error);
});

export default apiClient;

