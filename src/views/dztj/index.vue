<template>
  <div>
    <el-row type="flex" justify="center" :gutter="20">
      <el-col>
        <div>
          <div class="grid-content bg-purple1">
            <div class="title">日销售统计</div>
            <div class="body">
              <div class="status">
                <div class="item">
                  <div class="num color1 text-shadow1">
                    {{ orderCountList }}
                  </div>
                  <div class="text color2">当日销售量（个）</div>
                </div>
              </div>
              <div class="status">
                <div class="item">
                  <div class="num color1 text-shadow1">
                    {{ orderAmountList }}
                  </div>
                  <div class="text color2">当日销售额（元）</div>
                </div>
              </div>
              <div class="status">
                <div class="item">
                  <div class="num color1 text-shadow1">{{ totalBillList }}</div>
                  <div class="text color2">当日分成（元）</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple2">
          <span class="title">月销售统计</span>
          <div class="body">
            <div class="status">
              <div class="item">
                <div class="num color3 text-shadow2">
                  {{ totalBillMonthList }}
                </div>
                <div class="text color4">当月销售量（个）</div>
              </div>
            </div>
            <div class="status">
              <div class="item">
                <div class="num color3 text-shadow2">
                  {{ orderAmountMonthList }}
                </div>
                <div class="text color4">当月销售额（万元）</div>
              </div>
            </div>
            <div class="status">
              <div class="item">
                <div class="num color3 text-shadow2">
                  {{ orderCountMonthList }}
                </div>
                <div class="text color4">当月分成（元）</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <tablePage></tablePage>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  totalBillApi,
  orderAmountApi,
  orderCountApi
} from '@/api/reconciliation'
import tablePage from './components/tablePage.vue'
export default {
  data() {
    return {
      // 当日
      nowday: {
        start: dayjs(new Date()).format('YYYY-MM-DD 00:00:00'),
        end: dayjs().endOf(1, 'day').format('YYYY-MM-DD 23:59:59')
      },
      // 当月
      nowmonth: {
        start: dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'),
        end: dayjs().endOf('date').format('YYYY-MM-DD 23:59:59')
      },
      // 分成总数
      totalBillList: '',
      totalBillMonthList: '',

      // 收入
      orderAmountList: '',
      orderAmountMonthList: '',
      // 订单总数
      orderCountList: '',
      orderCountMonthList: ''
    }
  },

  created() {
    // 分成总数
    this.totalBill()
    this.totalBillMonth()
    // 收入
    this.orderAmount()
    this.orderAmountMonth()
    // 订单总数
    this.orderCount()
    this.orderCountMonth()
  },
  components: {
    tablePage
  },

  methods: {
    // 分成总数
    async totalBill() {
      const res = await totalBillApi(this.nowday)
      // console.log(res)
      this.totalBillList = res.data
    },
    async totalBillMonth() {
      const res = await totalBillApi(this.nowmonth)
      // console.log(res)
      this.totalBillMonthList = res.data
    },
    // 收入
    async orderAmount() {
      const res = await orderAmountApi(this.nowday)
      // console.log(res)
      this.orderAmountList = res.data
    },
    async orderAmountMonth() {
      const res = await orderAmountApi(this.nowmonth)
      // console.log(res)
      this.orderAmountMonthList = (res.data/1000000).toFixed(2)
    },
    // 订单总数
    async orderCount() {
      const res = await orderCountApi(this.nowday)
      // console.log(res)
      this.orderCountList = res.data
    },
    async orderCountMonth() {
      const res = await orderCountApi(this.nowmonth)
      // console.log(res)
      this.orderCountMonthList = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple1 {
  background: #e9f3ff;
  background-image: url('./img/pic1.png'), url('./img/pic2.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
}
.bg-purple2 {
  background: #fbefe8 url('./img/pic3.png') no-repeat calc(100% - 12px) 100%;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  // position: relative;
  border-radius: 20px;
  width: 647px;
  height: 167px;
  margin-top: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.father {
  display: flex;
}
.title {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333;
  display: flex;
  padding-top: 17px;
  padding-left: 21px;
}
.body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-evenly;
  margin-top: 33px;
}
.sku-sale-stats-chart[data-v-3a34ff32] {
  /* display: -webkit-box; */
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: calc(25vh - 30px);
  min-height: 166px;
}
.stats {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.item {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.num {
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 50px;
  text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
}
.text {
  height: 17px;
  margin-top: 3px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #91a7dc;
  line-height: 17px;
}
.text-shadow1 {
  text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
}
.color1 {
  color: #072074;
}
.color2 {
  color: #91a7dc;
}
.text-shadow2 {
  text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
}
.color3 {
  color: #ff5757;
}
.color4 {
  color: #de9690;
}
</style>
