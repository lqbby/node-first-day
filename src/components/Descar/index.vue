<template>
  <div>
    <el-dialog
      :visible="isShow"
      @close="btnCanel"
      title="用户信息"
      class="tanchu"
    >
      <el-descriptions :column="2" size="small">
        <el-descriptions-item
          >{{ sum }}
          <!-- 无法在描述列表转换对应的状态 -->
        </el-descriptions-item>
        <div class="arren">
          <el-descriptions-item
            >订单编号：{{ list.orderNo }}
          </el-descriptions-item>
          <el-descriptions-item
            >商品名称：{{ list.skuName }}</el-descriptions-item
          >
        </div>
        <div class="arren">
          <el-descriptions-item
            >订单金额：{{ list.price }}</el-descriptions-item
          >
          <el-descriptions-item>
            设备编号： {{ list.innerCode }}</el-descriptions-item
          >
        </div>
        <div class="arren">
          <el-descriptions-item
            >创建时间：{{ list.createTime | formatDate }}</el-descriptions-item
          >
          <el-descriptions-item
            >完成时间：{{ list.updateTime | formatDate }}</el-descriptions-item
          >
        </div>
        <div class="arren">
          <el-descriptions-item :formatter="priceFs"
            >支付方式：{{ num }}</el-descriptions-item
          >
          <el-descriptions-item
            >设备地址：{{ list.regionName }}</el-descriptions-item
          >
        </div>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    list: {
      type: [Object],
      default: 'default',
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    btnCanel() {
      this.$emit('update:isShow', false)
    },
    priceFs(row, column, cellValue) {
      if (cellValue === 1) {
        return '支付宝'
      } else if (cellValue === 2) {
        return '微信'
      }
    },
    tacked(row, column, cellValue) {
      if (cellValue === 0) {
        return '创建'
      } else if (cellValue === 1) {
        return '支付完成'
      } else if (cellValue === 2) {
        return '出货成功'
      } else if (cellValue === 3) {
        return '出货失败'
      }
    },
  },
  computed: {
    num() {
      if (this.list.payType === '1') {
        return '支付宝'
      } else if (this.list.payType === '2') {
        return '微信'
      }
    },
    sum() {
      if (this.list.status === 0) {
        return '创建'
      } else if (this.list.status === 1) {
        return '支付成功'
      } else if (this.list.status === 2) {
        return '出货成功'
      } else if (this.list.status === 3) {
        return '出货失败'
      }
    },
  },
}
</script>

<style scoped>
.arren {
  display: flex;
  justify-content: space-between;
}
</style>
