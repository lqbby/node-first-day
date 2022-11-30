<template>
  <el-dialog
    :title="title"
    :visible="dialogFormVisible"
    :before-close="handleClose"
    width="41%"
  >
    <el-form ref="formData" :model="formData" :rules="formDataRules">
      <el-form-item
        label="人员名称："
        :label-width="formLabelWidth"
        prop="userName"
      >
        <el-input
          v-model="formData.userName"
          autocomplete="off"
          placeholder="请输入"
          style="width: 100%"
          maxlength="5"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="角色：" :label-width="formLabelWidth" prop="roleId">
        <el-select
          v-model="formData.roleId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in RoleClassification"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系电话："
        :label-width="formLabelWidth"
        prop="mobile"
      >
        <el-input
          v-model="formData.mobile"
          autocomplete="off"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="负责区域："
        :label-width="formLabelWidth"
        prop="regionId"
      >
        <el-select
          v-model="formData.regionId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.remark"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="头像："
        :label-width="formLabelWidth"
        class="img-info"
        prop="image"
      >
        <el-upload
          class="upload-demo"
          action=""
          :http-request="Coverhttprequest"
          :before-upload="beforeUploadImg"
          :show-file-list="false"
        >
          <div class="img-demo">
            <span v-if="!formData.image" class="svg-container">
              <svg-icon icon-class="sctp" />
            </span>
            <img
              v-else
              :src="formData.image"
              alt=""
              style="width: 100%; height: 100%"
            >
          </div>
          <div slot="tip" class="el-upload__tip upload-color">
            支持扩展名：jpg、png，文件不得大于100kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <template>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="formData.status">是否启用</el-checkbox>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="bi" @click="$emit('isOFFDialog')">取 消</el-button>
      <el-button
        type="primary"
        class="bn"
        @click="addPeronnel"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  PictureUploadApi,
  NewPersonnelApi,
  addPersonnelApi
} from '@/api/personnel'
export default {
  name: 'NewDailog',
  props: {
    // 弹层显隐
    dialogFormVisible: {
      type: Boolean,
      required: true
    },
    // 角色列表
    RoleClassification: {
      type: Array,
      required: true
    },
    // 城市列表
    areaList: {
      type: Array,
      required: true
    },
    // 所有人员信息
    currentPageRecords: {
      type: Array,
      required: true
    }
  },
  data() {
    // 自定义名称校验规则
    const checkName = (rule, value, callback) => {
      if (this.formData.id) {
        callback()
      } else {
        const isRepat = this.currentPageRecords.some(
          (item) => item.userName === value
        )
        isRepat ? callback(new Error('姓名重复')) : callback()
      }
    }
    // 自定义手机重复校验规则
    const checkMobile = (rule, value, callback) => {
      if (this.formData.id) {
        callback()
      } else {
        const isRepat = this.currentPageRecords.some(
          (item) => item.mobile === value
        )
        isRepat ? callback(new Error('手机号重复')) : callback()
      }
    }
    return {
      formData: {
        userName: '', // 人员名称
        roleId: '', // 角色id
        mobile: '', // 联系电话
        regionId: '', // 所属区域id
        regionName: '', // 所属区域名称
        status: false, // 是否启用
        image: '' // 头像
      },
      formDataRules: {
        userName: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        roleId: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'change'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        regionId: [{ required: true, message: '请输入', trigger: 'blur' }],
        image: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      formLabelWidth: '100px'
    }
  },

  computed: {
    regName() {
      let arr = []
      arr = this.areaList.filter((item) => item.id === this.formData.regionId)
      return arr
    },
    title() {
      return this.formData.id ? '编辑人员' : '新增人员'
    }
  },
  created() {},
  methods: {
    // 关闭弹层
    handleClose() {
      this.$emit('isOFFDialog')
    },
    // 上传头像
    async Coverhttprequest(file) {
      // console.log(file)
      const fm = new FormData()
      fm.append('fileName', file.file)
      // console.log(formData)
      const res = await PictureUploadApi(fm)
      this.formData.image = res.data
    },
    beforeUploadImg(file) {
      const isJPG = file.type === 'jpg' || 'png'
      const isLt2M = file.size / 100

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isJPG && isLt2M
    },
    // 新增人员
    async addPeronnel() {
      await this.$refs.formData.validate()
      if (this.formData.id) {
        // 修改状态
        await addPersonnelApi(this.formData.id, this.formData)
        this.$message.success('修改成功')
        this.formData = {}
        this.$emit('isOFFDialog')
        this.$emit('repeat')
      } else {
        // 新增状态
        this.formData.regionName = this.regName[0].name
        await NewPersonnelApi(this.formData)
        this.$emit('isOFFDialog')
        this.$message.success('新增人员成功')
        this.formData = {}
        this.$emit('repeat')
      }
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-dialog__body {
  height: 460px;
}
::v-deep .el-dialog__title {
  font-weight: 700;
  font-size: 16px;
  color: #606266;
}
::v-deep .el-form-item__label {
  font-size: 14px;
  font-weight: 400;
  color: #606266;
}
::v-deep .el-input__inner {
  height: 36px;
}
.img-info {
  height: 121px;
}
.upload-demo {
  .img-demo {
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    border-radius: 5px;
    background-color: #f3f6fb;
    border: 1px dashed #dfe3e8;
    .svg-container {
      color: #bac0cd;
    }
  }
  .upload-color {
    color: #bec3cf;
  }
}
.dialog-footer {
  margin-right: 200px;
  .el-button {
    margin: 0 20px;
  }
  .bi {
    background-color: #fbf4f0;
    border: 1px solid #fbf4f0;
  }
  .bn {
    background-color: #ff8236;
    border: 1px solid #ff8236;
  }
}
</style>
