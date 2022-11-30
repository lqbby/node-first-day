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
          <el-button @click="replaceCode(scope.row)" type="text" size="small"
            >重置密码</el-button
          >
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看详情</el-button
          >
          <el-button type="text" size="small" @click.native="addFn(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click.native="deleteRow(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </bkdTable>
    <addDialog
      ref="addDialog"
      :visible.sync="dialogFormVisible"
      :AreaList="AreaList"
      @add="addPoint"
      @edit="editFn"
      :editAreaList="editAreaList"
    ></addDialog>
    <ShowDetail :Visible.sync="Visible" ref="showDetail"> </ShowDetail>
  </div>
</template>

<script>
import SearchTop from '../dwgl2/components/searchTop.vue'
import bkdTable from '../dwgl2/components/bkdTable.vue'
import ShowDetail from '../dwgl2/partnerComponent/showDetailDialog.vue'
import {
  getPartnerSearchApi,
  addPartnerListApi,
  editPartnerListApi,
  resetPartnerMessageApi,
  delPartnerApi
} from '@/api/partners'
import addDialog from '../dwgl2/partnerComponent/addDialog.vue'
export default {
  name: 'partner',
  data() {
    return {
      searchItem: {
        firstItem: '合作商搜索',
        secondItem: '',
        isSelect: false,
        selectOption: [],
        formInline: {
          user: '',
          region: ''
        }
      },
      // searchItem1: []
      NavList: [
        { label: '合作商名称', value: 'name' },
        { label: '账号', value: 'account' },
        { label: '设备数量', value: 'vmCount' },
        { label: '分成比例', value: 'ratio' },
        { label: '联系人', value: 'contact' },
        { label: '联系电话', value: 'mobile' }
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
      Visible: false
    }
  },
  components: {
    SearchTop,
    bkdTable,
    addDialog,
    ShowDetail
  },
  created() {
    this.getNodeSearch({
      pageIndex: 1,
      pageSize: 10
    })
  },
  beforeUpdate() {
    this.AreaList.pageSize = +this.AreaList.pageSize
    this.AreaList.pageIndex = +this.AreaList.pageIndex
  },
  methods: {
    async getNodeSearch(val) {
      console.log(val)
      const { data } = await getPartnerSearchApi(val)
      // console.log(data)
      // const res = data.currentPageRecords.forEach((item) => {
      //   return (item.radio = toString(item.radio) + '%')
      // })
      // console.log(res)
      this.AreaList = data
    },
    searchFormFn(val) {
      // console.log(val)
      if (val.user) {
        this.getNodeSearch({
          name: val.user
        })
      } else {
        this.getNodeSearch({
          pageIndex: 1,
          pageSize: 10
        })
      }
    },
    async addFn(val) {
      // console.log(val)
      if (val) {
        // this.editAreaList = val
        this.$refs.addDialog.form = val
      }
      this.dialogFormVisible = true

      // console.log(this.editAreaList)
    },
    async addPoint(val) {
      console.log(val)
      try {
        await addPartnerListApi(val)
        this.$message.success('添加成功')
        this.getNodeSearch({
          pageIndex: 1,
          pageSize: 10
        })
      } catch (error) {
        this.$message.error('添加失败')
        this.$message.error(error.response.data)
      }
      // console.log(res)
    },
    async editFn(val) {
      // console.log(val)
      try {
        await editPartnerListApi(val)
        this.$message.success('编辑成功')
      } catch (error) {
        this.$message.error('编辑失败')
        this.$message.error(error.response.data)
      }
    },
    async handleClick(row) {
      this.$refs.showDetail.tableData = row
      this.Visible = true
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
    replaceCode(val) {
      console.log(val)
      this.$confirm('确定要重置合作商密码吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await resetPartnerMessageApi(val.id)
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
