<template>
  <div>
    <!-- <div id="header">
      <img src="./assets/logo.png" alt="" srcset="" />
      <app-botao btnTitle="Logout" btnType="btn-danger"/>
    </div> -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less">
// #header {
//   border-bottom: 1px solid #ccc;
//   margin-bottom: 30px;
//   display: flex;
//   justify-content: space-between;
//   padding: 10px 80px;

//   img {
//     width: 10%;
//   }
// }
</style>