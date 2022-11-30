<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchGoods"></searchTop>
    <el-card class="box-card">
      <el-button
        icon="el-icon-circle-plus-outline"
        class="elBtn"
        @click="newGoods"
      >
        新建
      </el-button>
      <!-- 工单配置 -->
      <el-button class="importBtn" @click="dialogVisibleTwo = true">
        工单配置
      </el-button>
      <el-dialog
        title="工单配置"
        :visible.sync="dialogVisibleTwo"
        width="30%"
        class="dialog-title"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="formRules"
          label-width="100px"
        >
          <el-form-item label="补货警戒线:" prop="num">
            <el-input-number
              v-model="form.num"
              controls-position="right"
              :min="1"
              :max="10"
              @change="handleChange"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTwo = false">取 消</el-button>
          <el-button type="primary" @click="onSave">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 工单配置 -->
      <!-- 列表 -->
      <workTable
        ref="workPaging"
        @paging="pagingFn"
        @editWork="editWork"
      ></workTable>
      <!-- 分页 -->
      <div class="paging">
        <div>
          共<span>{{ paging.totalCount }}</span
          >条记录 第<span>{{ paging.pageIndex }}</span
          >/<span>{{ paging.totalPage }}</span
          >页
        </div>
        <div class="pagingBtn">
          <el-button
            @click="PreviousPage"
            :disabled="paging.pageIndex <= 1 ? true : false"
            >上一页</el-button
          >
          <el-button
            :disabled="paging.pageIndex === paging.totalPage ? true : false"
            @click="nextPage"
            >下一页</el-button
          >
        </div>
      </div>
    </el-card>
    <!-- 新建弹窗 -->
    <addWorkList :visible.sync="dialogVisible" ref="addWork"></addWorkList>
    <!-- 查看详情 -->
    <el-dialog title="工单详情" :visible.sync="dialogVisibleTree" width="30%">
      <el-row>
        <!-- <el-col :span="12">{{ list.taskStatusTypeEntity.statusName }}</el-col> -->
        <el-col :span="12"></el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">设备编号:{{ list.innerCode }}</el-col>
        <el-col :span="12">创建日期:{{ list.createTime }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12">运营人员:{{ list.userName }}</el-col>
        <!-- <el-col :span="12">工单类型:{{ list.taskType.typeName }}</el-col> -->
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="12"
          >补货数量:
          <span style="color: #5f84ff; cursor: pointer" @click="clickFn"
            >补货详情</span
          >
        </el-col>
        <el-col :span="12">工单方式:{{ list.createType }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">备注:{{ list.desc }}</el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delWork">取消工单</el-button>
      </span>
    </el-dialog>

    <!-- 补货详情弹窗 -->
    <el-dialog
      title="补货详情"
      :visible="dialogVisiblefoure"
      width="30%"
      @close="onClose"
    >
      <!-- 表格区域 -->
      <el-table style="width: 100%" :data="ReplenishmentDetails">
        <el-table-column prop="channelCode" label="货道编号" width="180">
        </el-table-column>
        <el-table-column prop="skuName" label="商品" width="180">
        </el-table-column>
        <el-table-column
          prop="expectCapacity"
          label="补满数量"
          width="170"
        ></el-table-column>
      </el-table>
      <!-- 表格区域 -->
    </el-dialog>
  </div>
</template>

<script>
import searchTop from './components/searchTopa.vue'
import workTable from './components/workTable.vue'
import addWorkList from './components/addWorkList.vue'
import {
  getSupplyAlertValue,
  getReplenishmentDetailsApi,
  delWork
} from '@/api/workOrder'
export default {
  name: 'Operating',
  data() {
    return {
      searchItem: {
        firstItem: '工单编号: ',
        secondItem: '工单状态: ',
        isSelect: true,
        selectOption: [
          { label: '待办', value: '1' },
          { label: '进行', value: '2' },
          { label: '取消', value: '3' },
          { label: '完成', value: '4' }
        ],
        formInline: {
          user: '',
          region: ''
        }
      },
      paging: {}, //分页数据
      dialogVisible: false, //弹窗
      dialogVisibleTwo: false, //工单配置
      form: {
        num: 1
      },
      formRules: {
        num: [{ required: true }]
      },
      dialogVisibleTree: false, //详情弹窗
      list: {}, //工单详情,
      dialogVisiblefoure: false, //详情弹窗=>补货详情
      ReplenishmentDetails: [] //补货详情
    }
  },

  created() {},

  methods: {
    searchGoods(val) {
      const user = val.user
      const region = val.region
      this.$refs.workPaging.getWorkOrderList(user, region)
    },
    //分页
    pagingFn(val) {
      this.paging = val
    },
    // 上一页
    PreviousPage() {
      this.$refs.workPaging.pageIndexjianjian()
      this.$refs.workPaging.getWorkOrderList()
    },
    //下一页
    nextPage() {
      this.$refs.workPaging.pageIndexjiajia()
      this.$refs.workPaging.getWorkOrderList()
    },
    newGoods() {
      this.dialogVisible = true
    },
    async onSave() {
      await getSupplyAlertValue()
      this.dialogVisibleTwo = false
    },
    handleChange(val) {
      this.form.num = val
    },
    editWork(val) {
      // console.log(val)
      this.list = val
      this.dialogVisibleTree = true
    },
    async clickFn() {
      console.log(111)
      this.dialogVisiblefoure = true
      const res = await getReplenishmentDetailsApi(this.list.taskId)
      console.log(res.data)
      this.ReplenishmentDetails = res.data
    },
    onClose() {
      this.dialogVisiblefoure = false
    },
    async delWork() {
      this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await delWork(this.list)
            this.dialogVisibleTree = false
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } catch (error) {
            this.$message.error(error.response.data)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  components: {
    searchTop,
    workTable,
    addWorkList
  }
}
</script>

<style scoped lang="scss">
.box-card {
  .elBtn {
    background-color: #ff893b;
    color: #fff;
    font-size: 14px;
  }
  .importBtn {
    background-color: #fbf4f0;
    color: #655b56;
    border: none;
  }
  //  分页
  .paging {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0 50px 50px;
    color: #dbdfe5;
    font-size: 16px;
    .pagingBtn {
      display: flex;
      margin-right: 60px;
    }
  }
  //工单配置
  ::v-deep .el-dialog {
    width: 630px;
    border-radius: 10px;
    .el-input-number {
      width: 370px;
    }
  }
}
</style>
