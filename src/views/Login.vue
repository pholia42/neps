<template>
  <div class="login-container">
    <div class="header-image">
      <img src="@/assets/login.png" alt="Background Image" />
    </div>
    <div class="title-container">
      <h2 class="login-title">东软环保公众监督平台</h2>
      <h3 class="login-subtitle">———— 公众监督员端 ————</h3>
    </div>
    <el-card class="login-card">
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" status-icon>
        <el-form-item label="手机号" prop="telId">
          <el-input v-model="form.telId" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入登录密码"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-link type="primary" @click="goToRegister">立即注册</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, inject } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import axios from '@/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = inject('user');
const form = reactive({
  telId: '',
  password: ''
});
const rules = reactive({
  telId: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
});
const loginForm = ref(null);

const onSubmit = async () => {
  const isFormValid = await loginForm.value.validate();
  if (!isFormValid) return;

  try {
    const response = await axios.get('/login/supervisor', {
      params: {
        telId: form.telId,
        password: form.password
      },
      headers: {
        'Authorization': `Bearer ${process.env.VUE_APP_API_TOKEN}`
      }
    });

    if (response.status === 200) {
      if (response.data.success) {
        const token = response.data.data.token;
        const feedbackName = response.data.data.name;
        const telId = response.data.data.id;

        // 存储在localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('feedbackName', feedbackName);
        localStorage.setItem('telId', telId);

        // 存储在全局user对象
        user.token = token;
        user.feedbackName = feedbackName;
        user.telId = telId;

        // 登录成功提示
        ElMessage.success('登录成功');
        
        // 控制台输出登录成功后的全局变量
        console.log('lg用户token:', user.token);
        console.log('lg用户姓名:', user.feedbackName);
        console.log('login用户手机号:', user.telId);

        // 跳转到首页
        router.push('/home');
      } else {
        ElMessage.error(response.data.errorMsg || '账号或密码不正确');
      }
    } else {
      ElMessage.error('请求失败，状态码：' + response.status);
    }
  } catch (error) {
    console.error('请求错误:', error.response ? error.response.data : error.message);
    ElMessage.error('登录失败，请稍后重试');
  }
};

const goToRegister = () => {
  router.push('/reg');
};
</script>

<style scoped>
.login-container {
  background: url('@/assets/back.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.header-image {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.header-image img {
  max-width: 200px;
  width: 100%;
  height: auto;
}

.title-container {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  font-size: 28px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.login-subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  border-radius: 5px;
}

.el-button {
  width: 100%;
  border-radius: 5px;
}

.el-button--primary {
  background-color: #009688;
  border-color: #009688;
}

.el-button--primary:hover {
  background-color: #00796b;
  border-color: #00796b;
}

.el-link {
  margin-top: 10px;
  text-align: center;
  display: block;
  color: #00796b;
}
</style>