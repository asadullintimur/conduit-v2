<template>
  <ul
    v-if="errors"

    class="error-messages"
  >
    <li
      v-for="(fieldErrors, field) in errors"
      :key="field"
    >
      {{ getFieldErrorsOutput(field, fieldErrors) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type {Errors} from "@/utils/ts/types/common";

defineOptions({
  name: "ErrorMessages"
});

defineProps<{
  errors: Errors
}>();

function getFieldErrorsOutput(field: string, fieldErrors: Array<string>) {
  const fieldErrorsString =  fieldErrors.join(",");

  return `${field}: ${fieldErrorsString}`;
}
</script>

<style scoped>

</style>