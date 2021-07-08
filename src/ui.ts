import Vue from 'vue';
import App from './ui.vue';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

new Vue({
	el: '#app',
	render: h => h(App)
});
