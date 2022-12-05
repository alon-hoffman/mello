import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import { editable, clickOutsideDirective, clickOnEscDirective, clickOnSlashDirective,clickOutsideBigModalDirective } from './directives'
import ElementPlus from 'element-plus'
import { VueDraggableNext } from 'vue-draggable-next'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
// import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import rootCmp from './root-cmp.vue'


const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueDraggableNext)
// app.component('DatePicker', Vue3PersianDatetimePicker)
app.directive('editable', editable)
app.directive('click-outside', clickOutsideDirective)
app.directive('click-outside-big-modal', clickOutsideBigModalDirective)
app.directive('click-esc', clickOnEscDirective)
app.directive('click-slash', clickOnSlashDirective)

app.mount('#app')
