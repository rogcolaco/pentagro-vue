<template>
  <div id="header">
    <div id="header-content" class="container">
      <a href="/"><img src="../assets/logo.png" alt="" srcset="" /></a>
      <div v-show="showLogoutButton == 'true'">
        <app-botao 
        btnTitle="Logout" 
        btnBackgroundColor="#C21A1A"
        btnFontColor="#fafafa"
        @click="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import $http from "../plugins/axios";

export default {
  props: {
    showLogoutButton: {
      type: String,
      required: true,
    },
  },
  methods: {
    logout() {
      $http.defaults.headers.common["Authorization"] = "";
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less">
#header{
  border-bottom: 1px solid #009a9b;
  margin-bottom: 30px;

  #header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;

    a{
      margin: 0;

      img {
        width: 50%;
      }

    }
  }
}

</style>