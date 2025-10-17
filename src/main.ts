import { createApp } from 'vue'
import icons from './global/register-icons'
import App from './App.vue'
import router from './router'
import store from './stores/index'
import './assets/css/index.less'
import 'normalize.css'


const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')

