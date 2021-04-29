<template>
  <el-dialog
    title="请假申请单"
    :visible.sync="localVisable"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="申请人">
        {{ username }}
      </el-form-item>
      <!-- 请假类型 1-事假 2-病假 3-工伤假 4-婚假 5-产假 6-丧假 -->
      <el-form-item label="请假类别">
        <el-select v-model="form.formType" placeholder="请选择请假类别" size="small" style="width: 400px;">
          <el-option label="事假" value="1"></el-option>
          <el-option label="病假" value="2"></el-option>
          <el-option label="工伤假" value="3"></el-option>
          <el-option label="婚假" value="4"></el-option>
          <el-option label="产假" value="5"></el-option>
          <el-option label="丧假" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请假时长">
        <el-date-picker
          v-model="form.leaveDateRange"
          type="datetimerange"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="请假事由">
        <el-input v-model="form.reason" placeholder="请输入请假事由" size="small" style="width: 400px;"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="localVisable = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
import * as api from '@/api'
@Component
export default class askLeaveModal extends Vue {
  @Prop()
  visable!: boolean

  form = {
    formType: '',
    leaveDateRange: '',
    reason: ''
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
      userId: this.$store.state.id
    })
    if(res.status === 10000) {
      this.localVisable = false
      this.$message({
        message: '提交成功',
        type: 'success',
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
