<template>
  <div class="loginView">
    <h2>流程实例迁移系统</h2>
    <el-form
      :model="logForm"
      :rules="logRules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="logForm.username" size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="logForm.password" size="small"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submitForm('login')">登录</el-button>
      <el-button type="primary" @click="submitForm('regist')">注册</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import * as api from '@/api'
@Component({
  data() {
    return {
      logRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
})
export default class LoginView extends Vue {
  logForm = {
    username: '',
    password: '',
  }

  async login() {
    const res = await api.login({
      ...this.logForm,
    })
    if (res.status === 10000) {
      this.$store.commit('LOGIN', {
        username: this.logForm.username,
        userId: res.data.id
      })
      document.cookie = `isLogin=${this.logForm.username}; `
      this.$message({
        message: '登陆成功',
        type: 'success',
      })
      this.$router.push('/')
    }
  }

  async regist() {
    const res = await api.regist({
      ...this.logForm,
    })
    if (res.status === 10000) {
      this.$store.commit('LOGIN', {
        username: this.logForm.username,
        userId: res.data.id
      })
      document.cookie = `isLogin=${this.logForm.username}; `
      this.$message({
        message: '注册成功',
        type: 'success',
      })
      this.$router.push('/')
    }
  }

  submitForm(v: string) {
    ;(this.$refs['loginForm'] as any).validate(async (valid: any) => {
      if (valid) {
        v === 'login' ? await this.login() : await this.regist()
      } else {
        return false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.loginView {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  background-color: #F2F2F2;
  ::v-deep .el-input__inner{
    width: 250px;;
  }
}
</style>
