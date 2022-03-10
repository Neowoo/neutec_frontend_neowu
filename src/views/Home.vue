<template>
  <div class="home">
    <el-row justify="center">
      <h1>Repo List</h1>
    </el-row>
    <el-form :inline="true" :model="formData" class="demo-form-inline" @submit.prevent>
      <el-form-item label="GitHub 使用者" size="large">
        <el-input v-model="formData.user" placeholder="使用者名稱 預設Neowoo" @keyup.enter="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜尋</el-button>
      </el-form-item>
    </el-form>
    <div ref="listContainer" class="list-container">
      <div v-if="userInfo.repos.length > 0">
        <template
          v-for="repo in userInfo.repos.slice(0, showListNum)"
          :key="repo.id"
        >
          <el-card class="box-card">
            <el-row>
              <el-col :span="4" class="avatar-area">
                <el-avatar :size="50" :src="repo.owner.avatar_url"></el-avatar>
              </el-col>
              <el-col :span="19">
                {{ repo.name }}
                <br />
                {{ repo.description }}
                <br />
                <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
              </el-col>
            </el-row>
          </el-card>
        </template>
        <div class="bottom-msg">
          <div v-if="showListNum < userInfo.repos.length" v-loading="showLoading" :class="{'has-data': showLoading}" class="bottom-area">
            &nbsp;
          </div>
          <div v-else class="bottom-area empty">
            已經沒有囉！
          </div>
        </div>
      </div>
      <div v-else class="empty-data">
        暫無資料
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox } from 'element-plus'
import { repoList } from "../api/user";

export default {
  name: "Home",
  setup() {
    const userInfo = reactive({
      repos: [],
    });
    const listContainer = ref();
    const showListNum = ref(6);
    const bottomMsgShow = ref(false)
    const formData = reactive({
      user: ''
    })
    const showLoading = ref(false)
    const onSubmit = () => {
      const user = formData.user !== '' ? formData.user : 'Neowoo'
      repoList({
        user
      }).then((res) => {
        if (res.data) {
          userInfo.repos = res.data;
        }
      }).catch(() => {
        ElMessageBox.alert('This is a message', 'Title', {
          confirmButtonText: '錯誤訊息',
          type: '未找到相關使用者資料'
        })
      });
    };

    onMounted(() => {
      listContainer.value.addEventListener("scroll", () => {
        if (
          listContainer.value.scrollTop + listContainer.value.offsetHeight >=
          listContainer.value.scrollHeight
        ) {
          bottomMsgShow.value = true
          showLoading.value = true
          setTimeout(() => {
            showLoading.value = false
            showListNum.value += 6
            if (showListNum.value > userInfo.repos.length) {
              showListNum.value = userInfo.repos.length;
            }
            bottomMsgShow.value = false
          }, 1000);
        }
      });
      onSubmit()
    });
    return {
      showListNum,
      userInfo,
      listContainer,
      onSubmit,
      formData,
      showLoading
    };
  },
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  height: 100px;
  margin: 0 auto 20px;
  text-align: left;
}
.list-container {
  position: relative;
  background-color: rgb(240,240,240);

  width: 50%;
  margin: 0 auto;
  height: 550px;
  overflow-y: scroll;
  padding-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.empty-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
}
.bottom-msg {
  position: relative;
  .bottom-area {
    &.has-data {
      height: 60px;
    }
    &.empty {
      line-height: 60px;
    }
  }
}
.avatar-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
