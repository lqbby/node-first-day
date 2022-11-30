<template>
  <el-dialog title="区域详情" :visible="Visible" width="41%" @close="onClose">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="innerCode" label="机器编号"> </el-table-column>
      <el-table-column prop="vmStatus" label="设备状态"> </el-table-column>
      <el-table-column prop="lastSupplyTime" label="最后一次供货时间">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getNodeDetailApi } from '@/api/pointLocation'
export default {
  name: 'ShowDetail',
  data() {
    return {
      tableData: [],
      areaName: ''
    }
  },
  props: {
    Visible: {
      type: Boolean,
      required: true
    }
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:Visible', false)
    },
    async showDetailContent(val) {
      console.log(val)
      //   this.areaName = val.name
      const { data } = await getNodeDetailApi(val.id)
      console.log(data)
      this.tableData = data
      this.tableData.forEach((item) => {
        if (item.vmStatus === 0) {
          item.vmStatus = '未投放'
        } else if (item.vmStatus === 1) {
          item.vmStatus = '运营'
        } else {
          item.vmStatus = '撤机'
        }
      })
    }
  }
}
</script>

<style scoped>
.grid-content {
  padding-left: 30px;
}
::v-deep .el-table {
  width: 390px;
}
</style>
