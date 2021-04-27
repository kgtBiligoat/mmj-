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

      <el-menu-item index="2" @click="checkIn">
        {{ isLogin ? '登出' : '登录' }}
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
        <el-alert v-if="!isLogin" title="请先登录" type="warning" center show-icon></el-alert>
        <router-view v-else></router-view>
      </div>
    </div>
    <LoginModal :visible.sync="isOpenLodinModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import LoginModal from './views/components/LoginModal.vue'
import * as api from '@/api'
@Component({
  components: {
    LoginModal,
  },
})
export default class App extends Vue {
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

  checkIn() {
    if (!this.isLogin) {
      this.isOpenLodinModal = true
    } else {
      this.logout()
    }
  }

  async logout() {
    const res = await api.logout()
    if(res.status === 10000) {
      this.$store.commit('LOGOUT')
      this.$message({
        message: '登出成功',
        type: 'success',
      })
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
