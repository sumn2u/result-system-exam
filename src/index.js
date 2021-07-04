import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Multiselect from 'vue-multiselect';
import { router } from './_helpers';
import App from './app/App';
 
import Modal from './common/Modal.vue';
// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
// register globally
Vue.component('multiselect', Multiselect)
Vue.component('modal', Modal);
Vue.use(Vuelidate);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});