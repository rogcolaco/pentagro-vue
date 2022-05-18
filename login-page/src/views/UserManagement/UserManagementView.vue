<template>
  <div>
    <app-header />
    <div class="main">
      <h2 class="page-management-title" v-if="user.id === 0">
        Cadastrar novo Usuário
      </h2>
      <h2 class="page-management-title" v-else>Alterar Usuário</h2>

        <p>supervisor: {{ this.user.supervisor }}</p>
        <p>recebe alertas: {{ this.user.receiveAutonomousWarning }}</p>
        <p>desabilitado: {{ this.user.disabled }}</p>
        <p>{{this.userSkils}}</p>

      <div class="principal container">
        <div>
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
          <div :class="{ inputBox: !inputStatus.password }">
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
          <div :class="{ inputBox: !inputStatus.unitId }">
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
          <div :class="{ inputBox: !inputStatus.email }">
            <app-input
              inputLabel="E-mail"
              inputType="text"
              v-model="user.email"
            />
            <p v-if="!inputStatus.email">E-mail Inválido</p>
          </div>
          <div :class="{ inputBox: !inputStatus.password }">
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
        
        <app-switches
          btnTitle="Receber Alertas?"
          :propsStatus="this.user.receiveAutonomousWarning"
          inputName="receiveAutonomousWarning"
          @statusIsChanged="user.receiveAutonomousWarning = $event"
          v-if=!user.disabled
        />

        <app-switches
          btnTitle="Supervisor"
          :propsStatus="this.user.supervisor"
          inputName="supervisor"
          @statusIsChanged="user.supervisor = $event"
          v-if=!user.disabled
        />


        <app-switches
          btnTitle="DESABILITAR USUÁRIO"
          :propsStatus="this.user.disabled"
          inputName="disabled"
          @statusIsChanged="user.disabled = $event"
        />
<!-- 
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
        > -->
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

<script src="./script.js">
</script>

<style lang="less" src="./style.less">
</style>