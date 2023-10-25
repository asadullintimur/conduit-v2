<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>

          <error-messages :errors="errors" />

          <form>
            <fieldset
              :disabled="loginIsProcessing"

              class="form-group"
            >
              <input
                v-model="credentials.email"

                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset
              :disabled="loginIsProcessing"

              class="form-group"
            >
              <input
                v-model="credentials.password"

                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>
            <button
              :disabled="loginIsProcessing"

              class="btn btn-lg btn-primary pull-xs-right"

              @click.prevent="login"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {reactive, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

defineOptions({
  name: "LoginView"
});

const authStore = useAuthStore();

const router = useRouter();

const credentials = reactive({
      email: "pizda1@pizda.com",
      password: "test"
    }),
    errors = ref(null),
    loginIsProcessing = ref(false);

async function login() {
  errors.value = null;

  loginIsProcessing.value = true;

  try {
    await authStore.login(credentials);

    router.push({name: "home"});
  } catch (error) {
    handleLoginError(error);
  } finally {
    loginIsProcessing.value = false;
  }
}

function handleLoginError(error) {
  const respErrors = error.response?.data.errors;

  if (!respErrors) return;

  errors.value = respErrors;
}

</script>

<style scoped>

</style>