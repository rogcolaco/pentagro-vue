<template>
  <div>
    <app-header />
    <div class="main">
      <h2 class="page-management-title" v-if="user.id === 0">
        Cadastrar novo Usuário
      </h2>
      <h2 class="page-management-title" v-else>Alterar Usuário</h2>
      <div class="principal container">
        <div>
          <app-input
            inputLabel="Id"
            inputType="text"
            v-model="user.id"
            hidden
          />
          <div :class="{inputBox : !inputStatus.userName }">
            <app-input
              inputLabel="Login"
              inputType="text"
              v-model="user.userName"
            />
            <p v-if="!inputStatus.userName">Campo Obrigatório</p>
          </div>
          <div :class="{inputBox : !inputStatus.name }">
            <app-input
              inputLabel="Nome Completo"
              inputType="text"
              v-model="user.name"
              v-bind:class="{ inputWarning: !inputStatus.name }"
            />
            <p v-if="!inputStatus.name">Campo Obrigatório</p>
          </div>
          <div :class="{inputBox : !inputStatus.password }">
            <app-input
              inputLabel="Senha"
              inputType="password"
              v-model="localPassword"
            />
            <p v-if="!inputStatus.password">Senhas não conferem ou vazias</p>
          </div>
        </div>
        <div class="div-space"></div>
        <div>
          <div :class="{inputBox : !inputStatus.unitId }">
            <select
              name="productunit"
              id="productunit"
              class="form-select mb-3"
              v-model="user.unitId"
            >
              <option value="0">Escolha a unidade corporativa</option>
              <option
                :value="productunit.id"
                v-for="productunit in products"
                :key="productunit.id"
              >
                {{ productunit.name }}
              </option>
            </select>
            <p v-if="!inputStatus.unitId">Escolha uma unidade</p>
          </div>
          <div :class="{inputBox : !inputStatus.email }">
            <app-input
              inputLabel="E-mail"
              inputType="text"
              v-model="user.email"
            />
            <p v-if="!inputStatus.email">E-mail Inválido</p>
          </div>
          <div :class="{inputBox : !inputStatus.password }">
            <app-input
              inputLabel="Confirmação de Senha"
              inputType="password"
              v-model="confirmLocalPassword"
            />
            <p v-if="!inputStatus.password">Senhas não conferem ou vazias</p>
          </div>
        </div>
      </div>
      <div class="linha container">
        <div class="tokenGaget">
          <p>Tempo de Token:</p>
          <div class="tokenExpireControl">
            <app-botao
              btnTitle="-"
              btnType="btn-warning"
              @click="subtractTime"
            />
            {{ user.loginExpiration }}
            <app-botao btnTitle="+" btnType="btn-warning" @click="sumTime" />
          </div>
        </div>
        <span v-show="!user.disabled"
          ><input
            type="checkbox"
            value="receiveAutonomousWarning"
            v-model="userSkils"
          />Receber Alertas?</span
        >
        <span v-show="!user.disabled"
          ><input
            type="checkbox"
            value="supervisor"
            v-model="userSkils"
          />Tratar Ocorrências?</span
        >
        <span
          ><input
            type="checkbox"
            value="disabled"
            v-model="userSkils"
          />DESABILITAR USUÁRIO</span
        >
      </div>
      <div class="button-wrap">
        <app-botao
          btnTitle="Limpar Conteúdo"
          btnType="btn-warning"
          @click="cleanForm"
        />
        <app-botao btnTitle="Salvar" btnType="btn-success" @click="saveUser" />
      </div>
      <div class="users-table container">
        <h3>Usuários Cadastrados</h3>
        <table class="table table-striped table-hover">
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

export default {
  name: "UserManagementView",
  data() {
    return {
      users: "",
      localPassword: "",
      confirmLocalPassword: "",
      products: "",
      userSkils: [],
      inputStatus: {
        userName: true,
        name: true,
        password: true,
        email: true,
        unitId: true,
      },
      user: {
        disabled: false,
        email: "",
        id: 0,
        improveTeamMember: false,
        loginExpiration: 5,
        name: "",
        receiveAutonomousWarning: false,
        supervisor: false,
        system: "G",
        unitId: 0,
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
    this.checkSuperSkils();
  },
  methods: {
    async saveUser() {
      this.checkPassword();
      this.checkEmail();
      this.inputStatus.unitId = this.checkboxValidation();
      if (
        this.inputStatus.password &&
        this.inputStatus.email &&
        this.inputStatus.unitId &&
        this.user.name &&
        this.user.userName
      ) {
        this.user.userPassword = this.passwordEncripty(this.localPassword);
        this.user.userPassword = this.changeBase(this.user.userPassword);
        this.setUserSkills();
        console.log(this.user);
        await $http.post("saveuser", this.user).catch((error) => {
          console.log(error.response.status);
          this.loginDenied = true;
        });
        $http.get("getusers").then((res) => {
          this.users = res.data;
        });
        this.cleanForm();
      } else {
        !this.user.userName
          ? (this.inputStatus.userName = false)
          : (this.inputStatus.userName = true);
        !this.user.name
          ? (this.inputStatus.name = false)
          : (this.inputStatus.name = true);
        console.log("não passou!");
      }
      // $http.get("getusers").then((res) => {
      //   this.users = res.data;
      // });
      // this.cleanForm()
    },
    async updateUserbyId(id) {
      this.cleanForm();
      await $http.get("getuserbyid/G/" + id).then((res) => {
        console.log(res.data);
        this.user.id = res.data.id;
        this.user.email = res.data.email;
        this.user.disabled = res.data.disabled;
        this.user.improveTeamMember = res.data.improveTeamMember;
        if (this.user.improveTeamMember)
          this.userSkils.push("improveTeamMember");
        this.user.loginExpiration = res.data.loginExpiration;
        this.user.name = res.data.name;
        this.user.receiveAutonomousWarning = res.data.receiveAutonomousWarning;
        if (this.user.receiveAutonomousWarning)
          this.userSkils.push("receiveAutonomousWarning");
        this.user.supervisor = res.data.supervisor;
        if (this.user.supervisor) this.userSkils.push("supervisor");
        this.user.system = res.data.system;
        this.user.unitId = res.data.unitId;
        this.user.userName = res.data.userName;
        this.localPassword = res.data.userPassword;
        this.confirmLocalPassword = res.data.userPassword;
      });
      this.checkSuperSkils();
    },
    cleanForm() {
      this.resetFormFields();
      this.resetInputStatus();
      this.checkSuperSkils();
    },
    subtractTime() {
      this.user.loginExpiration > 0
        ? this.user.loginExpiration--
        : (this.user.loginExpiration = 0);
    },
    sumTime() {
      this.user.loginExpiration++;
    },
    checkSuperSkils() {
      this.userSkils = [];
      if (this.user.receiveAutonomousWarning)
        this.userSkils.push("receiveAutonomousWarning");
      if (this.user.supervisor) this.userSkils.push("supervisor");
      if (this.user.disabled) this.userSkils.push("disabled");
    },
    checkPassword() {
      if (
        this.localPassword.trim() &&
        this.confirmLocalPassword.trim() !== "" &&
        this.localPassword.trim() === this.confirmLocalPassword.trim()
      ) {
        this.inputStatus.password = true;
      } else {
        this.inputStatus.password = false;
      }
    },
    checkEmail() {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (regex.test(this.user.email)) {
        this.inputStatus.email = true;
      } else {
        this.inputStatus.email = false;
      }
    },
    checkboxValidation() {
      if (this.user.unitId == 0) {
        return false;
      } else {
        return true;
      }
    },
    passwordEncripty(localPassword) {
      var md5 = require("md5");
      return md5(localPassword);
    },
    changeBase(localData) {
      if (localData.trim() !== "") {
        return btoa(localData);
      }
    },
    setUserSkills() {
      this.user.supervisor = false;
      this.user.receiveAutonomousWarning = false;
      this.user.disabled = false;
      this.userSkils.forEach((item) => {
        if (item === "supervisor") {
          this.user.supervisor = true;
          this.user.improveTeamMember = true;
        }
        if (item === "receiveAutonomousWarning")
          this.user.receiveAutonomousWarning = true;
        if (item === "disabled") this.user.disabled = true;
      });
    },
    resetFormFields() {
      this.user.id = 0;
      this.user.email = "";
      (this.user.userName = ""), (this.user.disabled = false);
      this.user.improveTeamMember = false;
      this.user.loginExpiration = 5;
      this.user.name = "";
      this.user.receiveAutonomousWarning = false;
      this.user.supervisor = false;
      this.user.system = "";
      this.user.unitId = "";
      this.localName = "";
      this.localPassword = "";
      this.confirmLocalPassword = "";
    },
    resetInputStatus() {
      this.inputStatus.userName = true;
      this.inputStatus.password = true;
      this.inputStatus.name = true;
      this.inputStatus.email = true;
      this.inputStatus.unitId = true;
    },
  },
};
</script>

<style lang="less">
.page-management-title {
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
      width: 100%;
    }

    .inputBox {

      select {
          border: 1px solid rgba(201, 77, 77, 0.5);
          -webkit-box-shadow: 1px 1px 15px 1px rgba(255,33,33,0.5); 
          box-shadow: 1px 1px 15px 1px rgba(255,33,33,0.5);
          margin-bottom: 0.3rem!important;
        }

      div {
        margin-bottom: 0.3rem!important;
        
        input {
          border: 1px solid rgba(201, 77, 77, 0.5);
          -webkit-box-shadow: 1px 1px 15px 1px rgba(255,33,33,0.5); 
          box-shadow: 1px 1px 15px 1px rgba(255,33,33,0.5);
        }

      }
      p {
        color: red;
        font-size: 12px;
      }
    }
  }

  select {
    line-height: 2.65;
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

    span input {
      margin-right: 5px;
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
  border: 1px solid #ccc;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 100px;
  background: #f4f4f4;

  h3 {
    text-align: center;
    margin-bottom: 50px;
  }

  tr {
    &:hover {
      background: #dadada;
    }
  }
}

.div-space {
  min-width: 10px;
  max-width: 50px;
}
</style>