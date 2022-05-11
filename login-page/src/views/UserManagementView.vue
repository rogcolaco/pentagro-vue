<template>
  <div>
    <app-header />
    <div class="main">
      <div class="principal container">
        <div>
          <app-input inputLabel="Id" inputType="text" v-model="user.id" hidden />
          <app-input inputLabel="Login" inputType="text" v-model="user.userName"/>
          <app-input inputLabel="Nome Completo" inputType="text" v-model="user.name"/>
          <app-input inputLabel="Senha" inputType="password" v-model="user.userPassword"/>
        </div>
        <div>
          <!-- <app-select initialSelect="Selecione a Unidade Corporativa"/> -->
          <!-- <label for="productunit">Escolha a unidade Corporativa:</label> -->
          <select name="productunit" id="productunit" class="form-select mb-3">
            <option value="">Escolha a unidade corporativa</option>
            <option
              :value="productunit.id"
              v-for="productunit in products"
              :key="productunit"
            >
              {{ productunit.name }}
            </option>
          </select>
          <app-input inputLabel="E-mail" inputType="text" v-model="user.email" />
          <app-input inputLabel="Confirmação de Senha" inputType="password" />
        </div>
      </div>
      <div class="linha container">
        <div class="tokenExpireControl">
          <app-botao btnTitle="-" btnType="btn-warning" @click="subtractTime" />
          {{ user.loginExpiration }}
          <app-botao btnTitle="+" btnType="btn-warning" @click="sumTime" />
        </div>
        <app-switches btnTitle="Receber Alertas?" v-model="user.receiveAutonomousWarning"/>
        <app-switches btnTitle="Tratar Ocorrências?" v-model="user.supervisor"/>
        <app-switches btnTitle="DESABILITAR USUÁRIO" v-model="user.disabled"/>
      </div>
      <app-botao btnTitle="Salvar" btnType="btn-success" @click="testUsers" />
      <div class="users-table">
        <table class="table table-striped table-hover container">
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Habilitado</th>
            <th></th>
          </tr>
          <tr v-for="user in users" :key="user">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.disabled }}</td>
            <td><app-botao btnTitle="Editar" btnType="btn-primary" @click="updateUserbyId(user.id)"/></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import $http from "../plugins/axios";

import AppSwitches from "../components/App-Switches.vue";
//import AppSelect from "../components/App-Select.vue";
import AppHeader from "../components/AppHeader.vue";

export default {
  name: "UserManagementView",
  components: {
    "app-switches": AppSwitches,
    //"app-select": AppSelect,
    "app-header": AppHeader,
  },
  data() {
    return {
      users: "",
      products: "",
      updateUser: '',
      user: {
        disabled: "",
        email: "",
        id: "",
        improveTeamMember: "",
        loginExpiration: 5,
        name: "",
        receiveAutonomousWarning: "",
        supervisor: "",
        system: "",
        unitId: "",
        userName: "",
        userPassword: "",
      },
    };
  },
  created() {
    if (!$http.defaults.headers.common["Authorization"]) {
      this.$router.push("/access-denied");
    }
    $http.get("getusers").then((res) => {
      this.users = res.data;
    });
    $http
      .get("getproductionunitlist")
      .then((res) => (this.products = res.data.productionUnitList));
  },
  methods: {
    testUsers() {
      console.log(this.users);
      this.users.forEach((item) => console.log(item.name));
    },
    updateUserbyId(id) {
      $http
        .get("getuserbyid/G/"+id)
        .then((res) => {
          console.log(res.data)
          this.user.id = res.data.id
          this.user.email = res.data.email
          this.user.disabled = res.data.disabled
          this.user.improveTeamMember = res.data.improveTeamMember
          this.user.loginExpiration = res.data.loginExpiration
          this.user.name = res.data.name
          this.user.receiveAutonomousWarning = res.data.receiveAutonomousWarning
          this.user.supervisor = res.data.supervisor
          this.user.system = res.data.system
          this.user.unitId = res.data.unitId
          this.user.userName = res.data.userName
          this.user.userPassword = res.data.userPassword
          });
    },
    subtractTime(){
      this.user.loginExpiration > 0 ?  this.user.loginExpiration -- : this.user.loginExpiration = 0
    },
    sumTime(){
      this.user.loginExpiration ++
    }
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
    justify-content: space-evenly;
    margin-top: 30px;
  }
}

.tokenExpireControl{
  display: flex;
  width: 150px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.users-table {
  border: 1px solid green;
}
</style>