import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import { editable, clickOutsideDirective, clickOnEscDirective, clickOnSlashDirective } from './directives'
import ElementPlus from 'element-plus'
import { VueDraggableNext } from 'vue-draggable-next'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'

const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueDraggableNext)
app.directive('editable', editable)
app.directive('click-outside', clickOutsideDirective)
app.directive('click-esc', clickOnEscDirective)
app.directive('click-slash', clickOnSlashDirective)

app.mount('#app')
