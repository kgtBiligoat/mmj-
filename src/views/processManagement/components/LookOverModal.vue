<template>
  <el-dialog
    title="流程进度"
    :visible.sync="localVisable"
    :close-on-click-modal="false"
  >
    <el-progress
      :percentage="percentage"
      :text-inside="true"
      :stroke-width="26"
      :status="status"
    ></el-progress>
    <span slot="footer" class="dialog-footer">
      <el-button @click="localVisable = false">中断</el-button>
      <el-button type="primary" @click="percentage = 0">回滚</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
import * as api from '@/api'
@Component
export default class LookOverModal extends Vue {
  @Prop()
  visable!: boolean

  timer = 0
  status = ''

  @Watch('visable', { immediate: true })
  startProcess(v: boolean) {
    if (!v) {
      this.percentage = 0
      clearInterval(this.timer)
      this.status = ''
    } else {
      this.timer = setInterval(() => {
        this.percentage++
        if (this.percentage >= 100) {
          clearInterval(this.timer)
          this.status = 'success'
        }
      }, 100)
    }
  }

  percentage = 0

  form = {
    formType: '',
    leaveDateRange: '',
    reason: '',
  }

  get username() {
    return this.$store.state.username
  }

  get localVisable() {
    return this.visable
  }

  set localVisable(v: boolean) {
    this.$emit('update:visable', v)
  }

  async submit() {
    const res = await api.askLeave({
      ...this.form,
      startTime: dayjs(this.form.leaveDateRange[0]).format('YYYY-MM-DD'),
      endTime: dayjs(this.form.leaveDateRange[1]).format('YYYY-MM-DD'),
      id: this.$store.state.id,
    })
    if (res.status === 10000) {
      this.localVisable = false
      this.$message({
        message: '提交成功',
        type: 'success',
      })
    }
  }
}
</script>
