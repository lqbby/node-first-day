<template>
  <el-dialog
    title="人员详情"
    :visible="Visible"
    width="48%"
    class="dialog-user"
    :before-close="handleClose"
  >
    <!-- 人员信息 -->
    <div class="userMessage">
      <span>人员名称：{{ details.userName }}</span>
      <span>角色：{{ details.roleName }}</span>
      <span>联系电话:{{ details.mobile }}</span>
      <span>负责区域：{{ details.regionName }}</span>
    </div>
    <!-- 表格 -->
    <template>
      <el-table :data="Workorderform" border style="width: 100%">
        <!-- <el-table-column> -->
        <!-- <template> -->
        <slot />
        <!-- </template> -->
        <!-- </el-table-column> -->
        <el-table-column prop="total" label="总工单数" />
        <el-table-column prop="cancelCount" label="拒绝工单" />
        <el-table-column prop="workCount" label="完成工单" />
        <el-table-column prop="progressTotal" label="进行中工单" />
      </el-table>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'Viewdetails',
  props: {
    Visible: {
      type: Boolean,
      required: true
    },
    // 个人信息
    details: {
      type: Object,
      required: true
    },
    // 表格数据
    Workorderform: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleClose() {
      this.$emit('closeFn')
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-user {
  padding: 10px;
  .userMessage {
    width: 100%;
    height: 70px;
    background-color: #f3f6fb;
    border-radius: 5px;
    padding: 19px 19px 0;
    margin-bottom: 20px;
    span {
      display: inline-block;
      height: 24px;
      margin: 0 19px;
    }
  }
}
</style>
