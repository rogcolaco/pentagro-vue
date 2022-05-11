<template>
  <div>
    <button :class="btnType" class="btn">{{btnTitle}}</button>
  </div>
</template>

<script>
export default {
  props: ['btnTitle', 'btnType'],
};
</script>

<style>
    a {
        margin:10px;
    }
</style>