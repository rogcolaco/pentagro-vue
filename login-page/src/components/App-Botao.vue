<template>
  <div>
    <a v-bind:class="btnType" class="btn" href="/user-management">{{btnTitle}}</a>
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