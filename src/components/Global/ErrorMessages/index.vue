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

<script setup>
defineOptions({
  name: "ErrorMessages"
});

defineProps({
  errors: {
    validator(prop) {
      return typeof prop === "object" || prop === null;
    },
    required: true
  }
});

function getFieldErrorsOutput(field, fieldErrors) {
  const fieldErrorsString =  fieldErrors.join(",");

  return `${field}: ${fieldErrorsString}`;
}
</script>

<style scoped>

</style>