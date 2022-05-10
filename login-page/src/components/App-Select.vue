<template>
  <select class="form-select mb-3" aria-label="Default select example">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</template>

<script>
export default {
  props: {
    btnTitle: String,
    btnType: String,
  },
};
</script>

<style lang="less">
.form-select {
  line-height: 2.7 !important;
}
</style>