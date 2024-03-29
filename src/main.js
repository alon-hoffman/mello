import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import { editable, clickOutsideDirective, clickOnEscDirective, clickOnSlashDirective,clickOutsideBigModalDirective } from './directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import vue3GoogleLogin from 'vue3-google-login'
import { socketService } from './services/socket.service'
import rootCmp from './root-cmp.vue'


const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.directive('editable', editable)
app.use(vue3GoogleLogin, {
    clientId: '47709408107-dm69s50ujp2u6s6he9c3l8k2vt09kmaf.apps.googleusercontent.com'
  })
app.directive('click-outside', clickOutsideDirective)
app.directive('click-outside-big-modal', clickOutsideBigModalDirective)
app.directive('click-esc', clickOnEscDirective)
app.directive('click-slash', clickOnSlashDirective)

app.mount('#app')
