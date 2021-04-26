// 获取治理树响应数据
declare interface GetGovernancTree {
  code: number
  message: string
  data: {
    governanceDomain?: string // 治理领域
    governanceDomainDisPlayName?: string
    governanceObjects?: {
      governanceItems?: {
        governanceItem?: string
        governanceItemDisPlayName?: string
      }[]
      governanceObject?: string
      governanceObjectDisPlayName?: string
    }[]
  }[]
}

declare interface DistriButeParams {
  assignStatus: string[],
  businessCode: number,
  projectName: string,
  tenantName: string
}

// 搜索接口请求数据
declare interface WorkbenchSearchQo {
  // 分配状态 ('ASSIGNED' | 'UNASSIGNED')
  assignStatus?: string[]
  // 核算单元
  businessCode?: number
  // 治理项('TableOwnerIncomplete' | 'TableLifecycleNotConfigured' | 'TaskContinuousFailed' | 'GroupQueueLowUtilization' | 'TableRedundancy' | 'TablePartitionRedundancy' | 'TableNoQuery' | 'TableStorageIrrational')[]
  governanceItems?: string[]
  // 治理状态('UNGOVERNED' | 'NO_NEED_TO_GOVERN' | 'GOVERNED' | 'CHECKED' | 'CHECK_FAILED')
  governanceStatus?: string[]
  // 只看我的
  mine?: boolean
  // 页数
  page?: number
  // 项目组
  projectName?: string
  // 搜索字符串
  query?: string
  // 每页行数
  size?: number
  // 租户
  tenantName?: string
  // 排序
  orderBy?: string
  hasDownStream?: boolean | null
  taskStatus?: 'OFFLINE' | 'ONLINE' | 'NOTASK' | null
  hasQuery?: boolean | null,
  taskSource?: string[]
}

declare interface TableGovernanceItemData {
  dtCol?: string
  dtFormat?: string
  canModifyGovStatus?: boolean
  taskName?: string
  // 跳转链接
  taskLink?: string
  // 可以指派
  canAssign?: boolean
  // 可以压缩
  canCompress?: boolean
  // 可以配置生命周期
  canConfigLifecycle?: boolean
  // 可以删除
  canDelete?: boolean
  // 库名
  dbName?: string
  // 已治理问题数
  governedCount?: string
  // 是否有下游
  hasDownStream?: boolean
  // 是否有热度
  hasQuery?: number
  // 负责人
  owners?: string
  // 当前分区生命周期配置
  partitionLifecycleDesc?: string
  partitionLifecycleDisplayName?: string
  // 分区生命周期建议值
  suggestLifecycle?: string
  // 分区冗余对比表
  partitionRedundancyComparedTable?: string
  // 当前分区生命周期配置
  partitionLifeCycleDisplayName?: string
  // 项目组名
  projectName?: string
  // 来源任务类型 数据表
  sourceTaskType?: string
  // 来源任务类型 任务
  taskSource?: string
  // 存储格式
  storeFormat?: string
  // 表创建时间
  tableCreateTime?: string
  // 表名
  tableUri?: string
  // 表冗余对比表
  tableRedundancyComparedTable?: string
  // 生命周期参考值
  tableSuggestLifecycle?: number
  // 表大小
  tableSize?: number
  // 昨日存储增量
  tableSizeIncrease?: number
  // 任务状态（在线/离线/无任务）
  taskStatus?: string
  // 租户名
  tenantName?: string
  // 未治理问题数
  ungovernedCount?: string
  // 待治理资源量
  ungovernedResourceAmount?: number
  // 30个调度周期失败次数）
  failsIn30Period?: number
  // 队列名
  groupCode?: string
  // quota
  quota?: number
  // 最近7日日均峰值
  avg7DailyPeakCu?: string
  // 30个调度周期失败次数）
  tableName?: string
  // 租户名
  taskType?: string
  // 创建时间
  createTime?: string
  // 下游依赖
  downStreamTasks?: string
  // table类型
  tableType?: string
  canOfflineTask?: boolean
}
// 搜索队列接口响应数据
declare interface QueueGovernanceItemData {
  // 队列名
  groupCode?: string
  // 负责人
  owners?: string
  // quota
  quota?: number
  // 租户名
  tenantName?: string
  // 待治理资源量
  ungovernedResourceAmount?: number
  // 最近7日日均峰值
  avg7DailyPeakCu?: string
}

// 搜索任务接口响应数据
declare interface TaskGovernanceItemData {
  // 30个调度周期失败次数）
  failsIn30Period?: number
  // 负责人
  owners?: string
  // 项目组名
  projectName?: string
  // 任务名
  tableName?: string
  // 租户名
  tenantName?: string
  // 待治理资源量
  ungovernedResourceAmount?: number
  // 任务类型
  taskType?: string
  // 创建时间
  createTime?: string
  // 下游依赖
  downStreamTasks?: string
  // 任务状态
  taskStatus?: string
}
declare interface TaskGovernanceItemBo {
  code: number
  message: string
  data: { items: TaskGovernanceItemData[]; pn: number; sn: number; tn: number }
}
// 搜索表接口响应数据
declare interface TableGovernanceItemBo {
  code: number
  message: string
  data: { items: TableGovernanceItemData[]; pn: number; sn: number; tn: number }
}
declare interface QueueGovernanceItemBo {
  code: number
  message: string
  data: { items: QueueGovernanceItemData[]; pn: number; sn: number; tn: number }
}

declare interface ObjectListQo {
  //GovernanceObject列表
  objects: string[]
}

// 查询任务下游依赖
declare interface DownStreamTaskQo {
  page: number //页数
  size: number //每页展示数量
  taskName: string //任务名
}
// 查询表下游依赖
declare interface DownStreamTableQo {
  dbName: string // 库名
  page: number // 页数
  size: number //每页展示数量
  tableName: string //表名
}
declare interface DownStreamTaskData {
  // 负责人
  owners: string
  // 任务名
  tableName: string
}
declare interface DownStreamTaskBo {
  code: number
  message: string
  data: {
    items: DownStreamTaskData[]
    pn: number
    sn: number
    tn: number
  }
}

declare interface TableQuerySummaryQo {
  dbName: string
  tableName: string
}
declare interface TableQuerySummaryBo {
  code: number
  message: string
  data: {
    app_heat_detail: TableQuerySummaryData[]
    engine_heat_detail: number
  }
}
declare interface TableQuerySummaryData {
  app_type: string
  app_type_describe: string
  db_name: string
  last_access_time: string
  query_cnt_30: string
  query_cnt_60: string
  query_cnt_90: string
  table_name: string
}
declare interface TableQueryDetailQo {
  appType: string // app类型
  dbName: string // 库名
  page: number // 页数
  size: number //每页展示数量
  tableName: string //表名
}

declare interface TableQueryDetailData {
  // 最后访问时间
  lastAccessTime: string
  // misid
  misid: string
  // 90天内查询次数
  queryUserCnt90: number
}
declare interface TableQueryDetailBo {
  code: number
  message: string
  data: TableQueryDetailData
}
declare interface ChangeLifecycleQo {
  // 分区字段配置
  dtCol: DtColumnBo
  // 库名.表名列表
  object: string
  // 生命周期天数
  partitionExpireDays: number
}
declare interface DtColumnBo {
  // 日期分区列
  dtCol: string
  // 日期分区格式
  dtFormat: string
}
// declare interface DtColumnBo {
//   code: number
//   message: string
//   data: DtColumnData
// }

declare interface ChangeOwnerQo {
  // 新负责人
  newOwner: string
  // 库名.表名列表
  objects: string[]
}
declare interface ObjectListQo {
  // GovernanceObject列表
  objects: string[]
}

// 批量修改治理状态
declare interface ChangeGovernanceStatusQo {
  // 无需治理截止日期
  noNeedToGovernDeadline?: string
  // 无需治理原因
  noNeedToGovernReason?: string
  // 对象列表，表（db.table）任务（taskName）队列（queueCode）
  objects?: string[]
  // 治理项类型
  governanceItems: string[]
  // 目标状态 'UNGOVERNED' | 'NO_NEED_TO_GOVERN' | 'GOVERNED' | 'CHECKED' | 'CHECK_FAILED'
  targetStatus?: string
  governanceObject?: string
  // 路径参数 'TABLE'|'TASK'|'GROUP_QUEUE'
}
// 获取治理项
declare interface GovernanceItemData {
  // 治理项名
  governanceItem?: string
  // 治理项中文名
  governanceItemDisPlayName?: string
  // 资产数量
  objectCount?: number
}
declare interface GovernanceItemBo {
  code: number
  message: string
  data: GovernanceItemData[]
}
// 批量修改指派状态
declare interface ChangeAssignStatusQo {
  // 截止日期
  deadline: string
  // 对象列表，表（db.table）任务（taskName）队列（queueCode）
  objects: string[]
  // 治理项类型
  governanceItems: string[]
  // 目标状态 'ASSIGNED' | 'UNASSIGNED'
  targetStatus?: string
  governanceObject?: string
  // 路径参数 'TABLE'|'TASK'|'GROUP_QUEUE'
  isCreateDaXiangGroup: boolean
}
declare interface ObjectListQo {
  // GovernanceObject列表
  objects: string[]
}

declare interface UnitQo {
  monthWithYear?: string
  businessNames: number
}

declare interface TenantGroupData {
  tenants: string[]
}

declare interface TenantGroupBo {
  code: number
  message: string
  data: string[]
}
declare interface GovernanceSelectDataType {
  governanceDomain: string
  governanceObject: string
  selectedItem: string
}
declare interface StorageTrendTableQo {
  tableWithDbNames: string // 库名.表名
  beginDate: string //2020-07-16
  endDate: string //2020-08-16
}
declare interface StorageTrendTableBo {
  code: number
  message: string
  data: {
    dbName: string // "hadoop_ods_offlinetable",
    tableName: string // "luoshu_to_cd__log__accesslog",
    values: StorageTrendTableData[]
  }
}

declare interface StorageTrendTableData {
  date: string // "20200718",
  hadoopUser: string // "hadoop-hdp",
  path: string // "/hive-ods/hadoop_ods_offlinetable.db/luoshu_to_cd__log__accesslog",
  used: number // 2432309.6,
  dbName: string // "hadoop_ods_offlinetable",
  tableName: string // "luoshu_to_cd__log__accesslog"
}

declare interface UsageTrendQueueQo {
  tenantName: string
  queueCodes: string // root.zw01.hadoop-hdp.filemerge
  period: string // DAILY
  beginDate: string // 2020-08-10
  endDate: string // 2020-08-17
  page: number // 1
  size: number // 10
  pattern: string // LINE
}

declare interface UsageTrendQueueBo {
  code: number
  message: string
  data: UsageTrendQueueData[]
}
declare interface UsageTrendQueueData {
  name: string
  value: UsageTrendQueueDataValue[]
}

declare interface UsageTrendQueueDataValue {
  date: string // "2020-08-10",
  tenant: string // "dep-hdp",
  regionName: string // null,
  queueCode: string // "root.zw01.hadoop-hdp.filemerge",
  cuQuota: number // 6000,
  cuDaytimeQuota: number // 6000,
  cuNightlyQuota: number // 6000,
  cuAllocated: number // 2575,
  cuPending: number // 3976
}

declare interface OrcDetail {
  db_name: string
  table_name: string
  progress: string
  final_status: string
  current_status_code: number
  current_status_desc: string
}

declare interface Return<T> {
  code: number
  message: string
  data: T
}

declare interface OrcDetail {
  db_name: string
  table_name: string
  progress: string
  final_status: string
  current_status_code: number
  current_status_desc: string
}

declare interface DeleteParams {
  dt_names: {
    db_name: string
    table_name: string
  }[]
  // 0: 检查 1: 跳过含有此热度的表 2：不检查此热度
  check_app_heat: number
  // 0: 检查 1: 跳过含有此热度的表 2：不检查此热度
  check_engine_heat: number
  // 前端可不传
  operator?: string
}

declare interface DeleteReturnType {
  flag: number
  app_heat_table_list?: {
    db_name: string
    table_name: string
  }[]
  engine_heat_table_list?: {
    db_name: string
    table_name: string
  }[]
  rest_table_list?: {
    db_name: string
    table_name: string
  }[]
}

declare interface OperatitionRecordSearchQo{
  // 表名、任务名
  objectUri?: string
  // 筛选开始时间（yyyymmdd）
  startTime?: string
  // 筛选结束时间（yyyymmdd）
  endTime?: string
  // 租户名
  tenantName?: string[]
  // 项目组名
  projectName?: string[]
  // 操作状态
  // status = 0 操作中
  // status = 1 操作成功
  // status = 2 操作失败
  status?: number[]
  // 操作类型
  operationType?: string[]
  // 治理资产类型
  objectType?: string
  // 页数
  page: number
  // 每页大小
  size: number
  }

  declare interface AssignAllAssetsQo {
    createXmGroup: boolean
    governanceObject: string
    governanceItems: string[]
    deadline: string
    workbenchSearchQo: WorkbenchSearchQo
  }

  declare interface OperationRecordBoList {
    items: OperationRecordBo[]
    tn: number
    sn: number
    cn: number
  }

  declare interface OperationRecordBo {
    // 操作id
    id: number
    // 表名、任务名
    objectUri: string
    // 治理项类别
    objectType: (string[])
    // 操作人
    operator: string
    // 操作时间（yyyymmdd hh:mm:ss)
    operationTime: string
    // 业务线
    businessCode: number
    // 租户名
    tenantName: string
    // 项目组名
    projectName: string
    // 操作类型
    operationType: string
    // 操作状态
    // status = 0 操作中
    // status = 1 操作成功
    // status = 2 操作失败
    status: number
    // orc压缩进度
    orcProgress: number
    // 洛书planId
    planId: string
    // 修改前生命周期
    oldLifecycle: number
    // 修改后生命周期
    newLifecycle: number
    // 修改前负责人
    oldOwner: string
    // 修改后负责人
    newOwner: string
    // 任务来源
    taskResource: string
}
