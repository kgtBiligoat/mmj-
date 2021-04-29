<template>
  <div class="askLeaveManagement">
    <div class="title">
      <h1>请假审批</h1>
      <div>
        <el-button type="primary">请假</el-button>
      </div>
    </div>
    <el-table :data="tableData" border>
      <el-table-column fixed prop="taskName" label="任务名称" >
      </el-table-column>
      <el-table-column prop="taskResource" label="资源类型" > </el-table-column>
      <el-table-column prop="taskStatus" label="任务状态" >
        <el-tag lot-scope="scope" type="success">运行中</el-tag>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" > </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
@Component
export default class AskLeaveManagement extends Vue {
  tableData = [
    {
      taskName: 'mmj傻逼',
      taskResource: 'mySql',
      taskStatus: '',
      createTime: dayjs().format('YYYY-MM-DD')
    }
  ]

  searchName = ''

  created() {
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
