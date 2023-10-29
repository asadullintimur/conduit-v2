<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        :to="{name: 'home'}"
      >
        conduit
      </router-link>

      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"

            :to="{ name: 'home'}"
            active-class="active"
          >
            Home
          </router-link>
        </li>

        <template
          v-if="isAuthorized"
        >
          <li class="nav-item">
            <a
              class="nav-link"
              href="/settings"
            >
              <i class="ion-gear-a" />&nbsp;Settings</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/editor"
            > <i class="ion-compose" />&nbsp;New article</a>
          </li>
        </template>

        <template
          v-else
        >
          <li class="nav-item">
            <router-link
              :to="{ name: 'login'}"

              active-class="active"
              class="nav-link"
            >
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'register'}"

              active-class="active"
              class="nav-link"
            >
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<script setup lang="ts">
import {toRefs} from "vue";

import {useAuthStore} from "@/stores/auth";

defineOptions({
  name: "HeaderLayout"
});

const authStore = useAuthStore(),
    {isAuthorized} = toRefs(authStore);
</script>

<style scoped>

</style>