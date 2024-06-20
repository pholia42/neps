<template>
  <div class="feedback-list-container">
    <header class="header">
      <div class="header-content">
        <el-icon @click="goBack" class="logout-icon"><ArrowLeft /></el-icon>
        <span class="header-text">历史反馈信息列表</span>
      </div>
    </header>
	<div class="header-image">
	  <img src="@/assets/list.jpg" alt="Background Image" />
	</div>
    <div class="list-container">
      <el-table :data="feedbackList" style="width: 100%">
        <el-table-column label="等级" prop="grade" align="center">
          <template #default="scope">
            <span :class="'level level-' + scope.row.grade">{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="feedbackTime" align="center" />
        <el-table-column label="省份" prop="province" align="center" />
        <el-table-column label="城市" prop="city" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElTable, ElTableColumn, ElIcon, ElMessage } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';

const feedbackList = reactive([]); 
const user = inject('user');
const router = useRouter();

const fetchData = async () => {
  try {
    const response = await axios.get('http://wftr4y.natappfree.cc/supervisor/queryPredictionHistory', {
      params: { telId: user.telId },
    });
    if (response.data.success) {
      feedbackList.push(...response.data.data);
    } else {
      ElMessage.error('获取数据失败：' + response.data.errorMsg);
    }
  } catch (error) {
    console.error('请求错误:', error);
    ElMessage.error('请求错误，请稍后重试');
  }
};

const goBack = () => {
  router.push('/home');
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.feedback-list-container {
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

.header-image {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 20px;
}

.header-image img {
  max-width: 200px;
  width: 100%;
  height: auto;
}


.logout-icon {
  color: #333;
  cursor: pointer;
  position: absolute;
  left: 20px;
}

.list-container {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 80px; /* 确保内容不会被固定的头部遮挡 */
}

.el-table {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.el-table th {
  background-color: #f2edac;
  color: #333;
}

.level {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 50%;
  line-height: 24px;
  color: white;
}

.level-一 { background-color: #00e400; }
.level-二 { background-color: #ffff00; }
.level-三 { background-color: #ff7e00; }
.level-四 { background-color: #ff0000; }
.level-五 { background-color: #99004c; }
.level-六 { background-color: #7e0023; }

.el-message {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
