<template>
  <div>
    <SearchTop
      :searchItem="searchItem"
      ref="SearchTop"
      @searchForm="searchFormFn"
    >
    </SearchTop>
    <bkdTable
      :NavList="NavList"
      :isShow="isShow"
      v-bind.sync="AreaList"
      :baseParams="baseParams"
      @add="addFn"
      @changePage="changePageFn"
    >
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </bkdTable>
    <dialogAdd
      ref="showAdd"
      :visible.sync="dialogFormVisible"
      :AreaList="AreaList"
      @add="addArea"
    ></dialogAdd>
    <!-- 查看详情弹窗 -->
    <el-dialog
      title="工单详情"
      :visible="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">{{ list.taskStatus }}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">设备编号：{{ list.innerCode }}</el-col>
        <el-col :span="12">创建日期：{{ list.createTime }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">运维人员：{{ list.userName }}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">工单类型：{{ list.typeName }}</el-col>
        <el-col :span="12">工单方式：{{ list.createType }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">备注：{{ list.desc }}</el-col>
        <el-col :span="12">定位：{{ list.addr }}</el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import SearchTop from './operations/searchTop.vue'
import bkdTable from './operations/bkdTable.vue'
import {
  getOperationsSearchApi,
  getallTaskStatusApi,
  addTaskApi,
  getWorkList
} from '@/api/operations'
import dialogAdd from './operations/dialogAdd.vue'
export default {
  name: 'partner',
  data() {
    return {
      searchItem: {
        firstItem: '工单编号',
        secondItem: '工单状态',
        isSelect: true,
        selectOption: [],
        formInline: {
          user: '',
          region: ''
        }
      },
      // searchItem1: []
      NavList: [
        { label: '工单编号', value: 'taskCode' },
        { label: '设备编号', value: 'innerCode' },
        { label: '工单类型', value: 'typeName' },
        { label: '工单方式', value: 'createType' },
        { label: '工单状态', value: 'taskStatus' },
        { label: '运维人员', value: 'userName' },
        { label: '创建日期', value: 'updateTime' }
      ],
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10
      },
      AreaList: {},
      isShow: false,
      dialogFormVisible: false,
      editAreaList: {},
      Visible: false,
      isRepair: true,
      dialogVisible: false,
      list: {}
    }
  },
  components: {
    SearchTop,
    bkdTable,
    dialogAdd
  },
  created() {
    this.getNodeSearch()
  },
  beforeUpdate() {
    this.AreaList.pageSize = +this.AreaList.pageSize
    this.AreaList.pageIndex = +this.AreaList.pageIndex
  },
  methods: {
    async getNodeSearch(val) {
      // console.log(val)
      val = val ? val : { isRepair: true }
      const { data } = await getOperationsSearchApi(val)
      const res = await getallTaskStatusApi()
      this.$refs.SearchTop.setSelectOption(res.data)
      // console.log(data)
      // const res = data.currentPageRecords.forEach((item) => {
      //   return (item.radio = toString(item.radio) + '%')
      // })
      // console.log(res)

      const List = data
      // console.log(List);
      List.currentPageRecords.forEach((item) => {
        // console.log(1111)
        if (item.taskType?.typeId === 1) {
          item.typeName = '投放工单'
        } else if (item.taskType?.typeId === 3) {
          item.typeName = '维修工单'
        } else if (item.taskType?.typeId === 4) {
          item.typeName = '撤机工单'
        }
        console.log(item.typeName)
        if (item.taskStatus === 1) {
          item.taskStatus = '待办'
        } else if (item.taskStatus === 2) {
          item.taskStatus = '进行'
        } else if (item.taskStatus === 3) {
          item.taskStatus = '取消'
        } else if (item.taskStatus === 4) {
          item.taskStatus = '完成'
        }
      })
      List.currentPageRecords = List.currentPageRecords.filter(
        (item) => item.taskType !== null
      )
      // console.log(List.currentPageRecords)
      this.AreaList = List
    },
    searchFormFn(val) {
      // console.log(val)
      this.getNodeSearch({
        taskCode: val.user ? val.user : '',
        status: val.region ? val.region : '',
        isRepair: true
      })
    },
    async addFn() {
      this.$refs.showAdd.showEditContent()
      this.dialogFormVisible = true

      // console.log(this.editAreaList)
    },
    async addArea(val) {
      console.log(val)
      try {
        const data = {
          createType: 1,
          innerCode: val.innerCode,
          userId: val.userName,
          productType: val.taskType,
          desc: val.remark
        }
        await addTaskApi(data)
        this.$message.success('添加成功')
        this.getNodeSearch()
      } catch (error) {
        this.$message.error('添加失败')
        this.$message.error(error.response.data)
      }
      // console.log(res)
    },
    async handleClick(row) {
      // this.$refs.showDetail.tableData = row
      // this.Visible = true
      this.list = row
      this.dialogVisible = true
    },
    async deleteRow(row) {
      try {
        await delPartnerApi({
          name: row.name,
          id: row.id
        })
        this.getNodeSearch({
          pageIndex: 1,
          pageSize: 10
        })
      } catch (error) {
        // console.dir(error)
        this.$message.error(error.response.data)
      }
    },
    changePageFn() {
      this.getNodeSearch({
        pageIndex: this.AreaList.pageIndex,
        pageSize: this.AreaList.pageSize
      })
    },
    onClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
::v-deep .el-message-box {
  width: auto;
  min-width: 281px !important;
  padding: 0 18px 42px 17px;
  display: inline-block;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
</style>
