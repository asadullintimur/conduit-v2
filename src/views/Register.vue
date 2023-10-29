<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>

          <error-messages :errors="errors" />

          <form>
            <fieldset
              class="form-group"
              :disabled="registerIsProcessing"
            >
              <input
                v-model="credentials.username"

                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
              >
            </fieldset>

            <fieldset
              class="form-group"
              :disabled="registerIsProcessing"
            >
              <input
                v-model="credentials.email"

                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>

            <fieldset
              class="form-group"
              :disabled="registerIsProcessing"
            >
              <input
                v-model="credentials.password"

                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>

            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="registerIsProcessing"

              @click.prevent="register"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {reactive, ref} from "vue";
import type {Ref} from "vue";

import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";

import {RegisterCredentials} from "@/utils/ts/types/auth";
import {Errors} from "@/utils/ts/types/common";

import axios from "axios";

defineOptions({
  name: "RegisterView"
});

const authStore = useAuthStore();

const router = useRouter();

const credentials: RegisterCredentials = reactive({
      username: "sobaka1",
      email: "sobaka1@sobaka.com",
      password: "sobaka"
    }), errors: Ref<Errors> = ref(null),
    registerIsProcessing = ref(false);

async function register() {
  errors.value = null;

  registerIsProcessing.value = true;

  try {
    await authStore.register(credentials);

    router.push({name: "home"});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const respErrors = error.response?.data.errors;

      if (!respErrors) return;

      errors.value = respErrors;

      return;
    }

    throw error;
  } finally {
    registerIsProcessing.value = false;
  }
}
</script>

<style scoped>

</style>