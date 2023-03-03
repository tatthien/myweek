import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './assets/css/app.css'
import clickOutside from './directives/click-outside'
import autoResize from './directives/auto-resize'
import focus from './directives/focus'
import WButton from './components/WButton.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../formkit.config'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(formKitConfig))

// Register directives
app.directive('click-outside', clickOutside)
app.directive('auto-resize', autoResize)
app.directive('focus', focus)

// Register components
// @TODO: move to another place
app.component('WButton', WButton)

app.mount('#app')
