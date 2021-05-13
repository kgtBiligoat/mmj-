<template>
  <el-dialog
    title="流程进度"
    :visible.sync="localVisable"
    :close-on-click-modal="false"
  >
    <el-table :data="tableData" border>
      <el-table-column prop="processInstanceId" label="流程实例id"></el-table-column>
      <el-table-column prop="processDefinitionName" label="归属流程"></el-table-column>
      <el-table-column prop="processDefinitionId" label="归属流程id"> </el-table-column>
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
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import * as api from '@/api'
@Component
export default class InstanceModal extends Vue {
  @Prop()
  visable!: boolean
  @Prop()
  queryString!: string

  @Watch('visable', { immediate: true })
  searchTable(v: boolean) {
    if(v) {
      this.search(1)
    }
  }

  tableData = []
  currentPage = 1
  pageSize = 10
  totalSize = 0

  get localVisable() {
    return this.visable
  }

  set localVisable(v: boolean) {
    this.$emit('update:visable', v)
  }

  async search(num: number) {
    const res = await api.searchDefinitionInstanceList({
      queryString: this.queryString,
      pageSize: this.pageSize,
      pageNum: num ? num : this.currentPage
    })
    if(res.status === 10000) {
      this.tableData = res.items
      this.totalSize = res.data.total
    }
  }
}
</script>
<style lang="scss" scoped></style>
