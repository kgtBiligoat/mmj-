<template>
  <div class="askLeaveManagement">
    <div class="title">
      <h1>迁移记录</h1>
    </div>
    <!-- 实例id | 源流程id | 目的流程id | 迁移时间 | 迁移是否成功 -->
    <el-table :data="tableData" border>
      <el-table-column fixed prop="instanceId" label="实例id">
      </el-table-column>
      <el-table-column prop="sourceProcessId" label="源流程id">
      </el-table-column>
      <el-table-column
        prop="targetProcessId"
        label="目的流程id"
      ></el-table-column>
      <el-table-column label="迁移时间">
        <span slot-scope="{ row }">{{
          dayjs(row.migrationTime).format('YYYY-MM-DD HH-mm-ss')
        }}</span>
      </el-table-column>
      <el-table-column label="迁移是否成功">
        <el-tag
          slot-scope="{ row }"
          :type="row.isMigrationSuccess ? 'success' : 'danger'"
          >{{ row.isMigrationSuccess ? '成功' : '失败' }}</el-tag
        >
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
import * as api from '@/api'
@Component
export default class Migration extends Vue {
  tableData = []

  currentPage = 1
  pageSize = 10
  totalSize = 100
  dayjs = dayjs

  searchName = ''

  async search(v: number) {
    const res = await api.searchMigratioList({
      pageNum: v ? v : this.currentPage,
      pageSize: this.pageSize,
    })
    if (res.status === 10000) {
      this.tableData = res.data.list
      this.totalSize = res.data.total
    }
  }

  created() {
    this.search(1)
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
