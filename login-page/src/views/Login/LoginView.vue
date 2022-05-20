<template>
  <div class="login-box d-grid gap-2 col-md-6 mx-auto container">
    <img src="../../assets/logo.png" alt="" srcset="" />
    <app-input inputLabel="Login" inputType="text" identityValue = "login" v-model="name" />
    <app-input inputLabel="Senha" inputType="password" identityValue = "senha" v-model="pwd" />
    <p class="error-message" v-if="loginDenied">Usuário ou senha incorreta</p>
    <app-botao
      btnTitle="Login"
      @click.prevent="getCode"
    />
  </div>
</template>

<script>
import $http from "../../plugins/axios";

export default {
  name: "LoginView",
  data() {
    return {
      userData: {
        Username: "",
        UserPassword: "",
      },
      name: "",
      pwd: "",
      loginDenied: false,
    };
  },
  methods: {
    getCode() {
      var md5 = require("md5");
      this.userData.Username =  btoa(this.name);
      this.userData.UserPassword = btoa(md5(this.pwd));
      $http
        .post("login", this.userData)
        .then((res) => {
          $http.defaults.headers.common["Authorization"] = "bearer " + res.data;
          this.loginDenied = false;
          this.$router.push("user-management");
        })
        .catch((error) => {
          console.log(error.response.status);
          this.loginDenied = true;
        });
    },
  },
};
</script>

<style lang="less">
@media (min-width: 576px){
  .login-box {
    
    img {
      width: 80%;
      margin: 0 auto 20px auto;
    }
  }
}

@media (min-width: 768px){
  .login-box {
    
    img {
      width: 80%;
    }
  }
}

@media (min-width: 992px){
  .login-box {
    margin-top: 13%;
    
    img {
      width: 60%;
    }
  }
}

@media (min-width: 1200px) {
    .login-box {

    .error-message {
      color: rgb(194, 26, 26);
    }

    img {
      width: 40%;
    }
  }
}

//CÓDIGO LESS PARA MEDIAS ABAIXO DE 576PX
.login-box {
  margin-top: 9%;
  img {
    width: 60%;
    margin: 0 auto 20px auto;
  }

  .error-message {
    color: rgb(194, 26, 26);
    margin-top: -19px;
  }
}
</style>