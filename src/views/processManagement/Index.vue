<template>
  <div class="dataMigration">
    <div class="title">
      <h1>流程管理</h1>
    </div>
    <div class="search">
      <div>
        <el-input
          style="width: 300px; margin-right: 10px;"
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          v-model="searchName"
          @keyup.enter.native="(e) => search(1)"
        >
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click="search(1)">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="流程id" ></el-table-column>
      <el-table-column prop="name" label="流程名称" ></el-table-column>
      <el-table-column prop="instanceCount" label="实例数" > </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="openInstanceModal(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" @click="openLookOver" size="small">开启</el-button>
        </template>
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
    <LookOverModal :visable.sync="isOpenLookOverModal"/>
    <InstanceModal :visable.sync="isOpenInstanceModal" :queryString="currentId"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
import LookOverModal from './components/LookOverModal.vue'
import InstanceModal from './components/InstanceModal.vue'
import * as api from '@/api'
@Component({
  components: {
    LookOverModal,
    InstanceModal
  }
})
export default class DataMigration extends Vue {
  tableData = []

  isOpenInstanceModal = false
  isOpenLookOverModal = false
  searchName = ''
  currentPage = 1
  pageSize = 20
  totalSize = 100
  currentId = 1

  openLookOver() {
    this.isOpenLookOverModal = true
  }

  openInstanceModal(row: any) {
    this.currentId = row.id
    this.isOpenInstanceModal = true
  }

  async search(num?: number) {
    const res  = await api.searchDefinitionList({
      queryString: this.searchName,
      pageNum: num ? num : this.currentPage,
      pageSize: this.pageSize
    })
    console.log(res)
    if(res.status === 10000) {
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
