<template>
  <div
    v-if="authorizeIsProcessing"
    class="loader"
  >
    ...Loading
  </div>

  <template
    v-else
  >
    <header-layout />

    <router-view />

    <footer-layout />
  </template>
</template>

<script setup>
import HeaderLayout from "@/components/Layout/Header/index.vue";
import FooterLayout from "@/components/Layout/Footer/index.vue";

import {useAuthStore} from "@/stores/auth";

import {ref} from "vue";

import JWTService from "@/utils/services/JWTService";

const authStore = useAuthStore(),
    { getUser } = authStore;

const authorizeIsProcessing = ref(false);

async function authorize() {
  //TODO: add  stylized loader while authorize processing
  authorizeIsProcessing.value = true;

  try {
    const token = JWTService.getToken();

    if (!token) return;

    await getUser();
  } catch {
    this.$showErrorToast("При попытке авторизации произошла ошибка, необходимо перезайти в систему");
  } finally {
    authorizeIsProcessing.value = false;
  }
}

authorize();
</script>

<style>
</style>
