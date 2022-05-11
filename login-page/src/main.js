import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import AppBotao from "./components/App-Botao.vue"
import AppInput from "./components/App-Input.vue"

/* add icons to the library */
library.add(faUserSecret)


createApp(App).use(store).use(router)
    .component('app-botao', AppBotao)
    .component('app-input', AppInput)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
