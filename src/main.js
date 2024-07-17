import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus, { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 初始化全局用户数据
const user = reactive({
  token: '',
  feedbackName: '',
  telId: ''
});

// 提供全局用户数据
app.provide('user', user);

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // 无论访问任何页面都检查是否有token
  if (!token && to.name !== 'Login' && to.name !== 'Register') {
    ElMessage.warning('登录已过期，请重新登录');
    next({ name: 'Login' });
  } else {
    next();
  }
});

app.use(store).use(router).use(ElementPlus).mount('#app');
