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
          <!-- <app-select initialSelect="Selecione a Unidade Corporativa"/> -->
          <!-- <label for="productunit">Escolha a unidade Corporativa:</label> -->
          <select name="productunit" id="productunit" class="form-select mb-3">
            <option value="">Escolha a unidade corporativa</option>
            <option :value="productunit.initials" v-for="productunit in products" :key="productunit">{{productunit.name}}</option>
          </select>
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
      <app-botao btnTitle="Salvar" btnType="btn-success" @click="testUsers" />
      <div class="users-table">
        <table>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Habilitado</th>
            <th></th>
          </tr>
          <tr>
            <td>Id</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Habilitado</td>
            <td><app-botao btnTitle="Editar" btnType="btn-primary" /></td>
          </tr>
          <tr>
            <td>Id</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Habilitado</td>
            <td><app-botao btnTitle="Editar" btnType="btn-primary" /></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import $http from "../plugins/axios";

import AppSwitches from "../components/App-Switches.vue";
import AppSelect from "../components/App-Select.vue";
import AppHeader from "../components/AppHeader.vue";

export default {
  name: "UserManagementView",
  components: {
    "app-switches": AppSwitches,
    "app-select": AppSelect,
    "app-header": AppHeader,
  },
  data (){
    return {
      users: '',
      products: '',
      user: {
        disabled: '',
        email: '',
        id: '',
        improveTeamMember: '',
        loginExpiration: '',
        name: '',
        receiveAutonomousWarning: '',
        supervisor: '',
        system: '',
        unitId: '',
        userName: '',
        userPassword: '',
      }
    }
  },
  async created() {
    if (!$http.defaults.headers.common["Authorization"]) {
      this.$router.push('/access-denied');
    }
    let userOnCreate = ''
    await await $http.get('getusers')
    .then((res) => {
      //console.log(res.data[0])
      userOnCreate = res.data
    })
    //console.log(userOnCreate)
    Object.keys(userOnCreate).forEach((item) => {
      console.log(userOnCreate[item])
      this.users = userOnCreate[item]
    })
    $http.get('getproductionunitlist').then((res) => this.products = res.data.productionUnitList)
  },
  methods: {
    testUsers() {
      // console.log(this.users)
      // Object.keys(this.users).forEach((item) => {
      //   console.log(Object.keys + this.users[item])
      // })
      console.log(this.products)
      this.products.forEach((item) => console.log(item.name))
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