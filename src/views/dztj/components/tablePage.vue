<template>
  <div>
    <!-- 头部 -->
    <div class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="合作商:">
          <el-select v-model="select" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.ownerName"
              :value="item.ownerName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <span>日期：</span>
        <el-date-picker
          v-model="valueTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          :start-placeholder="this.partner.start"
          :end-placeholder="this.partner.end"
        >
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-search"></i>
            查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格内容 -->
    <div>
      <!-- 统计 -->
      <div class="stats">
        <span class="label">笔数统计：</span>
        <span class="value">{{ count1 }}</span>
        <span class="unit">个</span>
        <span class="label">收入统计：</span>
        <span class="value">{{ count2 }}</span>
        <span class="unit">元</span>
        <span class="label">分成统计：</span>
        <span class="value">{{ count3 }}</span>
        <span class="unit">元</span>
      </div>
      <!-- table -->
      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%; margin: auto" class="form-data">
        <el-table-column prop="date" :label="workOrderTitle.date" width="200">
        </el-table-column>
        <el-table-column
          prop="ownerName"
          :label="workOrderTitle.ownerName"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="ratio" :label="workOrderTitle.ratio" width="200">
        </el-table-column>
        <el-table-column
          prop="orderTotalMoney"
          :label="workOrderTitle.orderTotalMoney"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="orderCount"
          :label="workOrderTitle.orderCount"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="totalBill"
          :label="workOrderTitle.totalBill"
          width="200"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getReconciliationApi } from '@/api/reconciliation'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      // 汇总数据
      partner: {
        partnerName: '',
        pageIndex: 1,
        pageSize: 10,
        start: dayjs(new Date()).format('YYYY-MM-01'),
        end: dayjs(new Date()).format('YYYY-MM-DD')
      },
      valueTime: '',
      formInline: {
        user: ''
      },
      select: '',
      workOrderTitle: {
        date: '订单日期',
        ownerName: '合作商',
        ratio: '分成比例',
        orderTotalMoney: '收入（元）',
        orderCount: '比数',
        totalBill: '分成金额'
      },
      tableData: [],
      count: ''
    }
  },

  created() {
    // 合作商分成汇总数据
    this.getReconciliation(this.partner)
  },
  computed: {
    count1() {
      let num = 0
      for (let i = 0; i < this.tableData.length; i++) {
        num = num + this.tableData[i].orderCount
      }
      return num.toFixed()
    },
    count2() {
      let num = 0
      for (let i = 0; i < this.tableData.length; i++) {
        num = num + this.tableData[i].orderTotalMoney
      }
      return (num/1000).toFixed(2)
    },
    count3() {
      let num = 0
      for (let i = 0; i < this.tableData.length; i++) {
        num = num + this.tableData[i].totalBill
      }
      return (num/1000).toFixed(2)
    }
  },

  methods: {
    async onSubmit() {
      // console.log(this.valueTime)
      this.partner.start = this.valueTime[0]
      this.partner.end = this.valueTime[1]
      this.partner.partnerName = this.select
      // console.log(this.select)
      await this.getReconciliation(this.partner)
    },
    onRemove() {
      this.isShowDialog = true
    },
    // pageIndex: this.partner.pageIndex,
    //     pageSize: this.partner.pageSize,
    //     start: this.partner.start,
    //     end: this.partner.end
    close() {
      this.isShowDialog = false
    },
    isConfig() {
      this.isShowConfig = true
    },
    // 合作商分成汇总数据
    async getReconciliation(val) {
      const res = await getReconciliationApi(val)
      // console.log(res)
      this.tableData = res.data.currentPageRecords
      // console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
.demo-form-inline {
  padding: 15px;
}
.box-card {
  width: 100%;
  height: 64px;
  margin-top: 10px;
  /* margin-left: 5px; */
  margin-bottom: 20px;
  background-color: #fff;
}
.stats {
  background-color: #fff;
  padding: 10px 0 0 18px;
  margin-bottom: 15px;
}
.label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.value {
  font-size: 20px;
  color: #ff5757;
  font-weight: 500;
}
  /* //表单内边距 */
  .form-data{
    padding:13px
  }
.unit {
  margin-right: 50px;
  font-size: 12px;
  color: #000;
}
</style>
