<template>
  <el-card class="box-card">
    <div class="search">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="formInline"
      >
        <el-form-item :label="firstItem">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          <i
            class="el-icon-circle-close"
            v-if="formInline.user"
            @click="formInline.user = ''"
          ></i>
        </el-form-item>
        <el-form-item :label="secondItem" v-if="isSelect">
          <el-select v-model="formInline.region" placeholder="请选择">
            <div>
              <el-option
                v-for="item in selectOption"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </div>
          </el-select>
          <i
            class="el-icon-circle-close"
            v-if="formInline.user"
            @click="formInline.user = ''"
          ></i>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">
            <i class="el-icon-search"></i>
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      firstItem: this.searchItem.firstItem,
      secondItem: this.searchItem.secondItem || '',
      isSelect: this.searchItem.isSelect,
      selectOption: this.searchItem.selectOption,
      formInline: this.searchItem.formInline
    }
  },
  computed: {
    isShow() {
      this.selectOption.some((item) => this.formInline.region === item.value)
    }
  },
  props: {
    searchItem: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    search() {
      // console.log(this.formInline)
      this.$emit('searchForm', this.formInline)
      this.$refs.formInline.resetFields()
    },
    onSubmit() {
      console.log('submit!')
    },

  }
}
</script>

<style scoped lang="scss">
.box-card {
  position: relative;
  margin: 20px 0;
  background-color: #fff;
  height: 64px;
  ::v-deep.el-card__body {
    padding: 12px 20px !important;
  }
  .search {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    background-color: #fff;
    .el-form-item__label {
      font-weight: 300 !important ;
      text-align: right;
      vertical-align: middle;
      font-size: 14px;
      color: #606266;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    ::v-deep.el-input__inner {
      height: 36px;
      line-height: 36px;
      width: 205px;
    }
    i {
      position: absolute;
      left: 188px;
      top: 14px;
    }
    .iconfont {
      font-size: 18px;
      margin: 5px;
    }
    ::v-deep label {
      font-weight: 400 !important ;
    }
  }
}
</style>
