<template>
  <div class="dataMigration">
    <div class="title">
      <h1>数据迁移列表</h1>
      <div>
        <el-button type="primary">任务导入</el-button>
        <el-button type="primary">新建任务</el-button>
      </div>
    </div>
    <div class="search">
      <el-input
        style="width: 300px;"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
        v-model="searchName"
      >
      </el-input>
      <div>
        <el-button type="success" plain>启动</el-button>
        <el-button type="danger" plain>停止</el-button>
        <el-button type="info" plain>释放</el-button>
        <el-button type="warning" plain>修改</el-button>
        <el-button type="primary" plain>刷新</el-button>
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
export default class DataMigration extends Vue {
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
.dataMigration {
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
