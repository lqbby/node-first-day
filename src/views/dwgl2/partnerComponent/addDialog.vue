<template>
  <el-dialog
    :title="titleDialog"
    :visible="visible"
    width="41%"
    @close="onClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item
        label="合作商名称:"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="联系人:"
        :label-width="formLabelWidth"
        prop="contact"
      >
        <el-input
          v-model.trim="form.contact"
          autocomplete="off"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="联系电话:"
        :label-width="formLabelWidth"
        prop="mobile"
      >
        <el-input
          v-model.trim="form.mobile"
          autocomplete="off"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="分成比例(%):"
        :label-width="formLabelWidth"
        prop="ratio"
      >
        <el-input-number
          v-model.trim="form.ratio"
          autocomplete="off"
          controls-position="right"
          placeholder="请输入"
          :min="1"
          :max="10"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item
        label="账号:"
        :label-width="formLabelWidth"
        prop="account"
        v-if="!this.form.id"
      >
        <el-input
          v-model.trim="form.account"
          autocomplete="off"
          placeholder="请输入"
          maxlength="18"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码:"
        :label-width="formLabelWidth"
        prop="password"
        v-if="!this.form.id"
      >
        <el-input
          v-model.trim="form.password"
          autocomplete="off"
          placeholder="请输入"
          maxlength="20"
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
// import { addPartnerListApi } from '@/api/partner'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  name: 'addDialogPartnter',
  data() {
    return {
      form: {
        name: '',
        account: '',
        ratio: '',
        contact: '',
        mobile: '',
        password: '',
        id: ''
      },
      formLabelWidth: '140px',
      rules: {
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入分成比例', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        moblie: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      selectOption: [],
      regionNameList: [],
      businessTypeNameList: [],
      ownerNameList: [],
      addrList: [],
      options: regionData,
      selectedOptions: [],
      nameList: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    AreaList: {
      type: Object
    }
  },
  created() {},
  computed: {
    titleDialog() {
      return this.form.id ? '修改区域' : '新增区域'
    }
  },
  methods: {
    async onClose() {
      this.$emit('update:visible', false)
      // this.$refs.ruleForm.resetFields()
      this.form = {
        name: '',
        account: '',
        ratio: '',
        contact: '',
        moblie: '',
        password: '',
        id: ''
      }
    },
    async confirm() {
      // await this.$refs.ruleForm.validate()
      if (this.form.id) {
      // console.log(this.form.addr)
      await this.$emit('edit', this.form)
      } else {
      // console.log(CodeToText[this.form.addr]);
      console.log(this.form)
      await this.$emit('add', this.form)
      // await this.$refs.ruleForm.resetFields()
      }
      this.onClose()
      // console.log(res)
      // this.$emit('update:visible', false)
    },
    handleChange(value) {
      // console.log(value)
      // let newAddr = ''
      // for (let i = 0; i < value.length; i++) {
      //   newAddr += CodeToText[value[i]] + '-'
      // }
      // this.form.addr = [
      //   newAddr.substr(0, newAddr.length - 1),
      //   value[value.length - 1]
      // ]
    },
    async showEditContent(id) {
      const { data } = await getNodeSearchApi(id)
      this.form = data.currentPageRecords[0]
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
::v-deep .el-input__inner {
  width: 442px;
}
::v-deep .el-input-number {
  width: 442px;
}
</style>
