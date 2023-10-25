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


<script setup>
import {reactive, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

defineOptions({
  name: "RegisterView"
});

const authStore = useAuthStore();

const router = useRouter();

const credentials = reactive({
      username: "pizda1",
      email: "pizda1@pizda.com",
      password: "test"
    }), errors = ref(null),
    registerIsProcessing = ref(false);

async function register() {
  errors.value = null;

  registerIsProcessing.value = true;

  try {
    await authStore.register(credentials);

    router.push({name: "home"});
  } catch (error) {
    handleRegisterError(error);
  } finally {
    registerIsProcessing.value = false;
  }
}

function handleRegisterError(error) {
  const respErrors = error.response?.data.errors;

  if (!respErrors) return;

  errors.value = respErrors;
}
</script>

<style scoped>

</style>