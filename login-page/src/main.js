import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import AppBotao from "./components/App-Botao.vue"
import AppInput from "./components/App-Input.vue"


createApp(App).use(store).use(router)
    .component('app-botao', AppBotao)
    .component('app-input', AppInput)
    .mount('#app')
