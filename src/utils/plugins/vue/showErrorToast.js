import showErrorToast from "@/utils/helpers/showErrorToast";

export default {
    install: app => {
        app.config.globalProperties.$showErrorToast = showErrorToast;
    }
};