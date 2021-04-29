<template>
  <div class="home">
    <!-- 顶栏 -->
    <el-menu
      class="topBar"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
    >
      <div style="margin-left: 10px; color:#fff;">流程实例迁移系统</div>
      <div style="display: flex;">
        <el-menu-item>
          <el-avatar
            v-if="isLogin"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
          {{ username }}
        </el-menu-item>
        <el-menu-item class="logout" style="" @click="logout">
          注销
        </el-menu-item>
      </div>
    </el-menu>
    <!-- 侧栏 -->
    <div class="sideBar">
      <el-menu
        class="el-menu-vertical"
        default-active="processManagement"
        background-color="#545c64"
        text-color="#fff"
        router
      >
        <el-menu-item index="processManagement">
          <i class="el-icon-menu"></i>
          <span slot="title">流程管理</span>
        </el-menu-item>
        <el-menu-item index="askLeaveManagement">
          <i class="el-icon-document"></i>
          <span slot="title">请假管理</span>
        </el-menu-item>
      </el-menu>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import * as api from '@/api'

@Component
export default class Index extends Vue {
  isOpenLodinModal = false

  @Watch('localStorage.username', { immediate: true })
  test() {
    console.log(localStorage)
  }

  get isLogin() {
    return this.$store.state.isLogin
  }

  get username() {
    return this.$store.state.username
  }

  async logout() {
    const res = await api.logout()
    if (res.status === 10000) {
      this.$store.commit('LOGOUT')
      document.cookie = 'isLogin=; '
      this.$message({
        message: '登出成功',
        type: 'success',
      })
      this.$router.push('/Login')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-vertical {
    height: 100%;
  }
  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
    .logout {
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .sideBar {
    height: 100%;
    display: flex;
  }
  .el-menu-vertical {
    width: 200px;
    height: 100%;
  }
  .container {
    width: calc(100% - 200px);
  }
}
</style>
