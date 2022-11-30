<template>
  <div class="management">
    <!-- 头部搜索 -->
    <div class="top">
      <span>人员搜索:</span>
      <el-input
        v-model.trim="valueName"
        placeholder="请输入"
        style="width: 200px"
        clearable
      />
      <span>角色:</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <i class="ibutt" />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchPresonnel"
      >查询</el-button>
    </div>
    <!-- 表单内容 -->
    <div class="bottom">
      <Table
        :nav-list="NavList"
        v-bind.sync="currentObj"
        :is-show="false"
        :is-show-new="false"
        @changePage="changePage"
      >
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="lookMessage(scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <!-- 弹出层 -->
    <Viewdetails
      :visible="Visible"
      :details="details"
      :workorderform="Workorderform"
      @closeFn="closeFn"
    >
      <el-table-column prop="week" label="" />
    </Viewdetails>
  </div>
</template>

<script>
import Viewdetails from './components/Viewdetails'
import Table from './components/Table'
import dayjs from 'dayjs'
import {
  GetWorkloadApi,
  getuserMessageApi,
  WorkOrderStatisticsApi
} from '@/api/personnel'
export default {
  name: 'WorkList',
  components: { Viewdetails, Table },
  data() {
    return {
      Objs: [{ week: '本周' }, { week: '本月' }, { week: '本年' }],
      valueName: '',
      currentObj: {}, //
      baseparams: {
        pageIndex: 1,
        pageSize: 10
      },
      NavList: [
        { label: '人员名称', value: 'userName' },
        { label: '角色', value: 'roleName' },
        { label: '联系电话', value: 'mobile' },
        { label: '完成工单（本月）', value: 'workCount' },
        { label: '进行中工单', value: 'progressTotal' },
        { label: '拒绝工单（本月）', value: 'cancelCount' }
      ],
      options: [
        {
          value: 'false',
          label: '运营员'
        },
        {
          value: 'true',
          label: '维修员'
        }
      ],
      value: '',
      Visible: false, // 弹层显示
      details: {}, // 弹层信息
      Workorderform: [] // 弹层表格数据
    }
  },

  created() {
    this.GetWorkload(this.baseparams)
  },
  beforeUpdate() {
    this.currentObj.pageSize = +this.currentObj.pageSize
    this.currentObj.pageIndex = +this.currentObj.pageIndex
  },
  methods: {
    // 获取工作量列表
    async GetWorkload(params) {
      const res = await GetWorkloadApi(params)
      this.currentObj = res.data
      // console.log(this.currentObj)
    },
    // 分页change事件
    changePage() {
      const params = {
        pageIndex: this.currentObj.pageIndex,
        pageSize: this.currentObj.pageSize
      }
      this.GetWorkload(params)
    },
    // 搜索
    searchPresonnel() {
      const params = {
        userName: this.valueName,
        isRepair: this.value
      }
      this.GetWorkload(params)
    },
    // 弹层内部关闭
    closeFn() {
      this.Visible = false
    },
    // 查看详情
    async lookMessage(val) {
      this.Visible = true
      // 获取当前用户基本信息
      const res = await getuserMessageApi(val.userId)
      this.details = res.data
      // console.log(this.details)
      // 获取工单统计
      // 周
      const weeks = {
        userId: val.userId,
        start: dayjs(new Date()).startOf('week').format('YYYY-MM-DD 00:00:00'),
        end: dayjs().endOf('day').format('YYYY-MM-DD hh:mm:ss')
      }
      const Week = await WorkOrderStatisticsApi(weeks)
      // console.log(Week)
      // 月
      const months = {
        userId: val.userId,
        start: dayjs(new Date()).startOf('month').format('YYYY-MM-DD 00:00:00'),
        end: dayjs(new Date()).format('YYYY-MM-DD 23:59:59')
      }
      const month = await WorkOrderStatisticsApi(months)
      // console.log(month)
      // 年
      const years = {
        userId: val.userId,
        start: dayjs(new Date()).startOf('year').format('YYYY-MM-DD 00:00:00'),
        end: dayjs().startOf('date').format('YYYY-MM-DD 23:59:59')
      }
      const year = await WorkOrderStatisticsApi(years)
      // console.log(year)
      // 合并三组数据
      this.Workorderform = [Week.data, month.data, year.data]
      // 添加自定义列
      for (let i = 0; i < this.Workorderform.length; i++) {
        this.Workorderform[i].week = this.Objs[i].week
      }
      // console.log(this.Workorderform)
    }
  }
}
</script>

<style scoped lang="scss">
.management {
  min-height: 800px;
  background-color: #f8fafd;
  padding: 10px 12px 0;
  .top {
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
      margin-left: 10px;
    }
    .ibutt {
      margin: 0 5px;
    }
  }
  .bottom {
    height: 840px;
    margin-top: 20px;
    background-color: #fff;
  }
}
</style>
