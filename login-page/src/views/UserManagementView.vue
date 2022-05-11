<template>
  <div>
    <app-header />
    <div class="main">
      <h2 class="page-management-title" v-if="user.id===0">Cadastrar novo Usuário</h2>
      <h2 class="page-management-title" v-else>Alterar Usuário</h2>
      <div class="principal container">
        <div>
          <app-input
            inputLabel="Id"
            inputType="text"
            v-model="user.id"
            hidden
          />
          <app-input
            inputLabel="Login"
            inputType="text"
            v-model="user.userName"
          />
          <app-input
            inputLabel="Nome Completo"
            inputType="text"
            v-model="user.name"
          />
          <app-input
            inputLabel="Senha"
            inputType="password"
            v-model="user.userPassword"
          />
        </div>
        <div>
          <!-- <app-select initialSelect="Selecione a Unidade Corporativa"/> -->
          <!-- <label for="productunit">Escolha a unidade Corporativa:</label> -->
          <select
            name="productunit"
            id="productunit"
            class="form-select mb-3"
            v-model="user.unitId"
          >
            <option value="">Escolha a unidade corporativa</option>
            <option
              :value="productunit.id"
              v-for="productunit in products"
              :key="productunit.id"
            >
              {{ productunit.name }}
            </option>
          </select>
          <app-input
            inputLabel="E-mail"
            inputType="text"
            v-model="user.email"
          />
          <app-input inputLabel="Confirmação de Senha" inputType="password" />
        </div>
      </div>
      <div class="linha container">
        <div class="tokenExpireControl">
          <app-botao btnTitle="-" btnType="btn-warning" @click="subtractTime" />
          {{ user.loginExpiration }}
          <app-botao btnTitle="+" btnType="btn-warning" @click="sumTime" />
        </div>
        <!-- <app-switches btnTitle="Receber Alertas?" :btnStatus="user.receiveAutonomousWarning" value="receiveAutonomousWarning" v-moldel="userSkils"/>
        <app-switches btnTitle="Tratar Ocorrências?" :btnStatus="user.supervisor" value="supervisor" v-moldel="userSkils"/>
        <app-switches btnTitle="DESABILITAR USUÁRIO" :btnStatus="user.disabled" value="disabled" v-moldel="userSkils"/> -->
        <span><input type="checkbox" value="receiveAutonomousWarning" v-model="userSkils">Receber Alertas?</span>
        <span><input type="checkbox" value="supervisor" v-model="userSkils">Tratar Ocorrências?</span>
        <span><input type="checkbox" value="disabled" v-model="userSkils">DESABILITAR USUÁRIO</span>
      </div>
      <div class="button-wrap">
      <app-botao btnTitle="Limpar Conteúdo" btnType="btn-warning" @click="cleanForm" />
      <app-botao btnTitle="Salvar" btnType="btn-success" @click="testUsers" />
      </div>
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
            <td>
              <app-botao
                btnTitle="Editar"
                btnType="btn-primary"
                @click="updateUserbyId(user.id)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import $http from "../plugins/axios";

//import AppSwitches from "../components/App-Switches.vue";
//import AppSelect from "../components/App-Select.vue";
import AppHeader from "../components/AppHeader.vue";

export default {
  name: "UserManagementView",
  components: {
    //"app-switches": AppSwitches,
    //"app-select": AppSelect,
    "app-header": AppHeader,
  },
  data() {
    return {
      users: "",
      products: "",
      userSkils: [],
      user: {
        disabled: false,
        email: "",
        id: 0,
        improveTeamMember: false,
        loginExpiration: 5,
        name: "",
        receiveAutonomousWarning: false,
        supervisor: false,
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
    this.checkSuperSkils()
  },
  methods: {
    testUsers() {
      console.log(this.users);
      this.users.forEach((item) => console.log(item.name));
    },
    async updateUserbyId(id) {
      await $http.get("getuserbyid/G/" + id).then((res) => {
        console.log(res.data);
        this.user.id = res.data.id;
        this.user.email = res.data.email;
        this.user.disabled = res.data.disabled;
        this.user.improveTeamMember = res.data.improveTeamMember;
        this.user.loginExpiration = res.data.loginExpiration;
        this.user.name = res.data.name;
        this.user.receiveAutonomousWarning = res.data.receiveAutonomousWarning;
        this.user.supervisor = res.data.supervisor;
        this.user.system = res.data.system;
        this.user.unitId = res.data.unitId;
        this.user.userName = res.data.userName;
        this.user.userPassword = res.data.userPassword;
      });
      this.checkSuperSkils()
    },
    cleanForm() {
        this.user.id = 0;
        this.user.email = '';
        this.user.disabled = false;
        this.user.improveTeamMember = false;
        this.user.loginExpiration = 5;
        this.user.name = '';
        this.user.receiveAutonomousWarning = false;
        this.user.supervisor = false;
        this.user.system = '';
        this.user.unitId = ''
        this.user.userName = '';
        this.user.userPassword = '';
        this.checkSuperSkils()
    },
    subtractTime() {
      this.user.loginExpiration > 0
        ? this.user.loginExpiration--
        : (this.user.loginExpiration = 0);
    },
    sumTime() {
      this.user.loginExpiration++;
    },
    checkSuperSkils(){
      this.userSkils=[]
      if(this.user.receiveAutonomousWarning) this.userSkils.push('receiveAutonomousWarning')
      if(this.user.supervisor) this.userSkils.push('supervisor')
      if(this.user.disabled) this.userSkils.push('disabled')
    }
  },
};
</script>

<style lang="less">

.page-management-title{
  text-align: center;
  margin: 35px 0;
}
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
    align-items: center;
    margin-top: 30px;

    .tokenExpireControl {
      display: flex;
      width: 150px;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

  }
}

.button-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 60px 0;

  div:first-child {
    margin-right: 80px;
  }
}

.users-table {
  border: 1px solid green;
}
</style>