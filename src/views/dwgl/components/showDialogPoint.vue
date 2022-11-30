<template>
  <el-dialog title="区域详情" :visible="Visible" width="41%" @close="onClose">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">区域名称:</div></el-col
      >
      <el-col :span="18"
        ><div>{{ areaName }}</div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">包含点位:</div></el-col
      >
      <el-col :span="18">
        <el-table :data="tableData">
          <el-table-column label="序号" type="index"> </el-table-column>
          <el-table-column prop="name" label="点位名称"> </el-table-column>
          <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getAreanodelApi } from '@/api/point'
export default {
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
      // console.log(name)
      this.areaName = val.name
      const { data } = await getAreanodelApi({
        regionId: val.id
      })
      console.log(data)
      this.tableData = data.currentPageRecords
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
