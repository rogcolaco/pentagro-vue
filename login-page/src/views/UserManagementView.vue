<template>
  <div>
    <app-header />
    <div class="main">
      <div class="principal container">
        <div>
          <app-input inputLabel="Login" inputType="text" />
          <app-input inputLabel="Nome Completo" inputType="text" />
          <app-input inputLabel="Senha" inputType="password" />
        </div>
        <div>
          <app-select />
          <app-input inputLabel="E-mail" inputType="text" />
          <app-input inputLabel="Confirmação de Senha" inputType="password" />
        </div>
      </div>
      <div class="linha">
        <app-select />
        <app-switches btnTitle="Receber Alertas?" />
        <app-switches btnTitle="Tratar Ocorrências?" />
        <app-switches btnTitle="DESABILITAR USUÁRIO" />
      </div>
      <app-botao btnTitle="Salvar" btnType="btn-success" @click="getUsers" />
    </div>
  </div>
</template>

<script>
import $http from "../plugins/axios";

import AppSwitches from "../components/App-Switches.vue";
import AppSelect from "../components/App-Select.vue";
import AppHeader from "../components/AppHeader.vue";

export default {
  components: {
    "app-switches": AppSwitches,
    "app-select": AppSelect,
    "app-header": AppHeader,
  },
  name: "UserManagementView",
  methods: {
    getUsers() {
      $http.get("getusers").then((res) => console.log(res.data));
    },
  },
};
</script>

<style lang="less">
.main {
  border: 1px solid red;
  margin-top: 100px;

  .principal {
    border: 1px solid blue;
    display: flex;

    div {
      width: 90%;
    }
  }

  .linha {
    display: flex;
  }
}
</style>