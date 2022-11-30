<template>
  <el-dialog
    :title="titleDialog"
    :visible="visible"
    width="41%"
    @close="onClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="设备编号:" :label-width="formLabelWidth" prop="innerCode">
        <el-input
          v-model="form.innerCode"
          autocomplete="off"
          placeholder="请输入"
          maxlength="12"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型:" :label-width="formLabelWidth" prop="taskType">
        <el-select v-model="form.taskType" placeholder="请选择">
          <el-option
            v-for="item in selectOption"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运维人员:" :label-width="formLabelWidth" prop="userName">
        <el-select v-model="form.userName" placeholder="请选择">
          <el-option
            v-for="item in selectUser"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
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
import { getTaskTypeApi, getServiceUserApi } from '@/api/operations'
export default {
  name: 'dialog',
  data() {
    return {
      form: {
        innerCode: '',
        taskType: '',
        userName: '',
        remark: ''
      },
      formLabelWidth: '140px',
      rules: {
        innerCode: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        //   { min: 12, max: 12, message: '长度在12个字符', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '请输入区域名称', trigger: 'blur' }]
      },
      selectOption: [],
      selectUser: []
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
      //   this.$refs.ruleForm.resetFields()
      //   this.form = {
      //     name: '',
      //     remark: ''
      //   }
    },
    async confirm() {
      await this.$refs.ruleForm.validate()
    //   console.log(this.form)
      await this.$emit('add', this.form)
    //   await this.$refs.ruleForm.resetFields()

      this.onClose()
      // console.log(res)
      // this.$emit('update:visible', false)
    },
    async showEditContent() {
      // console.log(id)
      const { data } = await getTaskTypeApi({
        alertValue: 50
      })
      this.selectOption = data
      this.selectOption = this.selectOption.filter((item) => item.typeId !== 2)
      const res = await getServiceUserApi({
        isRepair: true
      })
      console.log(res)
      this.selectUser = res.data.currentPageRecords
      // this.form.remark = data.remark
      // console.log(this.form)
    }
  },
  computed: {
    titleDialog() {
      return this.form.id ? '修改区域' : '新增工单'
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
