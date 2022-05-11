<template>
  <select class="form-select mb-3" aria-label="Default select example">
    <option initialSelect> Unidade Corporatia</option>
    <option value="aaa"> {{ initialSelect }}</option>
  </select>
</template>

<script>
export default {
  props: ['initialSelect', 'contentData'],
};
</script>

<style lang="less">
.form-select {
  line-height: 2.7 !important;
}
</style>