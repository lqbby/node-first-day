<template>
  <el-dialog
    :title="titleDialog"
    :visible="visible"
    width="41%"
    @close="onClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="区域名称:" :label-width="formLabelWidth" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="备注说明:"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-input
          type="textarea"
          v-model="form.remark"
          autocomplete="off"
          placeholder="请输入备注(不超过40字)"
          maxlength="40"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAreaDetailApi, getAreaListApi } from '@/api/points'
export default {
  data() {
    const checkName = async (rule, value, callback) => {
      let isRepect
      // console.log(this.editAreaList)
      const {
        data: { currentPageRecords }
      } = await getAreaListApi({
        pageSize: this.AreaList.totalCount
      })
      const allAreaList = currentPageRecords
      // console.log(allAreaList)
      if (this.editAreaList.id) {
        isRepect = allAreaList
          .filter((item) => item.name !== this.editAreaList.name)
          .some((item) => item.name === value)
      } else {
        isRepect = allAreaList.some((item) => item.name === value)
      }
      // console.log(isRepect)
      isRepect ? callback(new Error('区域名称重复')) : callback()
    }
    return {
      //   dialogFormVisible: true,
      form: {
        name: '',
        remark: ''
      },
      formLabelWidth: '140px',
      rules: {
        name: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        remark: [{ required: true, message: '请输入备注说明', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    AreaList: {
      type: Object
    },
    editAreaList: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  methods: {
    async onClose() {
      this.$emit('update:visible', false)
      this.$refs.ruleForm.resetFields()
      this.form = {
        name: '',
        remark: ''
      }
    },
    async confirm() {
      await this.$refs.ruleForm.validate()
      if (this.editAreaList.id) {
        this.$emit('edit', this.form)
      } else {
        await this.$emit('add', this.form)
        await this.$refs.ruleForm.resetFields()
      }
      this.onClose()
      // console.log(res)
      // this.$emit('update:visible', false)
    },
    async showEditContent(id) {
      // console.log(id)
      const { data } = await getAreaDetailApi(id)
      this.form = data
      // this.form.remark = data.remark
      // console.log(this.form)
    }
  },
  computed: {
    titleDialog() {
      return this.form.id ? '修改区域' : '新增区域'
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  border-radius: 10px;
  .el-dialog__header .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    .el-form-item__label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
      font-weight: normal;
    }
    .el-input {
      width: 396px;
    }
    .el-textarea {
      width: 396px;
    }
    .el-textarea__inner {
      height: 80px;
    }
  }
}
</style>
