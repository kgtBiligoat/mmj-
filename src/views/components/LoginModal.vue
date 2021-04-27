<template>
  <el-dialog
    title="登录"
    width="30%"
    :visible.sync="localVisible"
    :close-on-click-modal="false"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="login">
        <el-form
          :model="logForm"
          :rules="logRules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="logForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="logForm.password"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="regist">
        <el-form
          :model="registForm"
          :rules="registRules"
          ref="registFrom"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registForm.password"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="registForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="address">
            <el-input v-model="registForm.address"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">{{
        activeName === 'login' ? '登录' : '注册'
      }}</el-button>
    </span>
  </el-dialog>
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
      },
      registRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        ],
      },
    }
  },
})
export default class LoginModal extends Vue {
  @Prop()
  visible!: boolean

  logForm = {
    username: '',
    password: '',
  }
  registForm = {
    username: '',
    password: '',
    phone: '',
    adress: '',
  }

  activeName = 'login'

  get localVisible() {
    return this.visible
  }

  set localVisible(v: boolean) {
    this.$emit('update:visible', v)
  }

  async login() {
    const res = await api.login({
      ...this.logForm,
    })
    if (res.status === 10000) {
      this.$store.commit('LOGIN', {
        username: this.logForm.username,
      })
      this.$message({
        message: '登陆成功',
        type: 'success',
      })
    }
  }

  async regist() {
    const res = await api.regist({
      ...this.registForm,
    })
    if (res.status === 10000) {
      this.$store.commit('LOGIN', {
        username: this.registForm.username,
      })
      this.$message({
        message: '注册成功',
        type: 'success',
      })
    }
  }

  submitForm() {
    const formName = this.activeName === 'login' ? 'loginForm' : 'registFrom'
    ;(this.$refs[formName] as any).validate(async (valid: any) => {
      if (valid) {
        this.activeName === 'login' ? await this.login() : await this.regist()
        this.localVisible = false
      } else {
        return false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
</style>
