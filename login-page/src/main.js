import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import api from './plugins/axios'

import AppBotao from "./components/App-Botao.vue"
import AppInput from "./components/App-Input.vue"


// App.prototype.$http = api
// App.config.productionTip = false

createApp(App).use(store).use(router)
    .component('app-botao', AppBotao)
    .component('app-input', AppInput)
    .mount('#app')
