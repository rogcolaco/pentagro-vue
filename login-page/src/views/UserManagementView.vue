<template>
  <div class="home">
    <app-switches btnTitle="Teste"/>
    <app-select />
    <app-botao btnTitle="Salvar" btnType="btn-success"/>
  </div>
</template>

<script>
import AppSwitches from "../components/App-Switches.vue";
import AppSelect from "../components/App-Select.vue";
import AppBotao from '../components/App-Botao.vue';
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    "app-switches": AppSwitches,
    "app-select": AppSelect
  },
    AppBotao,
  name: "UserManagementView",
  //   components: {
  //     HelloWorld
  //   }
};
</script>