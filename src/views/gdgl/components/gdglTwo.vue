<template>
  <div class="app">
    <Title :newList="newList" class="title" @btn="btn" />
    <Buttom class="btn" />
    <div>
      <el-table :data="list" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="taskCode" label="工单编号"> </el-table-column>
        <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
        <el-table-column prop="taskType.typeName" label="工单类型">
        </el-table-column>
        <el-table-column
          prop="createType"
          label="工单方式"
          :formatter="tacked"
        />
        <el-table-column prop="taskStatus" label="工单状态" :formatter="pask">
        </el-table-column>
        <el-table-column prop="userName" label="运营人员"> </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
          <template v-slot="{ row }">
            {{ row.createTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="clickFn(row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" align="middle" style="heigth: 60px">
      <el-pagination
        :current-page="page.pageIndex"
        :page-size="page.pageSize"
        :total="page.totalCount"
        layout="prev,pager,next"
        @current-change="changePage"
      />
    </el-row>

    
  </div>
</template>

<script>
import Title from '@/components/Title'
import Buttom from '@/components/Buttom'
import { getList, getGDList } from '@/api/table'
import descar from '@/components/Descar'
export default {
  components: {
    Title,
    Buttom,
    descar,
  },
  data() {
    return {
      newList: [], //状态列表
      list: [], //列表
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
      loading: false,
      fand: {},
      isShow: false,
    }
  },

  created() {
    this.getList()
    this.getGDList()
  },

  methods: {
    // 获取状态列表
    async getList() {
      const { data } = await getList()
      // console.log(data)
      this.newList = data
      // console.log(this.newList)
    },
    //获取数据
    async getGDList() {
      this.loading = true
      const { data } = await getGDList(this.page)
      // console.log(data)
      this.list = data.currentPageRecords
      this.page.totalCount = parseInt(data.totalCount)
      // console.log(this.list)
      this.loading = false
    },
    changePage(newPage) {
      this.page.pageIndex = newPage
      this.getGDList()
    },
    //查询
    async btn() {
      const { data } = await getGDList({
        taskCode: this.$store.state.biaodan.bh,
        status: this.$store.state.biaodan.zt,
      })
      this.list = data.currentPageRecords
    },
    clickFn(id) {
      this.fand = id
      this.isShow=true
    },

    //格式化
    tacked(row, column, cellValue) {
      if (cellValue == 0) {
        return '自动'
      } else if (cellValue == 1) {
        return '手动'
      }
    },
    pask(row, column, cellValue) {
      if (cellValue == 3) {
        return '取消'
      } else if (cellValue == 4) {
        return '完成'
      }
    },
  },
}
</script>

<style scoped lang="less">
.app {
  .title {
    margin-top: 30px;
    margin-left: 30px;
  }
  .btn {
    margin-left: 30px;
    margin-top: 10px;
  }
}
</style>
