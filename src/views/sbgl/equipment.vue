<template>
  <div>
    <searchTop :searchItem="searchItem" @searchForm="searchFormFn"></searchTop>
    <TableComponent
      @showAddDialog="showAddDialogFn"
      @showBulkDialog="showBulkDialogFn"
      :isSelect="true"
      :NavList="NavList"
      v-bind.sync="searchResults"
      @changePage="changePageFn"
      @getSelectList="getSelectListFn"
    >
      <template v-slot:default="data">
        <el-button size="mini" type="text" @click="changeChannel(data.data)"
          >货道</el-button
        >
        <el-button size="mini" type="text" @click="changeApplyPolicy(data.data)"
          >策略</el-button
        >
        <el-button size="mini" type="text" @click="editFn(data.data)"
          >修改</el-button
        >
      </template>
    </TableComponent>

    <!-- 新建弹层 -->
    <el-dialog
      title="新增设备"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="onCloseaddDialog"
    >
      <el-form
        :model="AddForm"
        :rules="AddFormrules"
        ref="AddForm"
        label-width="100px"
      >
        <el-form-item label="设备编号:">
          <span>系统自动生成</span>
        </el-form-item>
        <el-form-item label="选择型号:" prop="vmType">
          <el-select
            v-model="AddForm.vmType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in vmTypeList"
              :key="item.typeId"
              :label="item.name"
              :value="item.typeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位:" prop="nodeId">
          <el-select
            v-model="AddForm.nodeId"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in nodeIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCloseaddDialog" user="cancel" class="cancelBtn"
          >取 消</el-button
        >
        <el-button type="primary" user="sure" @click="addVm">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 批量操作弹层 -->
    <el-dialog
      title="批量策略管理"
      :visible.sync="bulkDialogVisible"
      width="50%"
      @close="onClosebulkDialog"
    >
      <template v-if="!vmPolicy.id">
        <span>选择策略：</span>
        <el-select v-model="policyId" placeholder="请选择" style="width: 80%">
          <el-option
            v-for="item in policyList"
            :key="item.policyId"
            :label="item.policyName"
            :value="item.policyId"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onClosebulkDialog" user="cancel" class="cancelBtn"
            >取 消</el-button
          >
          <el-button type="primary" user="sure" @click="bulkHandle"
            >确 认</el-button
          >
        </span>
      </template>
      <template v-else>
        <el-row type="flex">
          <el-col>机器编号：{{ vmPolicy.innerCode }}</el-col>
          <el-col>策略名称：{{ vmPolicy.policyName }}</el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col>策略方案：{{ vmPolicy.discount + '%' }}</el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelPolicy" user="cancel" class="cancelBtn"
            >取消策略</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 修改弹层 -->
    <el-dialog
      title="修改设备"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="onCloseeditDialog"
    >
      <el-row style="margin: 30px"
        >机器编号：<span>{{ editData.innerCode }}</span></el-row
      >
      <el-row style="margin: 30px"
        >供货时间：<span>{{ editData.lastSupplyTime }}</span></el-row
      >
      <el-row style="margin: 30px"
        >设备类型：<span>{{ editData.type }}</span></el-row
      >
      <el-row style="margin: 30px"
        >设备容量：<span>{{ editData.channelMaxCapacity }}</span></el-row
      >
      <el-row style="margin: 30px"
        >设备点位：
        <el-select
          v-model="editData.node"
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in nodeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-row>
      <el-row style="margin: 30px"
        >合作商：<span>{{ editData.ownerName }}</span></el-row
      >
      <el-row style="margin: 30px"
        >所属区域：<span>{{ editData.region }}</span></el-row
      >
      <el-row style="margin: 30px"
        >设备地址：<span>{{ editData.addr }}</span></el-row
      >

      <span slot="footer" class="dialog-footer">
        <el-button @click="onCloseeditDialog" user="cancel" class="cancelBtn"
          >取 消</el-button
        >
        <el-button type="primary" user="sure" @click="editHandle"
          >确 认</el-button
        >
      </span>
    </el-dialog>

    <!-- 货道弹层 -->
    <vmChannel
      v-if="currentVm.type"
      :vmChanneldialogVisible.sync="vmChanneldialogVisible"
      :channelList="channelList"
      :currentVm="currentVm"
      @sureAdvice="sureAdviceFn"
      @delGood="delGoodFn"
      @sureAdd="sureAddFn"
      @sureChangeChannel="sureChangeChannelFn"
    ></vmChannel>
  </div>
</template>
<script>
import searchTop from './components/searchTop.vue'
import TableComponent from './components/table.vue'
import vmChannel from './components/channel.vue'
import {
  addVmAPI,
  applyPolicyAPI,
  cancelvmPolicyAPI,
  changeNodeAPI,
  channelConfigAPI,
  getchannelListAPI,
  getnodeListAPI,
  getpolicyList,
  getvmPolicyAPI,
  getVmSearchAPI,
  getVmTypeListAPI
} from '@/api/equipment'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '设备编号',
        secondItem: '',
        isSelect: false,
        formInline: {
          user: ''
        }
      },
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10,
        innerCode: ''
      },
      searchResults: {},
      NavList: [
        { label: '设备编号', value: 'innerCode' },
        { label: '设备型号', value: 'vmType' },
        { label: '详细地址', value: 'node.addr' },
        { label: '合作商', value: 'ownerName' },
        { label: '设备状态', value: 'vmStatus' }
      ],
      addDialogVisible: false, //新建弹层
      bulkDialogVisible: false, //批量操作弹层
      editDialogVisible: false, //修改弹层
      vmChanneldialogVisible: false, //货道弹层
      AddForm: {
        nodeId: '',
        vmType: '',
        createUserId: this.$store.state.user.userInfo.userId
      },
      AddFormrules: {
        nodeId: [{ required: true, message: '请选择点位', trigger: 'change' }],
        vmType: [{ required: true, message: '请选择型号', trigger: 'change' }]
      },
      nodeIdList: [],
      vmTypeList: [],
      SelectList: [],
      policyList: [],
      policyId: '',
      editData: {},
      nodeList: [],
      vmId: '',
      vmPolicy: {},
      vmInnerCode: '', //策略按钮赋值的
      channelList: [], //货道详情
      currentVm: {} //货道按钮当前售货机详情
    }
  },

  components: {
    searchTop,
    TableComponent,
    vmChannel
  },
  computed: {},

  created() {
    this.getVmSearch(this.baseParams)
  },
  beforeUpdate() {
    this.searchResults.pageSize = +this.searchResults.pageSize
    this.searchResults.pageIndex = +this.searchResults.pageIndex
  },
  methods: {
    async getVmSearch(val) {
      const res = await getVmSearchAPI(val)
      this.searchResults = res.data
      // console.log(this.searchResults)
    },
    changePageFn() {
      this.getVmSearch({
        pageIndex: this.searchResults.pageIndex,
        pageSize: this.searchResults.pageSize
      })
    },
    searchFormFn(val) {
      console.log(val)
      this.baseParams.innerCode = val.user
      this.getVmSearch(this.baseParams)
    },

    //策略
    async changeApplyPolicy(val) {
      // console.log(val)
      this.vmInnerCode = val.innerCode
      const res = await getvmPolicyAPI(this.vmInnerCode)
      console.log(res)
      this.vmPolicy = res.data
      console.log(this.vmPolicy)
      this.showBulkDialogFn()
    },
    //取消策略
    async cancelPolicy() {
      await cancelvmPolicyAPI(this.vmPolicy.innerCode, this.vmPolicy.policyId)
      this.getVmSearch(this.baseParams)
      this.onClosebulkDialog()
    },
    //新增部分函数
    //关闭新增弹层的函数
    onCloseaddDialog() {
      this.addDialogVisible = false
      this.$refs.AddForm.resetFields()
      this.AddForm = {
        nodeId: '',
        vmType: '',
        createUserId: this.$store.state.user.userInfo.userId
      }
    },
    //开启新增的弹层
    async showAddDialogFn() {
      this.addDialogVisible = true
      const res1 = await getVmTypeListAPI()
      const res2 = await getnodeListAPI()
      this.nodeIdList = res2.data.currentPageRecords
      this.vmTypeList = res1.data.currentPageRecords
      // console.log(this.nodeIdList)
      // console.log(this.vmTypeList)
    },
    //新增售货机
    async addVm() {
      await this.$refs.AddForm.validate()
      await addVmAPI(this.AddForm)
      this.getVmSearch(this.baseParams)
      this.onCloseaddDialog()
    },

    //批量操作部分函数
    async showBulkDialogFn() {
      this.bulkDialogVisible = true
      const res = await getpolicyList()
      this.policyList = res.data
      // console.log(this.policyList)
    },
    getSelectListFn(val) {
      val.forEach((item) => this.SelectList.push(item.innerCode))
      console.log(this.SelectList)
    },
    onClosebulkDialog() {
      this.bulkDialogVisible = false
      this.vmPolicy = {}
      this.vmInnerCode = ''
      this.SelectList = []
    },
    async bulkHandle() {
      let data = {}
      if (this.SelectList.length !== 0) {
        data = {
          innerCodeList: [this.vmInnerCode],
          policyId: this.policyId
        }
      } else {
        data = {
          innerCodeList: this.SelectList,
          policyId: this.policyId
        }
      }

      const res = await applyPolicyAPI(data)
      console.log(res)
      this.onClosebulkDialog()
    },

    //修改部分函数
    //修改
    async editFn(val) {
      this.editDialogVisible = true
      const addr = val.node.addr.split('-')[val.node.addr.split('-').length - 1]
      const lastSupplyTime = val.lastSupplyTime.replace('T', ' ')
      this.editData = {
        innerCode: val.innerCode,
        lastSupplyTime: lastSupplyTime,
        type: val.type.name,
        channelMaxCapacity: val.type.channelMaxCapacity,
        node: val.node.id,
        ownerName: val.ownerName,
        region: val.region.name,
        addr: addr
      }
      // console.log(val)
      this.vmId = val.id
      // console.log(this.editData)
      const res = await getnodeListAPI()
      this.nodeList = res.data.currentPageRecords
      // console.log(this.nodeList)
    },
    onCloseeditDialog() {
      this.editDialogVisible = false
    },
    async editHandle() {
      await changeNodeAPI(this.vmId, this.editData.node)
      this.getVmSearch(this.baseParams)
      this.onCloseeditDialog()
    },
    //货道
    async changeChannel(val) {
      // console.log(val)
      const res = await getchannelListAPI(val.innerCode)
      this.channelList = res.data
      this.currentVm = val
      console.log(this.channelList)
      this.vmChanneldialogVisible = true
    },
    //采纳建议
    sureAdviceFn(val) {
      val.forEach((item, index) => {
        this.channelList[index].sku.skuImage = item.image
        this.channelList[index].sku.skuName = item.skuName
      })
    },
    //删除商品
    delGoodFn(val) {
      console.log(val)
      this.channelList.filter(
        (item) => item.channelCode == val.channelCode
      )[0].sku.skuImage = ''
      this.channelList.filter(
        (item) => item.channelCode == val.channelCode
      )[0].sku.skuName = ''
    },
    sureAddFn(val) {
      console.log(val)
      this.channelList.filter(
        (item) => item.channelCode == val.channelCode
      )[0].sku.skuImage = val.skuImage
      this.channelList.filter(
        (item) => item.channelCode == val.channelCode
      )[0].sku.skuName = val.skuName
    },
    async sureChangeChannelFn() {
      const data = {
        innerCode: this.currentVm.innerCode,
        channelList: this.channelList
      }
      await channelConfigAPI(data)
      this.getVmSearch(this.baseParams)
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .cancelBtn {
    margin-right: 20px;
  }
}
</style>
