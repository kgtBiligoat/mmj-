<template>
  <div id="app">
    <!-- 顶栏 -->
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <el-avatar
          v-if="isLogin"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
        {{ username }}
      </el-menu-item>
      <el-menu-item index="2">
        登出
      </el-menu-item>
    </el-menu>
    <!-- 侧栏 -->
    <div class="flex">
      <el-menu class="el-menu-vertical" default-active="dataMigration" router>
        <el-menu-item index="dataMigration">
          <i class="el-icon-menu"></i>
          <span slot="title">数据迁移</span>
        </el-menu-item>
        <el-menu-item index="approavlProcess">
          <i class="el-icon-document"></i>
          <span slot="title">审批流程</span>
        </el-menu-item>
        <el-menu-item index="userList">
          <i class="el-icon-setting"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>
      </el-menu>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <LoginModal :visible.sync="isOpenLodinModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import LoginModal from './views/components/LoginModal.vue'
@Component({
  components: {
    LoginModal,
  },
})
export default class App extends Vue {
  isOpenLodinModal = false

  get isLogin() {
    return !!localStorage.username
  }

  get username() {
    return localStorage.username
  }

  created() {
    if (!this.isLogin) {
      this.isOpenLodinModal = true
    }
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  .el-menu-vertical {
    width: 200px;
    height: 100%;
  }
  .container {
    width: calc(100% - 200px);
  }
  .flex {
    height: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
