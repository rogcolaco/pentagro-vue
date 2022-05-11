<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      :value=value
      id="flexSwitchCheckDefault"
    />
    <label class="form-check-label" for="flexSwitchCheckDefault"
      >{{btnTitle}}</label
    >
  </div>
</template>

<script>
export default {
  props: ['btnTitle', 'value'],
};
</script>

<style>

</style>