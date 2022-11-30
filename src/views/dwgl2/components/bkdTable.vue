<template>
  <div class="table">
    <el-card class="box-card" shadow="never">
      <el-row type="flex" class="btn-col">
        <el-col :span="2" class="btn1"
          ><el-button user="create" v-if="isShowNew" @click="$emit('add')"
            >新建</el-button
          ></el-col
        >
        <el-col
          ><el-button user="cancel" v-if="isShow">工单配置</el-button></el-col
        >
      </el-row>

      <!-- 表格部分 -->
      <div class="table-container">
        <el-table :data="currentPageRecords" style="width: 100%">
          <el-table-column label="序号" type="index" :index="num" width="80">
          </el-table-column>

          <el-table-column
            :prop="item.value"
            :label="item.label"
            v-for="(item, index) in NavList"
            :key="index"
            :min-width="item.label === '创建日期' ? 200 : 120"
          >
          </el-table-column>
          <!-- <el-table-column label="操作" min-width="200"> -->
          <!-- <template> -->
          <slot></slot>
          <!-- </template> -->
          <!-- </el-table-column> -->
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
    return {}
  },
  props: {
    NavList: {
      type: Array, //表头数组
      required: true
    },
    isShowNew: {
      type: Boolean, //新建按钮
      default: true
    },
    isShow: {
      type: Boolean, //工单配置按钮
      default: true
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

  updated() {
    // console.log(this.TaskSearch)
  },
  watch: {
    currentPageRecords: {
      immediate: true,
      handler() {
        this.currentPageRecords.forEach((item) => {
          item.createType = item.createType === 0 ? '自动' : '手动'
          item.updateTime = item.updateTime?.replace('T', ' ')
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
    handleClick(row) {
      console.log(row)
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
