//import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'http://186.237.58.167:65129/api/user/'

// Vue.use({
//     install(Vue) {
//         Vue.prototype.$http = axios
//     }
// })

const api = axios.create({
    baseURL: 'http://186.237.58.167:65129/api/user/', //url base da sua api
    timeout: 5000 //tempo máximo de espera de resposta
    });
    
    export default api