import Vue from 'vue'
import App from './App.vue'
import VueAudio from 'vue-audio-better'

Vue.use(VueAudio)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
