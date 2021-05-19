<template>
  <el-dialog
    title="流程进度"
    :visible.sync="localVisable"
    :close-on-click-modal="false"
  >
    <el-select v-model="value">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.id"
        :value="item.id">
      </el-option>
    </el-select>
    <el-progress
      :percentage="percentage"
      :text-inside="true"
      :stroke-width="26"
      :status="status"
    ></el-progress>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="startMigration()">回滚</el-button>
      <el-button @click="startProcess()">开始迁移</el-button>
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
  @Prop()
  queryString!: string

  timer = 0
  status = ''
  percentage = 0
  value = ''
  options = []

  form = {
    formType: '',
    leaveDateRange: '',
    reason: '',
  }

  @Watch('visable', { immediate: true })
  fetchOptions(v: boolean) {
    if(v) {
      this.fetchOptionList()
    }
  }

  async fetchOptionList() {
    const res = await api.searchOptionList({
      queryString: this.queryString
    })
    if(res.status === 10000) {
      this.options = res.data
    }
  }

  async startMigration(sourceProcessId: string, targetProcessId: string) {
    const res = await api.startMigration({
      sourceProcessId: sourceProcessId,
      targetProcessId: targetProcessId
    })
    if(res.status === 10000) {
      this.$message({
        message: '提交成功',
        type: 'success',
      })
    }
  }

  startProcess(v: boolean) {
    this.timer = setInterval(() => {
      this.percentage++
      if (this.percentage >= 100) {
        clearInterval(this.timer)
        this.status = 'success'
      }
    }, 100)
  }

  get username() {
    return this.$store.state.username
  }

  get localVisable() {
    return this.visable
  }

  set localVisable(v: boolean) {
    clearInterval(this.timer)
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
