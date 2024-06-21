<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <el-icon @click="logout" class="logout-icon"><ArrowLeft /></el-icon>
        <span class="header-text">选择网格</span>
      </div>
    </header>
    <div class="select-grid-container">
      <ChinaAreaSelect
        v-model:province="selectedProvince"
        v-model:city="selectedCity"
      />
      <el-form-item label="详细地址">
        <el-input type="text" placeholder="请输入详细地址" v-model="detailedAddress" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElFormItem, ElInput, ElButton, ElIcon } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';
import ChinaAreaSelect from '@/components/ChinaAreaSelect.vue';

export default defineComponent({
  name: 'SelectGrid',
  components: {
    ElFormItem,
    ElInput,
    ElButton,
    ElIcon,
    ArrowLeft,
    ChinaAreaSelect
  },
  setup() {
    const router = useRouter();
    const selectedProvince = ref('');
    const selectedCity = ref('');
    const detailedAddress = ref('');

    const logout = () => {
      router.push('/home');
    };

    const nextStep = () => {
      if (!selectedCity.value || !detailedAddress.value) {
        alert('请选择省市并填写详细地址');
        return;
      }
      console.log('选择的省:', selectedProvince.value);
      console.log('选择的市:', selectedCity.value);
      console.log('填写的详细地址:', detailedAddress.value);

      router.push({
        path: '/selaqi',
        query: {
          province: selectedProvince.value,
          city: selectedCity.value,
          address: detailedAddress.value
        }
      });
    };

    return {
      selectedProvince,
      selectedCity,
      detailedAddress,
      logout,
      nextStep
    };
  }
});
</script>

<style scoped>
#app {
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
  height: 60px; 
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

.select-grid-container {
  width: 100%;
  max-width: 400px;
  margin-top: 80px; /* 确保内容不会被固定的头部遮挡 */
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-select,
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

/* 响应式设计 */
@media (max-width: 768px) {
  .select-grid-container {
    width: 90%;
    margin-top: 100px; /* 增加顶部间距以适应小屏设备 */
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-text {
    text-align: left;
    font-size: 16px;
    margin-top: 10px;
  }

  .logout-icon {
    align-self: flex-end;
  }

  .select-grid-container {
    width: 100%;
    padding: 10px;
  }

  .el-select,
  .el-input__inner {
    width: 100%;
  }

  .el-button {
    font-size: 14px;
  }
}
</style>
