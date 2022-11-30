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
import SearchTop from './components/searchTop.vue'
import bkdTable from './components/bkdTable.vue'
import ShowDetail from './pointComponent/showDetailDialog.vue'
import { getAreaListApi } from '@/api/point'
import {
  getNodeSearchApi,
  addNodeListApi,
  editNodeDetailApi,
  delNodeDetailApi
} from '@/api/pointLocation'
import addDialog from './pointComponent/addDialog.vue'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '点位搜索',
        secondItem: '区域搜索',
        isSelect: true,
        selectOption: [],
        formInline: {
          user: '',
          region: ''
        }
      },
      // searchItem1: []
      NavList: [
        { label: '点位名称', value: 'name' },
        { label: '所在区域', value: 'region.name' },
        { label: '商圈类型', value: 'businessType.name' },
        { label: '合作商', value: 'ownerName' },
        { label: '详细地址', value: 'addrName' }
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
    this.getNodeSearch()
  },
  beforeUpdate() {
    this.AreaList.pageSize = +this.AreaList.pageSize
    this.AreaList.pageIndex = +this.AreaList.pageIndex
  },
  methods: {
    async getNodeSearch(val) {
      // this.$refs.SearchTop.getNodeSearchApi()
      const res = await getAreaListApi({
        pageSize: 100000
      })
      // console.log(res.data.currentPageRecords)
      // this.searchItem1 = res.data.currentPageRecords
      this.$refs.SearchTop.selectOption = res.data.currentPageRecords
      this.$refs.addDialog.selectOption = res.data.currentPageRecords
      // this.searchItem.selectOption = res.data.currentPageRecords
      // console.log(this.searchItem.selectOption)
      // console.log(res)
      const { data } = await getNodeSearchApi(val)
      // console.log(data)
      this.AreaList = data
      this.AreaList.currentPageRecords.forEach((item) => {
        item.addrName = item.addr.slice(12)
          ? item.addr.slice(12)
          : item.addr.slice(8, 10)
      })
    },
    searchFormFn(val) {
      // console.log(val)
      this.getNodeSearch({
        name: val.user ? val.user : '',
        regionId: val.region ? val.region : ''
      })
    },
    async addFn(val) {
      console.log(val)
      if (val) {
        this.editAreaList = val
        await this.$refs.addDialog.showEditContent({
          name: val.name,
          regionId: val.regionId
        })
      }
      this.$refs.addDialog.getNodeList()
      this.dialogFormVisible = true

      // console.log(this.editAreaList)
    },
    async addPoint(val) {
      // console.log(val)
      try {
        await addNodeListApi({
          name: val.name,
          addr: val.addr[0] + '-' + val.addrDetail,
          areaCode: val.addr[1],
          createUserId: this.$store.state.user.userId,
          regionId: val.regionName,
          businessId: val.businessTypeName,
          ownerId: val.ownerName.id,
          ownerName: val.ownerName.name
        })
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
        this.$message.error(error.response.data)
      }
      // console.log(res)
    },
    async editFn(val) {
      console.log(val)
      try {
        await editNodeDetailApi({
          id: val.id,
          name: val.name,
          addr: val.addr[0] + '-' + val.addrDetail,
          areaCode: val.addr[1],
          createUserId: this.$store.state.user.userId,
          regionId: val.regionName,
          businessId: val.businessTypeName,
          ownerId: val.ownerName.id,
          ownerName: val.ownerName.name
        })
        this.$message.success('编辑成功')
      } catch (error) {
        this.$message.error('编辑失败')
        this.$message.error(error.response.data)
      }
    },
    async handleClick(row) {
      await this.$refs.showDetail.showDetailContent(row)
      this.Visible = true
    },
    async deleteRow(row) {
      try {
        await delNodeDetailApi(row.id)
        this.getNodeSearch()
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
    }
  }
}
</script>

<style scoped></style>
