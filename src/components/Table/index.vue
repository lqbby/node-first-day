<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="taskCode" label="工单编号"> </el-table-column>
      <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
      <el-table-column prop="taskType.typeName" label="工单类型">
      </el-table-column>
      <el-table-column prop="createType" label="工单方式" :formatter="tacked" />
      <el-table-column prop="taskStatus" label="工单状态" :formatter="pask">
      </el-table-column>
      <el-table-column prop="userName" label="运营人员"> </el-table-column>
      <el-table-column prop="createTime" label="创建日期">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
         <template v-slot="{ row }">
          <el-button type="text" size="small" @click="clickFn(row)"
            >查看详情</el-button
          >
        </template>
         </el-table-column>
    </el-table>
  </div>
</template>

<script>
//3 取消 4完成
export default {
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },

  created() {},

  methods: {
    tacked(row, column, cellValue) {
      if (cellValue == 0) {
        return '自动'
      } else if (cellValue == 1) {
        return '手动'
      }
    },
    pask(row, column, cellValue) {
      if (cellValue == 3) {
        return '取消'
      } else if (cellValue == 4) {
        return '完成'
      }
    },
  },
}
</script>

<style scoped></style>
