<template>
  <div class="login-box d-grid gap-2 col-6 mx-auto">
    <img src="../assets/logo.png" alt="" srcset="" />
    <app-input inputLabel="Login" inputType="text" v-model="name" />
    <app-input inputLabel="Senha" inputType="password" v-model="pwd"/>
    <app-botao btnTitle="Login" btnType="btn-primary" @click="getCode"/>
    <p>Nome do usuário: {{userData.Username}}</p>
    <p>Senha do usuário: {{userData.UserPassword}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'LoginView',
  data (){
    return {
      userData : {
        Username: '',
        UserPassword: ''
      },
      name: '',
      pwd: '',
    }
  },
  methods: {
    getCode(){
      var md5 = require('md5');
      this.userData.Username = btoa(this.name)
      this.userData.UserPassword = btoa(md5(this.pwd))
      //console.log(JSON.stringify(this.userData))
      //this.$axios.post('login', JSON.stringify(this.userData)).then(res => console.log(res))
    },
  }
}
</script>

<style lang="less">

.login-box{
    margin-top: 25%;

    img {
        width: 40%;
        margin: 0 auto 20px auto;        
    }
}

</style>