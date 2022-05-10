<template>
  <div>
    <button v-bind:class="btnType" class="btn">{{btnTitle}}</button>
  </div>
</template>

<script>
export default {
  props: {
      btnTitle: String,
      btnType: String
  },
};
</script>

<style>
    a {
        margin:10px;
    }
</style>