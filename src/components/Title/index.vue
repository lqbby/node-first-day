<template>
  <el-form class="gzOne">
    <el-form-item class="test1">
      <span>工单编号:</span
      ><el-input v-model="input" class="input" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <span>工单状态:</span>
      <el-select v-model="value" class="pask" filterable placeholder="请选择">
        <el-option
          v-for="item in newList"
          :key="item.statusId"
          :label="item.statusName"
          :value="item.statusId"
        />
      </el-select>
      <el-button class="el-icon-search btn" size="small" @click="btn"
        >查询</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Title',
  data() {
    return {
      input: '',
      value: '',
    }
  },

  created() {},

  methods: {
    async btn() {
      await this.$store.dispatch('biaodan/getBh', this.input)
      await this.$store.dispatch('biaodan/getZt', this.value)
      // console.log(123);
      this.$emit('btn')
    },
  },
  props: {
    newList: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.gzOne {
  display: flex;
  .test1 {
    .input {
      width: 100px;
      margin-right: 15px;
      margin-left: 10px;
    }
  }
  .pask {
    margin-left: 15px;
  }
  .btn {
    height: 40px;
    margin-left: 15px;
    background-color: #5f84ff;
    color: #fff;
  }
}
</style>
