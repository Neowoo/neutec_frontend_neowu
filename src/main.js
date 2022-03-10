import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import axios from 'axios'
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';


createApp(App).use(VueAxios, axios).use(store).use(store).use(router).use(ElementPlus).mount('#app');
