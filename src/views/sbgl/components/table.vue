<template>
  <div class="table">
    <el-card class="box-card">
      <el-row type="flex" class="btn-col" v-if="isTwoBtn">
        <el-col :span="2" class="btn1"
          ><el-button user="create" @click="$emit('showAddDialog', true)"
            >新建</el-button
          ></el-col
        >
        <el-col
          ><el-button user="cancel" v-if="!isOneBtn" @click="showBulkDialogFn"
            >批量操作</el-button
          ></el-col
        >
      </el-row>

      <!-- 表格部分 -->
      <div class="table-container">
        <el-table
          :data="currentPageRecords"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" v-if="isSelect"> </el-table-column>
          <el-table-column label="序号" type="index" :index="num" width="80">
          </el-table-column>

          <el-table-column
            :prop="item.value"
            :label="item.label"
            v-for="item in NavList"
            :key="item.taskCode"
            show-overflow-tooltip
            :min-width="item.label === '创建日期' ? 200 : 120"
          >
            <template slot-scope="scope">
              <img
                v-if="item.label === '设备图片'"
                :src="scope.row.image"
                alt=""
                style="width: 30px; height: 30px; border-radius: 50%"
              />
              <div v-else-if="item.label === '详细地址'">
                {{ scope.row.node.addr }}
              </div>
              <div v-else>{{ scope.row[item.value] }}</div>
            </template>
          </el-table-column>
          <el-table-column label="设备状态" min-width="200" v-if="needTag">
            <template slot-scope="scope">
              <el-tag
                effect="dark"
                :type="scope.row.status[10001] == false ? 'warning' : 'success'"
                disable-transitions
                >离线</el-tag
              >
              <el-tag
                style="margin: 0 10px"
                effect="dark"
                :type="scope.row.status[10002] == false ? 'warning' : 'success'"
                disable-transitions
                >货道</el-tag
              >
              <el-tag
                effect="dark"
                :type="scope.row.status[10003] == false ? 'warning' : 'success'"
                disable-transitions
                >传动轴</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200">
            <template slot-scope="scope">
              <slot :data="scope.row"></slot>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页部分 -->
      <el-pagination
        :hide-on-single-page="true"
        class="el-pagination-container"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="+pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="+totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      select: []
    }
  },
  props: {
    NavList: {
      type: Array, //表头数组
      required: true
    },
    isSelect: {
      //是否显示开头选择框
      type: Boolean,
      default: false
    },
    isOneBtn: {
      type: Boolean,
      default: false
    },
    isTwoBtn: {
      type: Boolean,
      default: true
    },
    needTag: {
      type: Boolean,
      default: false
    },
    currentPageRecords: {
      type: Array, //表格数据数组
      default: () => []
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: String,
      default: '0'
    },
    totalPage: {
      type: String,
      default: '0'
    }
  },

  created() {},
  watch: {
    currentPageRecords: {
      immediate: true,
      handler() {
        this.currentPageRecords.forEach((item) => {
          item.createType = item.createType === 0 ? '自动' : '手动'
          item.updateTime = item.updateTime?.replace('T', ' ')
          if (item.vmType === 1) {
            item.vmType = '饮料机'
          } else if (item.vmType === 2) {
            item.vmType = '综合机'
          } else if (item.vmType === 3) {
            item.vmType = '零食机'
          }
          if (item.vmStatus === 0) {
            item.vmStatus = '未投放'
          } else if (item.vmStatus === 1) {
            item.vmStatus = '运营'
          } else if (item.vmStatus === 3) {
            item.vmStatus = '撤机'
          }
        })
      }
    }
  },
  computed: {
    num() {
      return (this.pageIndex - 1) * this.pageSize + 1
    }
  },

  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('update:pageSize', val)
      this.$emit('changePage')
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.$emit('update:pageIndex', val)
      this.$emit('changePage')
    },
    handleSelectionChange(val) {
      this.$emit('getSelectList', val)
      this.select = val
    },
    showBulkDialogFn() {
      if (this.select.length <= 0) return this.$message.warning('请勾选售货机')
      this.$emit('showBulkDialog', true)
    }
  }
}
</script>

<style scoped lang="scss">
.btn-col {
  justify-content: start;
  margin: 20px;
  .btn1 {
    margin-right: 10px;
  }
}
.table-container {
  margin: 0 20px 20px;
}
.el-pagination-container {
  margin: 20px 20px 40px;
}
</style>
