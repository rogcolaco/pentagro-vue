<template>
  <div>
    <app-header showLogoutButton="true" />
    <div class="main">
      <h2 class="page-management-title" v-if="user.id === 0">
        Cadastrar novo Usuário
      </h2>
      <h2 class="page-management-title" v-else>Alterar Usuário</h2>
      <div class="principal container">
        <div class="principal-column">
          <div class="principal-column-content">
            <app-input
              inputLabel="Id"
              inputType="text"
              v-model="user.id"
              hidden
            />
            <div :class="{ inputBox: !inputStatus.userName }">
              <app-input
                inputLabel="Login"
                inputType="text"
                v-model="user.userName"
              />
              <p v-if="!inputStatus.userName">Campo Obrigatório</p>
            </div>
            <div :class="{ inputBox: !inputStatus.name }">
              <app-input
                inputLabel="Nome Completo"
                inputType="text"
                v-model="user.name"
                v-bind:class="{ inputWarning: !inputStatus.name }"
              />
              <p v-if="!inputStatus.name">Campo Obrigatório</p>
            </div>
          </div>
          <div class="principal-column-content">
            <div :class="{ inputBox: !inputStatus.unitId }">
              <select
                name="productunit"
                id="productunit"
                class="form-select mb-3"
                v-model="user.unitId"
              >
                <option value="0">Escolha a unidade corporativa</option>
                <option
                  :value="productionUnit.id"
                  v-for="productionUnit in productionsUnits"
                  :key="productionUnit.id"
                >
                  {{ productionUnit.name }}
                </option>
              </select>
              <p v-if="!inputStatus.unitId">Escolha uma unidade</p>
            </div>
            <div :class="{ inputBox: !inputStatus.email }">
              <app-input
                inputLabel="E-mail"
                inputType="text"
                v-model="user.email"
              />
              <p v-if="!inputStatus.email">E-mail Inválido</p>
            </div>
          </div>
        </div>
        <div class="principal-row">
          <div
            :class="{ inputBox: !inputStatus.password }"
            class="principal-row-content"
          >
            <app-input
              inputLabel="Senha"
              inputType="password"
              v-model="localPassword"
            />
            <p v-if="!inputStatus.password">Senhas não conferem ou vazias</p>
          </div>
          <div
            :class="{ inputBox: !inputStatus.password }"
            class="principal-row-content"
          >
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
              btnBackgroundColor="#cdc192"
              @click="subtractTime"
            />
            {{ user.loginExpiration }}
            <app-botao btnTitle="+" btnBackgroundColor="#cdc192" @click="sumTime" />
          </div>
        </div>

        <app-switches
          btnTitle="Receber Alertas?"
          :propsStatus="this.user.receiveAutonomousWarning"
          inputName="receiveAutonomousWarning"
          @statusIsChanged="user.receiveAutonomousWarning = $event"
          v-if="!user.disabled"
        />

        <app-switches
          btnTitle="Supervisor"
          :propsStatus="this.user.supervisor"
          inputName="supervisor"
          @statusIsChanged="user.supervisor = $event"
          v-if="!user.disabled"
        />

        <app-switches
          btnTitle="DESABILITAR USUÁRIO"
          :propsStatus="this.user.disabled"
          inputName="disabled"
          @statusIsChanged="user.disabled = $event"
        />
      </div>
      <div class="registred-button" v-if="registeredUser">
        <app-botao
          btnTitle="Usuário Cadastrado com Sucesso"
          @click="cleanForm"
        />
      </div>
      <div class="button-wrap">
        <app-botao
          btnTitle="Limpar Conteúdo"
          btnBackgroundColor="#ccc"
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
            <td>{{ user.disabled ? "Não" : "Sim" }}</td>
            <td>
              <app-botao
                btnTitle="Editar"
                btnBackgroundColor="#cdc192"
                @click="updateUserbyId(user.id)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style lang="less" src="./style.less">
</style>
<style lang="less" src="./mediaStyle.less">
</style>