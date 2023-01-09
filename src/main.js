import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import { editable, clickOutsideDirective, clickOnEscDirective, clickOnSlashDirective,clickOutsideBigModalDirective } from './directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import vue3GoogleLogin from 'vue3-google-login'
import { LoaderPlugin } from 'vue-google-login';
import { socketService } from './services/socket.service'
// import { getAverageColor } from 'fast-average-color-node';
import rootCmp from './root-cmp.vue'


const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.directive('editable', editable)
// app.use(LoaderPlugin, {
//     client_id: '47709408107-dm69s50ujp2u6s6he9c3l8k2vt09kmaf.apps.googleusercontent.com'
// })
app.use(vue3GoogleLogin, {
    clientId: '47709408107-dm69s50ujp2u6s6he9c3l8k2vt09kmaf.apps.googleusercontent.com'
  })
//   app.use(vue3GoogleLogin, {
//     clientId: '961995621272-60aj5sk5o9vlm2a68pqoqbtd32uo5ka3.apps.googleusercontent.com'
//   })
app.directive('click-outside', clickOutsideDirective)
app.directive('click-outside-big-modal', clickOutsideBigModalDirective)
app.directive('click-esc', clickOnEscDirective)
app.directive('click-slash', clickOnSlashDirective)

app.mount('#app')
