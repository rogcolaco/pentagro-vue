<template>
  <div class="form-floating mb-3">
    <input
      v-bind:type="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      name="input-text"
      id="input-text"
      class="form-control"
    />
    <label for="input-text">{{ inputLabel }}</label>
  </div>
</template>

<script>
export default {
  props: ['inputLabel', 'inputType', 'modelValue'],
  emits: ['update:modelValue'],
};
</script>

<style>
</style>