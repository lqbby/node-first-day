<template>
  <el-table :data="tableData" stripe style="width: 98%; margin: auto">
    <el-table-column type="index" :label="workListTitle.index" width="100">
    </el-table-column>
    <el-table-column
      prop="taskCode"
      :label="workListTitle.taskCode"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="innerCode"
      :label="workListTitle.innerCode"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="taskType.typeName"
      :label="workListTitle.taskType.typeName"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="createType"
      :label="workListTitle.createType"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="taskStatus"
      :label="workListTitle.taskStatus"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="userName"
      :label="workListTitle.userName"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="updateTime"
      :label="workListTitle.updateTime"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="address"
      :label="workListTitle.operation"
      width="180"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          @click="$emit('editWork', scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getWorkOrderList } from '@/api/workOrder'
export default {
  name: 'GoodsTable',
  data() {
    return {
      workListTitle: {
        index: '序号',
        taskCode: '工单编号',
        innerCode: '设备编号',
        taskType: { typeName: '工单类型' },
        createType: '工单方式',
        taskStatus: '工单状态',
        userName: '运营人员',
        updateTime: '创建时间',
        operation: '操作'
      },
      tableData: [],
      pageIndex: 1
    }
  },
  updated() {
    this.tableData.forEach((item) => {
      return (item.createType = item.createType ? '手动' : '自动')
    })
    this.tableData.forEach((item) => {
      return (item.updateTime = item.updateTime.replace('T', ' '))
    })
    this.tableData.forEach((item) => {
      if (item.taskStatus === 1) {
        return (item.taskStatus = '投放工单')
      } else if (item.taskStatus === 2) {
        return (item.taskStatus = '补货工单')
      } else if (item.taskStatus === 3) {
        return (item.taskStatus = '维修工单')
      } else if (item.taskStatus === 4) {
        return (item.taskStatus = '撤机工单')
      } else {
        return (item.taskStatus = 'xx工单')
      }
    })
  },
  methods: {
    // 获取商品类型
    async getWorkOrderList(user, region) {
      const res = await getWorkOrderList({
        pageIndex: this.pageIndex,
        taskCode: user,
        status: region
      })
      // console.log(res)
      this.$emit('paging', res.data)
      // console.log(res.data.currentPageRecords)
      this.tableData = res.data.currentPageRecords
    },

    pageIndexjiajia() {
      console.log(111)
      this.pageIndex++
    },
    pageIndexjianjian() {
      this.pageIndex--
    }
  },
  created() {
    this.getWorkOrderList()
  }
}
</script>

<style scoped>
.img {
  width: 26px;
  height: 26px;
}
</style>
