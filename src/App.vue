<template>
  <div id="app">
    <el-menu
      class="el-menu-vertical"
    >
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
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {

}
</script>


<style>
html, body, #app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  display: flex;
  .el-menu-vertical {
    width: 200px;
    height: 100%;
  }
  .container {
    width: calc(100% - 200px);
  }
}
</style>
