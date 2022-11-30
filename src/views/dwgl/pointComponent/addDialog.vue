<template>
  <el-dialog
    :title="titleDialog"
    :visible="visible"
    width="41%"
    @close="onClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="点位名称:" :label-width="formLabelWidth" prop="name">
        <el-input
          v-model.trim="form.name"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="所在区域:"
        :label-width="formLabelWidth"
        prop="regionName"
      >
        <el-select v-model="form.regionName" placeholder="请选择">
          <el-option
            v-for="item in selectOption"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="所属商圈:"
        :label-width="formLabelWidth"
        prop="businessTypeName"
      >
        <el-select v-model="form.businessTypeName" placeholder="请选择">
          <el-option
            v-for="(item, index) in businessTypeNameList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="归属合作商:"
        :label-width="formLabelWidth"
        prop="ownerName"
      >
        <el-select v-model="form.ownerName" placeholder="请选择">
          <el-option
            v-for="item in ownerNameList"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="详细地址:"
        :label-width="formLabelWidth"
        prop="selectedOptions"
      >
        <div id="app">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </div>

        <!-- <el-option
            v-for="(item, index) in addrList"
            :key="index"
            :label="item"
            :value="item"
          ></el-option> -->
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" prop="addrDetail">
        <el-input
          type="textarea"
          v-model="form.addrDetail"
          autocomplete="off"
          placeholder="请输入详细地址"
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
import {
  getNodeSearchApi,
  getBusinessListApi,
  getPartnerListApi
} from '@/api/pointLocation'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  name: 'addDialog',
  data() {
    // const checkName = async (rule, value, callback) => {
    // let isRepect
    // console.log(this.editAreaList)
    //   const {
    //     data: { currentPageRecords }
    //   } = await getAreaListApi({
    //     pageSize: this.AreaList.totalCount
    //   })
    // const allAreaList = currentPageRecords
    // console.log(allAreaList)
    // if (this.editAreaList.id) {
    //   isRepect = allAreaList
    //     .filter((item) => item.name !== this.editAreaList.name)
    //     .some((item) => item.name === value)
    // } else {
    // isRepect = this.nameList.some((item) => item === value)
    // }
    // console.log(this.nameList)
    // console.log(value)
    // console.log(isRepect)
    // isRepect ? callback(new Error('区域名称重复')) : callback()
    // }
    return {
      form: {
        name: '',
        regionName: '',
        businessTypeName: '',
        ownerName: '',
        addr: '',
        addrDetail: '',
        id: ''
      },
      formLabelWidth: '140px',
      rules: {
        name: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
          // { validator: checkName, trigger: 'blur' }
        ],
        regionName: [
          { required: true, message: '请输入所在区域', trigger: 'blur' }
        ],
        businessTypeName: [
          { required: true, message: '请输入所属商圈', trigger: 'blur' }
        ],
        ownerName: [
          { required: true, message: '请输入归属合作商', trigger: 'blur' }
        ],
        addr: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        addrDetail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
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
      this.$refs.ruleForm.resetFields()
      this.form = {
        name: '',
        regionName: '',
        businessTypeName: '',
        ownerName: '',
        addr: '',
        addrDetail: '',
        id: ''
      }
    },
    async confirm() {
      await this.$refs.ruleForm.validate()
      if (this.form.id) {
        // console.log(this.form.id)
        if (parseFloat(this.form.regionName).toString() == 'NaN') {
          this.form.regionName = this.form.regionId
        }
        // console.log(this.form.regionName)
        if (parseFloat(this.form.businessTypeName).toString() == 'NaN') {
          // console.log('qqq')
          this.form.businessTypeName = this.form.businessType.id
        }
        // console.log(this.form.businessTypeName)
        if (parseFloat(this.form.ownerName).toString() == 'NaN') {
          this.form.ownerName = {
            id: this.form.ownerId,
            name: this.form.ownerName
          }
        }
        // console.log(this.form.ownerName)
        if (!isNaN(this.selectedOptions)) {
          const Arr = this.form.addr.split('-')
          this.form.addr = [
            Arr[0] + '-' + Arr[1] + '-' + Arr[2],
            this.form.areaCode
          ]
        }
        // console.log(this.form.addr)
        await this.$emit('edit', this.form)
      } else {
        // console.log(CodeToText[this.form.addr]);
        // console.log(this.form)
        await this.$emit('add', this.form)
        // await this.$refs.ruleForm.resetFields()
      }
      this.onClose()
      // console.log(res)
      // this.$emit('update:visible', false)
    },
    async getNodeList() {
      // console.log(this.AreaList)
      const { data } = await getNodeSearchApi({
        pageSize: this.AreaList.totalCount
      })
      const res = await getBusinessListApi()
      this.businessTypeNameList = res.data
      this.regionNameList = this.selectOption
      const Res = await getPartnerListApi({
        pageSize: 10000
      })
      // console.log(Res)
      this.ownerNameList = Res.data.currentPageRecords
      data.currentPageRecords.forEach((item) => {
        this.nameList.push(item.name)
      })
    },
    handleChange(value) {
      // console.log(value)
      let newAddr = ''
      for (let i = 0; i < value.length; i++) {
        newAddr += CodeToText[value[i]] + '-'
      }
      this.form.addr = [
        newAddr.substr(0, newAddr.length - 1),
        value[value.length - 1]
      ]
    },
    async showEditContent(id) {
      const { data } = await getNodeSearchApi(id)
      this.form = data.currentPageRecords[0]
      this.form.id = data.currentPageRecords[0].id
        ? data.currentPageRecords[0].id
        : ''
      this.form.name = data.currentPageRecords[0].name
        ? data.currentPageRecords[0].name
        : ''
      this.form.regionName = data.currentPageRecords[0].region.name
        ? data.currentPageRecords[0].region.name
        : ''
      this.form.businessTypeName = data.currentPageRecords[0].businessType.name
        ? data.currentPageRecords[0].businessType.name
        : ''
      this.form.ownerName = data.currentPageRecords[0].ownerName
        ? data.currentPageRecords[0].ownerName
        : ''
      if (data.currentPageRecords[0].addr) {
        const addrArr =
          data.currentPageRecords[0].addr.indexOf('/') === -1
            ? data.currentPageRecords[0].addr.split('-')
            : data.currentPageRecords[0].addr.split('/')
        console.log(addrArr)
        this.selectedOptions = TextToCode[addrArr[0]][addrArr[1]][addrArr[2]]
          .code
          ? TextToCode[addrArr[0]][addrArr[1]][addrArr[2]].code
          : ''
        this.form.addrDetail = addrArr[addrArr.length - 1]
      } else {
        const addrArr = ''
        this.selectedOptions = addrArr
        this.form.addrDetail = addrArr[addrArr.length - 1]
      }

      // console.log(addrArr)
      // console.log(addrArr)

      // console.log(this.selectedOptions)
      // {
      // //   name: '',
      // //   regionName: '',
      // //   businessTypeName: '',
      // //   ownerName: '',
      // //   addr: '',
      // //   addrDetail: ''
      // // } = data.currentPageRecords[0]
      // console.log(data)
    }
  }
}
</script>

<style scoped>
::v-deep .el-input__inner {
  width: 442px;
}
</style>
