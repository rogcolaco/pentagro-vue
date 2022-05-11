<template>
  <div class="form-floating mb-3">
    <input
      v-bind:type="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="identityValue"
      :id="identityValue"
      class="form-control"
    />
    <label :for="identityValue">{{ inputLabel }}</label>
  </div>
</template>

<script>
export default {
  props: ['inputLabel', 'inputType', 'modelValue', 'identityValue'],
  emits: ['update:modelValue'],
};
</script>

<style>
</style>