<template>
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
  >
    <!-- 表格部分 -->
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="型号名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="型号编码" prop="model">
        <el-input
          v-model="form.model"
          placeholder="请输入（限制数字、字母、中划线、下划线）"
        ></el-input>
      </el-form-item>
      <el-form-item label="货道行数" prop="vmRow">
        <el-input-number
          style="width: 100%"
          v-model="form.vmRow"
          controls-position="right"
          @change="handleChangevmRow"
          :min="1"
          placeholder="请输入"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道列数" prop="vmCol">
        <el-input-number
          style="width: 100%"
          v-model="form.vmCol"
          controls-position="right"
          @change="handleChangevmCol"
          :min="1"
          placeholder="请输入"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道容量" prop="channelMaxCapacity">
        <el-input-number
          style="width: 100%"
          v-model="form.channelMaxCapacity"
          controls-position="right"
          @change="handleChangechannelMaxCapacity"
          :min="1"
          placeholder="请输入"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="设备图片" prop="image">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="handleAvatarUpload"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image" :src="form.image" class="avatar" />
          <i v-else class="el-icon-upload avatar-uploader-icon"></i>
        </el-upload>
        <p style="color: #ccc">支持扩展名：jpg、png，文件不得大于100kb</p>
      </el-form-item>
    </el-form>

    <!-- 下方按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose" user="cancel" class="cancelBtn"
        >取 消</el-button
      >
      <el-button type="primary" @click="addVmType" user="sure"
        >确 认</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addVmType, editVmType, UploadImageAPI } from '@/api/equipment'
export default {
  data() {
    return {
      form: {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入型号名称', trigger: 'blur' }],
        model: [
          { required: true, message: '请输入型号编码', trigger: 'blur' },
          {
            patern: /^[a-zA-Z0-9_-]{1,15}$/,
            message: '型号编码格式错误',
            trigger: 'blur'
          }
        ],
        vmRow: [{ required: true, message: '请输入货道行数', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入货道列数', trigger: 'blur' }],
        channelMaxCapacity: [
          { required: true, message: '请输入货道容量', trigger: 'blur' }
        ],
        image: [[{ required: true, message: '请上传图片', trigger: 'blur' }]]
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? '修改设备类型' : '新增设备类型'
    }
  },
  beforeMount() {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },

    //编辑的当前行数据
    currentEditData: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isEdit: {
      immediate: true,
      handler() {
        if (this.isEdit) {
          this.form = this.currentEditData
        }
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      }
      this.$emit('changeisEdit')
    },
    async addVmType() {
      await this.$refs.form.validate()
      if (!this.isEdit) {
        await addVmType(this.form)
      } else {
        await editVmType(this.currentEditData.typeId, this.form)
      }
      this.$emit('addSuccess')
      this.onClose()
    },
    handleChangevmRow(val) {
      this.form.vmRow = val
      //   console.log(this.form.vmRow)
    },
    handleChangevmCol(val) {
      //   console.log(val)
      this.form.vmCol = val
    },
    handleChangechannelMaxCapacity(val) {
      //   console.log(val)
      this.form.channelMaxCapacity = val
    },

    async handleAvatarUpload(file) {
      const fm = new FormData()
      fm.append('fileName', file.file)
      const res = await UploadImageAPI(fm)
      this.form.image = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 < 100

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG和PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100Kb!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .cancelBtn {
    margin-right: 20px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 2px dashed #ccc;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
