<template>
  <div class="askLeaveManagement">
    <div class="title">
      <h1>请假记录</h1>
      <div>
        <el-button type="primary" @click="isOpenAskLeaveModal = true"
          >请假</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" border>
      <el-table-column fixed prop="username" label="请假人"> </el-table-column>
      <el-table-column prop="reason" label="请假原因"> </el-table-column>
      <el-table-column label="开始时间">
        <span slot-scope="{ row }">{{
          dayjs(row.startTime).format('YYYY-MM-DD')
        }}</span>
      </el-table-column>
      <el-table-column label="结束时间">
        <span slot-scope="{ row }">{{
          dayjs(row.endTime).format('YYYY-MM-DD')
        }}</span>
      </el-table-column>
      <el-table-column label="请假时长">
        <span slot-scope="{ row }">
          {{ DateDifference(row.startTime, row.endTime) }}
        </span>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right; margin-top: 10px;"
      @current-change="search"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="prev, pager, next, jumper, sizes ,total"
      :total="totalSize"
    >
    </el-pagination>
    <AskLeaveModal :visable.sync="isOpenAskLeaveModal"></AskLeaveModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
import AskLeaveModal from './components/AskLeaveModal.vue'
import * as api from '@/api'
@Component({
  components: {
    AskLeaveModal,
  },
})
export default class AskLeaveManagement extends Vue {
  tableData = [

  ]

  isOpenAskLeaveModal = false

  currentPage = 1
  pageSize = 10
  totalSize = 100
  dayjs = dayjs

  searchName = ''

  async search(v: number) {
    const res = await api.searchLeaveList({
      pageNum: v ? v : this.currentPage,
      pageSize: this.pageSize,
    })
    if (res.status === 10000) {
      this.tableData = res.data.list
      this.totalSize = res.data.total
    }
  }

  DateDifference(faultDate: string, completeTime: string) {
    var stime = new Date(faultDate).getTime()
    var etime = new Date(completeTime).getTime()
    var usedTime = etime - stime //两个时间戳相差的毫秒数
    var days = Math.floor(usedTime / (24 * 3600 * 1000))
    //计算出小时数
    var leave1 = usedTime % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    var time = days + "天"+hours+"时"+minutes+"分";
    return time
  }

  created() {
    this.search(1)
    console.log('杜泽正是傻逼', dayjs())
  }
}
</script>

<style lang="scss" scoped>
.askLeaveManagement {
  padding: 0px 20px 20px 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: gray 1px dashed;
    margin-bottom: 10px;
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>
