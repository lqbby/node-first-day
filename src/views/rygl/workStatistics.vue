<template>
  <div class="Human-effect">
    <!-- 头部可视区域 -->
    <el-row type="flex">
      <el-col class="operate-Man">
        运营人员（当天）
        <el-row type="flex" align="center">
          <el-col><span>{{ camp.total }}</span>
            <div>工单总数(个)</div></el-col>
          <el-col>
            <span>{{ camp.completedTotal }}</span>
            <div>完成工单(个)</div></el-col>
          <el-col><span>{{ camp.cancelTotal }}</span>
            <div>拒绝工单(个)</div></el-col>
          <el-col><span>{{ camp.workerCount }}</span>
            <div>运营人员数(个)</div></el-col>
        </el-row>
      </el-col>
      <el-col class="maintenance-man">
        运维人员（当天）
        <el-row type="flex" align="center">
          <el-col><span>{{ dimension.total }}</span>
            <div>工单总数(个)</div></el-col>
          <el-col>
            <span>{{ dimension.completedTotal }}</span>
            <div>完成工单(个)</div></el-col>
          <el-col><span>{{ dimension.cancelTotal }}</span>
            <div>拒绝工单(个)</div></el-col>
          <el-col><span>{{ dimension.workerCount }}</span>
            <div>运营人员数(个)</div></el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 主体内容区域 -->
    <el-row type="flex">
      <el-col class="left-message" :span="18">
        <el-row type="flex">
          <el-col class="title-cols" :span="14">工单状态</el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="timeout"
              class="time-out"
              size="small"
              align="center"
              type="daterange"
              value-format="yyyy-MM-dd"
              :start-placeholder="baseTiem"
              :end-placeholder="baseTiem"
              prefix-icon="el-icon-date"
              :picker-options="pickerOptions"
              @change="getdata"
            />
          </el-col>
          <el-col :span="2" class="time-madthoryear">
            <ul>
              <li
                v-for="(item, index) in times"
                :key="index"
                class="day-focss"
                :class="actives === index ? 'day-css' : ''"
                @click="addClass(index)"
              >
                {{ item.day }}
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row class="empty-img">
          <img src="./components/backgroundImg/zwsj.png" alt="">
          <div class="text">暂无数据</div>
        </el-row>
      </el-col>

      <el-col :span="6" class="right-message">
        <el-row type="flex">
          <el-col class="title-cols" :span="16">人效排名（月度）</el-col>
          <el-col :span="3">
            <template>
              <el-select
                v-model="value"
                placeholder="全部"
                class="input-select"
                @visible-change="visibleChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-col>
        </el-row>
        <el-row type="flex" class="middle">
          <el-col
            v-for="(item, index) in poylees"
            :key="index"
            class="personnel-info"
            :class="active === index ? 'activepersonnel' : ''"
            @click.native="addPersClass(index)"
          >{{ item.day }}</el-col>
        </el-row>
        <el-row class="empty-img">
          <img src="./components/backgroundImg/zwsj.png" alt="">
          <div class="text">暂无数据</div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  gettaskReportInfoApi,
  AreaListApi,
  statusTatisticsApi,
  PersonnelRankingApi
} from '@/api/personnel'
export default {
  name: 'WorkStatistics',
  data() {
    return {
      actives: 0, // 周 月年 动态类名
      active: 0, // 运维 运营切换
      times: [{ day: '周' }, { day: '月' }, { day: '年' }],
      poylees: [{ day: '运营人员' }, { day: '运维人员' }],
      options: [], // 街道列表
      value: '',
      start: '2022-08-08',
      end: '2022-08-08', // 默认时间
      timeout: '', // 时间
      dimension: {}, // 运维人员
      camp: {}, // 运营人员
      pickerOptions: {
        shortcuts: [
          {
            text: '周',
            onClick(picker) {
              console.log(picker)
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '月',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '年',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  computed: {
    baseTiem() {
      return dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  created() {
    this.gettaskReportInfo()
    this.statusTatistics(this.start, this.end)
  },

  methods: {
    // 头部可视区域接口
    async gettaskReportInfo() {
      const start = dayjs().startOf('date').format('YYYY-MM-DD 00:00:00')
      const end = dayjs().endOf('date').format('YYYY-MM-DD 23:59:59')

      const res = await gettaskReportInfoApi(start, end)
      // console.log(res)
      this.camp = res.data[0]
      this.dimension = res.data[1]
    },
    // 下拉区域列表
    async visibleChange() {
      const page = {
        pageIndex: 1,
        pageSize: 1000
      }
      const res = await AreaListApi(page)
      this.options = res.data.currentPageRecords
      this.options.forEach((item) => item.name)
      this.options.unshift({ name: '全部', id: 0 })
      // console.log(this.options);
    },
    // 工单状态
    async statusTatistics(start, end) {
      const res = await statusTatisticsApi(start, end)
      console.log(res)
    },
    // 动态切换周月年
    async addClass(val) {
      this.actives = val
      if (val === 0) {
        // 周
        const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
        const end = dayjs().endOf('day').format('YYYY-MM-DD')
        const res = await statusTatisticsApi(start, end)
        console.log(res)
      } else if (val === 1) {
        // 月
        const start = dayjs(new Date()).startOf('month').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        const res = await statusTatisticsApi(start, end)
        console.log(res)
      } else {
        // 年
        const start = dayjs(new Date()).startOf('year').format('YYYY-MM-DD')
        const end = dayjs().startOf('date').format('YYYY-MM-DD')
        const res = await statusTatisticsApi(start, end)
        console.log(res)
      }
    },
    // 动态切换运营运维
    async addPersClass(index) {
      this.active = index
      if (index === 0) {
        // 运营工单
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('date').format('YYYY-MM-DD')
        const isRepair = false
        const regionId = this.value === '' ? 0 : this.value
        const res = await PersonnelRankingApi(start, end, isRepair, regionId)
        console.log(res)
      } else {
        // 运维工单
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('date').format('YYYY-MM-DD')
        const isRepair = true
        const regionId = this.value === '' ? 0 : this.value
        const arr = await PersonnelRankingApi(start, end, isRepair, regionId)
        console.log(arr)
      }
    },
    // 确定选择的时间发送接口
    async getdata() {
      const start = this.timeout[0]
      const end = this.timeout[1]
      const res = await statusTatisticsApi(start, end)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="scss">
.Human-effect {
  //头部可视区域css样式
  .operate-Man {
    font-size: 16px;
    font-weight: 700;
    background: url('./components/backgroundImg/cc.png') #e9f3ff no-repeat;
    background-position: 485px 38px;
    margin-right: 10px;
    padding: 20px;
    border-radius: 15px;
    ::v-deep.el-col {
      margin-left: 30px;
    }
    span {
      font-size: 36px;
      color: #072074;
    }
    div {
      font-size: 12px;
      color: #91a7dc;
      margin-top: 5px;
    }
  }
  .maintenance-man {
    font-size: 16px;
    font-weight: 700;
    background: url('./components/backgroundImg/yw.png') #fbefe8 no-repeat;
    background-position: 485px 10px;
    margin-left: 10px;
    padding: 20px;
    border-radius: 15px;
    ::v-deep.el-col {
      margin-left: 30px;
    }
    span {
      font-size: 36px;
      color: #ff5757;
    }
    div {
      font-size: 12px;
      color: #de9690;
      margin-top: 5px;
    }
  }
  //内容区域css样式
  .left-message {
    height: calc(75vh - 90px);
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    margin-right: 15px;
    .title-cols {
      font-size: 16px;
      font-weight: 700;
    }
    .time-out {
      width: 250px;
      margin-left: 5px;
    }
    .time-madthoryear {
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        width: 120px;
        height: 34px;
        padding: 0 8px;
        margin-left: 100px;
        margin-top: -2px;
        background-color: #f7fbff;
        cursor: pointer;
      }
      .day-focss {
        width: 40px;
        height: 25px;
        font-size: 14px;
        text-align: center;
        line-height: 25px;
      }
      .day-css {
        background: #fff;
        box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
        border-radius: 7px;
        font-weight: 600;
        color: #333;
        cursor: pointer;
      }
    }
    .empty-img {
      margin: 180px 0 0 389px;
      .text {
        margin-left: 37px;
      }
    }
  }
  .right-message {
    min-height: 542px;
    margin-top: 20px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    .title-cols {
      font-size: 16px;
      font-weight: 700;
    }
    .input-select {
      width: 100px;
      height: 28px;
      background-color: #fff;
      margin-top: -5px;
    }
    .middle {
      align-items: center;
      margin-top: 18px;
      margin-left: 60px;
      background-color: #f7fbff;
      width: 174px;
      height: 34px;
      padding: 3px 20px 0;
      .personnel-info {
        width: 78px;
        height: 18px;
        font-size: 14px;
        color: #9ca3b4;
        cursor: pointer;
      }
      .activepersonnel {
        background: #fff;
        -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
        box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
        border-radius: 7px;
        font-weight: 600;
        color: #333;
      }
    }
    .empty-img {
      margin: 152px 0 0 93px;
      .text {
        margin-left: 39px;
      }
    }
  }
}
</style>
