<template>
  <div class="login-box d-grid gap-2 col-6 mx-auto">
    <img src="../assets/logo.png" alt="" srcset="" />
    <app-input inputLabel="Login" inputType="text"/>
    <app-input inputLabel="Senha" inputType="password"/>
    <app-botao btnTitle="Login" btnType="btn-primary" />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'LoginView',
//   components: {
//     HelloWorld
//   }
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