<template>
  <div class="form-floating mb-3">
    <input v-bind:type="inputType" name="input-text" id="input-text" class="form-control">
    <label for="input-text">{{inputLabel}}</label>
  </div>
</template>

<script>
export default {
  props: {
      inputLabel: String,
      inputType: String
  },
};
</script>

<style>

</style>