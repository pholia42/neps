<template>
  <div class="register">
	 <div class="title-container">
	  <h2 class="register-title">东软环保公众监督平台</h2>
	  <h3 class="register-subtitle">———— 公众监督员端注册 ————</h3>
	</div> 
    <el-form
      ref="ruleFormRef"
      style="max-width: 96%"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="手机号" prop="telId">
        <el-input v-model="ruleForm.telId" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="ruleForm.realName" />
      </el-form-item>
      <el-form-item label="生日" required prop="birthday">
        <el-date-picker
          v-model="ruleForm.birthday"
          type="date"
          aria-label="请选择生日"
          placeholder="请选择生日"
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="重复密码" prop="repassword">
        <el-input type="password" v-model="ruleForm.repassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
        <el-link type="primary" @click="resetForm">重置</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axiosInstance from '@/axios';
import { ElMessage, ElForm } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

// 表单数据绑定
const ruleForm = reactive({
  telId: '',
  realName: '',
  birthday: '',
  sex: '1',
  password: '',
  repassword: ''
});

// 表单验证规则
const rules = reactive({
  telId: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  birthday: [
    { required: true, message: '请选择生日', trigger: 'change' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== ruleForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ]
});

// 表单引用
const ruleFormRef = ref(null);
const formSize = ref('default');

const submitForm = async () => {
  if (!ruleFormRef.value) return;

  console.log('表单数据:', ruleForm);
  
  // 验证表单
  const isFormValid = await ruleFormRef.value.validate();
  if (!isFormValid) {
    ElMessage.error('表单验证失败');
    console.log('表单验证失败');
    return;
  }

  console.log('表单验证成功，准备发送请求');
  try {
    const response = await axiosInstance.post('/register/supervisor', {
      telId: ruleForm.telId,
      password: ruleForm.password,
      realName: ruleForm.realName,
      birthday: ruleForm.birthday,
      sex: ruleForm.sex
    });

    // 检查后端返回的状态码和数据
    console.log('服务器响应:', response);
    if (response.data.success) {
      ElMessage.success('注册成功');
      console.log('注册成功');
      // 使用 router 进行页面跳转
      router.push('/');
    } else {
      ElMessage.error(response.data.errorMsg || '注册失败，请稍后重试');
      console.log('注册失败:', response.data.errorMsg);
    }
  } catch (error) {
    console.error("请求失败: ", error);
    ElMessage.error('注册失败，请稍后重试');
  }
};

const resetForm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};
</script>

<style scoped>
.register {
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

.title-container {
  text-align: center;
  margin-bottom: 30px;
}

.register-title {
  font-size: 28px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.register-subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 20px;
}

.el-form {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  border-radius: 5px;
}

.el-date-editor {
  width: 100%;
}

.el-radio-group {
  display: flex;
  justify-content: flex-start;
}

.el-radio {
  margin-right: 10px;
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

.el-message {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
