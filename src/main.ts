import { createApp } from 'vue';
import App from './App.vue';
import { vantUiComponents } from './plugins/vantUI';
import router from './router';
import { setupStore } from '@/store';

// 引入全局样式
import '@/assets/css/index.scss';



const app = createApp(App);
app.use(router);

setupStore(app);
app.mount('#app');

// vantUI按需加载
vantUiComponents.forEach((item) => {
  app.use(item);
});
