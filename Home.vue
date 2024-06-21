<template>
  <div id="app" class="home-container">
    <el-header class="full-header">
      <div class="header-content">
        <el-icon @click="logout" class="logout-icon"><ArrowLeft /></el-icon>
        <span class="header-text">个人主页</span>
      </div>
    </el-header>
    <el-main>
      <div class="content-container">
        <h1>欢迎,公众监督员{{ user.feedbackName }}</h1>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" plain @click="uploadData">上传数据功能</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" plain @click="viewHistory">查看历史记录功能</el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';
import http from '@/axios'; 

export default defineComponent({
  name: 'Home',
  components: {
    ArrowLeft
  },
  setup() {
    const user = inject('user');
    const router = useRouter();

    const uploadData = () => {
      router.push('/selgrid');
    };

    const viewHistory = () => {
      router.push('/history');
    };

    const logout = () => {
      localStorage.removeItem('token');
      ElMessage.success('已退出');
      router.push('/');
    };

    return {
      user,
      uploadData,
      viewHistory,
      logout,
    };
  },
});
</script>

<style scoped>
.home-container {
  background: url('@/assets/back.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box;
}

.full-header {
  width: 100%;
  height: 60px; /* 可以根据需要调整高度 */
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
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
}

.header-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-left: 20px;
}

.logout-icon {
  color: #333;
  cursor: pointer;
  position: absolute;
  left: 20px;
}

.content-container {
  width: 100%;
  max-width: 800px;
  text-align: center;
  margin-top: 80px; /* 确保内容不会被固定的头部遮挡 */
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.el-row {
  margin-top: 20px;
}

.el-button {
  width: 100%;
  font-size: 16px;
}

/* 添加媒体查询以确保布局在不同设备上合理 */
@media (max-width: 768px) {
  .el-col {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
