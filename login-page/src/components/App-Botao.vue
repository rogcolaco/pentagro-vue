<template>
  <div>
    <button class="btn">{{btnTitle}}</button>
  </div>
</template>

<script>
export default {
  props: {
    btnTitle: {
      type: String,
      required: true,
    },
    btnBackgroundColor: {
      type: String,
      default: '#7acacb',
    },
    btnFontColor: {
      type: String,
      default: '#000',
    },
  },
};
</script>

<style>
  .btn {
    background: v-bind(btnBackgroundColor);
    color: v-bind(btnFontColor)
  }
  a {
    margin:10px;
  }
</style>