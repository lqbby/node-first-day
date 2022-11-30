<template>
  <div>
    <SearchTop :searchItem="searchItem" @searchForm="searchFormFn"> </SearchTop>
    <bkd-table
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
      <!-- <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看详情</el-button
        >
        <el-button type="text" size="small">修改</el-button>
        <el-button
          type="text"
          size="small"
          style="color: red"
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button
        >
      </template> -->
    </bkd-table>
    <dialogPoint
      ref="showEdit"
      :visible.sync="dialogFormVisible"
      :AreaList="AreaList"
      @add="addArea"
      @edit="editArea"
      :editAreaList="editAreaList"
    ></dialogPoint>
    <ShowDialogPoint :Visible.sync="Visible" ref="showDetail"></ShowDialogPoint>
  </div>
</template>

<script>
import bkdTable from '../dwgl2/components/bkdTable.vue'
import SearchTop from '../dwgl2/components/searchTop.vue'
import {
  getAreaListApi,
  editAreaDetailApi,
  addAreaListApi,
  DelAreaDetaillApi
} from '@/api/points'
import dialogPoint from '../dwgl2/components/dialogPoint.vue'
import ShowDialogPoint from '../dwgl2/components/showDialogPoint.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '区域搜索',
        isSelect: false,
        selectOption: [],
        formInline: {
          user: '',
          region: ''
        }
      },
      NavList: [
        { label: '区域名称', value: 'name' },
        { label: '点位数', value: 'nodeCount' },
        { label: '备注说明', value: 'remark' }
      ],
      isShow: false,
      baseParams: {
        //请求列表时的初始参数
        pageIndex: 1,
        pageSize: 10
      },
      AreaList: {},
      dialogFormVisible: false,
      Visible: false,
      editAreaList: {}
    }
  },
  components: {
    SearchTop,
    bkdTable,
    dialogPoint,
    ShowDialogPoint
  },
  created() {
    this.getAreaList()
    // this.getVmSearch(this.baseParams)
  },
  methods: {
    async getAreaList(val) {
      const res = await getAreaListApi(val)
      // console.log(res)
      this.AreaList = res.data
      this.AreaList.pageSize = +this.AreaList.pageSize
      this.AreaList.pageIndex = +this.AreaList.pageIndex
    },
    async handleClick(row) {
      await this.$refs.showDetail.showDetailContent(row)
      this.Visible = true
    },
    async deleteRow(row) {
      try {
        await DelAreaDetaillApi(row.id)
        this.getAreaList()
      } catch (error) {
        // console.dir(error)
        this.$message.error(error.response.data)
      }
    },
    searchFormFn(val) {
      this.getAreaList({
        name: val.user
      })
      console.log(val.user)
    },
    async addFn(val) {
      // console.log(val)
      if (val) {
        this.editAreaList = val
        await this.$refs.showEdit.showEditContent(val.id)
      }
      this.dialogFormVisible = true
      // console.log(this.editAreaList)
    },
    async addArea(val) {
      // console.log(this.AreaList.currentPageRecords)
      try {
        await addAreaListApi({
          regionName: val.name,
          remark: val.remark
        })
        this.$message.success('添加成功')
        this.getAreaList()
      } catch (error) {
        console.dir(error)
        this.$message.error('添加失败')
      }
    },
    async editArea(val) {
      console.log(val)
      try {
        await editAreaDetailApi({
          id: val.id,
          regionName: val.name,
          remark: val.remark
        })
        this.$message.success('添加成功')
        this.getAreaList()
      } catch (error) {
        console.dir(error)
        this.$message.error('添加失败')
      }
    },
    changePageFn() {
      this.getAreaList({
        pageIndex: this.AreaList.pageIndex,
        pageSize: this.AreaList.pageSize
      })
    }
  }
}
</script>

<style scoped></style>
