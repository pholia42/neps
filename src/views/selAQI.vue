<template>
  <div class="aqi-container">
    <header class="header">
      <div class="header-content">
        <el-icon @click="goBack" class="logout-icon"><ArrowLeft /></el-icon>
        <span class="header-text">选择AQI</span>
      </div>
    </header>
    <div class="form-container">
      <table class="aqi-table">
        <thead>
          <tr>
            <th>级别</th>
            <th>空气质量状况</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>一</td>
            <td>空气质量令人满意，基本无空气污染</td>
          </tr>
          <tr>
            <td>二</td>
            <td>空气质量可接受，但某些污染物对极少数异常敏感人群健康有较弱影响</td>
          </tr>
          <tr>
            <td>三</td>
            <td>易感人群症状有轻度加剧，健康人群出现刺激症状</td>
          </tr>
          <tr>
            <td>四</td>
            <td>进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响</td>
          </tr>
          <tr>
            <td>五</td>
            <td>心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状</td>
          </tr>
          <tr>
            <td>六</td>
            <td>健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病</td>
          </tr>
        </tbody>
      </table>
      <el-form :model="form" ref="aqiForm" label-width="120px" status-icon>
        <el-form-item label="预测空气质量等级" :rules="[ { required: true, message: '请选择一个等级', trigger: 'change' } ]">
          <el-radio-group v-model="form.aqiLevel">
            <el-radio-button label="1"><span class="level level-1">一</span></el-radio-button>
            <el-radio-button label="2"><span class="level level-2">二</span></el-radio-button>
            <el-radio-button label="3"><span class="level level-3">三</span></el-radio-button>
            <el-radio-button label="4"><span class="level level-4">四</span></el-radio-button>
            <el-radio-button label="5"><span class="level level-5">五</span></el-radio-button>
            <el-radio-button label="6"><span class="level level-6">六</span></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="反馈信息" :rules="[ { required: true, message: '请填写反馈信息', trigger: 'blur' } ]">
          <el-input type="textarea" v-model="form.feedback" placeholder="请填写反馈信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadioButton, ElButton, ElIcon } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';
import axiosInstance from '@/axios'; 

export default defineComponent({
  name: 'SelectAQI',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElRadioGroup,
    ElRadioButton,
    ElButton,
    ElIcon,
    ArrowLeft
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const form = reactive({
      aqiLevel: '',
      feedback: ''
    });

    const goBack = () => {
      router.push('/selgrid');
    };

    const submitData = async () => {
      if (!form.aqiLevel || !form.feedback) {
        ElMessage.error('请填写所有必填项');
        return;
      }

      console.log('提交的省:', route.query.province);
      console.log('提交的市:', route.query.city);
      console.log('提交的详细地址:', route.query.address);
      console.log('预测空气质量等级:', form.aqiLevel);
      console.log('反馈信息:', form.feedback);

      const feedbackName = localStorage.getItem('feedbackName');
      const telId = localStorage.getItem('telId');

      console.log('用户名称:', feedbackName);
      console.log('用户ID:', telId);

      try {
         const response = await axiosInstance.get('/supervisor/addPrediction', { // URL位置
          province: route.query.province,
          city: route.query.city,
          address: route.query.address,
          preGrade: form.aqiLevel,
          description: form.feedback,
          feedbackName: feedbackName,
          telId: telId 
        });

        console.log('服务器响应:', response.data);

        if (response.data.success) {
          ElMessage.success('提交成功');
          router.push('/home');
        } else {
          ElMessage.error(response.data.errorMsg || '提交失败');
        }
      } catch (error) {
        ElMessage.error('提交失败，请稍后重试');
        console.error('提交错误:', error);
      }
    };

    return {
      form,
      goBack,
      submitData
    };
  }
});
</script>

<style scoped>
.aqi-container {
  background: url('@/assets/back.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  width: 100%;
  height: 60px; /* 可以根据需要调整高度 */
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.logout-icon {
  color: #333;
  cursor: pointer;
  position: absolute;
  left: 20px;
}

.form-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  text-align: center;  
}

.aqi-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.aqi-table th, .aqi-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.aqi-table th {
  background-color: #f2f2f2;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-radio-button__inner {
  background-color: #e0f7fa;
  border: 1px solid #009688;
  color: #333;
}

.el-radio-button__inner:hover {
  background-color: #009688;
  border-color: #009688;
  color: white;
}

.el-radio-button.is-active .el-radio-button__inner {
  background-color: #009688;
  border-color: #009688;
  color: white;
}

.level {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 50%;
  line-height: 24px;
}

.level-1 { background-color: #00e400; color: white; }
.level-2 { background-color: #ff0; color: white; }
.level-3 { background-color: #ff7e00; color: white; }
.level-4 { background-color: #ff0000; color: white; }
.level-5 { background-color: #99004c; color: white; }
.level-6 { background-color: #7e0023; color: white; }

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

.el-message {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
