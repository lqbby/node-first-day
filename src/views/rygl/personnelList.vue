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
        @clear="clearValue"
      />
      <i class="ibutt" />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="queryPresonnel"
      >查询</el-button>
    </div>
    <!-- 表单内容 -->
    <div class="bottom">
      <Table
        :nav-list="NavList"
        v-bind.sync="currentObj"
        :is-show="false"
        @changePage="changePage"
        @isShowDialog="isShowDialog"
      >
        <el-table-column label="操作" min-width="200">
          <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="isShowDialogModify(scope.row)"
            >
              修改
            </el-button>
            <el-button
              style="color: red"
              type="text"
              size="small"
              @click="delPersonnel(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <!-- 新增弹层 -->
    <NewDailog
      ref="newdailog"
      :dialog-form-visible="dialogFormVisible"
      :role-classification="RoleClassification"
      :area-list="areaList"
      :current-page-records="currentPageRecords"
      @isOFFDialog="offdialog"
      @repeat="getUpersonnel"
    />
  </div>
</template>

<script>
import {
  getUpersonnelApi,
  RoleListApi,
  AreaListApi,
  DelePersonnelApi
} from '@/api/personnel'
import Table from './components/Table'
import NewDailog from './components/NewDailog'
export default {
  name: 'Personnel',
  components: { Table, NewDailog },
  data() {
    return {
      NavList: [
        { label: '人员名称', value: 'userName' },
        { label: '归属区域', value: 'regionName' },
        { label: '角色', value: 'role.roleName' },
        { label: '联系电话', value: 'mobile' }
      ],
      currentObj: {},
      baseparams: {
        pageIndex: 1,
        pageSize: 10
      },
      currentPageRecords: [], // 所有人员信息
      valueName: '',
      dialogFormVisible: false,
      RoleClassification: [], // 角色分类
      areaList: [] // 区域列表
    }
  },
  beforeUpdate() {
    this.currentObj.pageSize = +this.currentObj.pageSize
    this.currentObj.pageIndex = +this.currentObj.pageIndex
  },
  created() {
    this.getUpersonnel(this.baseparams)
  },

  methods: {
    // 获取人员信息列表（搜索）
    async getUpersonnel(val) {
      const res = await getUpersonnelApi(val)
      this.currentObj = res.data
      this.currentPageRecords = res.data.currentPageRecords
      // console.log(res)
    },
    // 分页change事件
    async changePage() {
      const params = {
        pageIndex: this.currentObj.pageIndex,
        pageSize: this.currentObj.pageSize
      }
      await this.getUpersonnel(params)
    },
    // 查询事件
    queryPresonnel() {
      const userName = {
        userName: this.valueName
      }
      this.getUpersonnel(userName)
    },
    // 点击清除小图标发送
    clearValue() {
      this.getUpersonnel(this.baseparams)
    },
    // 关闭新增弹层
    offdialog() {
      this.dialogFormVisible = false
    },
    // 打开弹层 并获取角色列表与区域列表
    async isShowDialog() {
      this.dialogFormVisible = true
      // 角色列表
      const res = await RoleListApi()
      this.RoleClassification = res.data
      // 区域列表
      const page = {
        pageIndex: 1,
        pageSize: 1000
      }
      const aretime = await AreaListApi(page)
      this.areaList = aretime.data.currentPageRecords
    },
    // 删除人员
    async delPersonnel(val) {
      await DelePersonnelApi(val.id)
      this.$message.success('删除成功')
      this.getUpersonnel()
      // console.log(val);
    },
    // 修改人员
    async isShowDialogModify(val) {
      // console.log(val)
      this.$refs.newdailog.formData = val
      this.isShowDialog()
    }
  }
}
</script>

<style scoped lang="scss">
.management {
  min-height: 800px;
  background-color: #f8fafd;
  padding: 20px 12px 0;
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
