<template>
  <el-dialog title="区域详情" :visible="Visible" width="41%" @close="onClose">
    <el-row :gutter="20">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          合作商名称：{{ tableData.name }}
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          联系人：{{ tableData.contact }}
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          联系电话：{{ tableData.mobile }}
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          分成比例：{{ tableData.ratio }}%
        </div></el-col
      >
    </el-row>
  </el-dialog>
</template>

<script>
// import { getNodeDetailApi } from '@/api/pointLocation'
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
    }
    // async showDetailContent(val) {
    // console.log(val)
    // //   this.areaName = val.name
    // const { data } = await getNodeDetailApi(val.id)
    // console.log(data)
    // this.tableData = data
    // this.tableData.forEach((item) => {
    //   if (item.vmStatus === 0) {
    //     item.vmStatus = '未投放'
    //   } else if (item.vmStatus === 1) {
    //     item.vmStatus = '运营'
    //   } else {
    //     item.vmStatus = '撤机'
    //   }
    // })
    // }
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
