<template>
  <div>
    <el-dialog :title="title" :visible.sync="isSwitch" :before-close="close">
      <el-form ref="deptForm" v-loading="loading" :model="userForm" label-width="120px" :rules="rules">
        <el-form-item label="人员名称" prop="userName" style="width:80%">
          <el-input v-model="userForm.userName" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="userForm.roleId" placeholder="请选择" style="width:75%" @focus="getRoleList">
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile" style="width:80%">
          <el-input v-model="userForm.mobile" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="负责区域" prop="regionId">
          <el-select v-model="userForm.regionId" placeholder="请选择" style="width:75%" @focus="getCityList">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="image">
          <el-upload
            v-model="userForm.image"
            class="avatar-uploader"
            name="fileName"
            action="http://localhost:9528/api/vm-service/sku/fileUpload"
            :show-file-list="false"
            :on-success="success"
            :before-upload="upload"
          >
            <img v-if="userForm.image" :src="userForm.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="状态">
          <el-checkbox v-model="userForm.status">是否启用</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleListAPI, getCityListAPI, addRoleAPI, upRoleAPI } from '@/api/personnel'
export default {
  name: 'NewlyBuild',
  props: {
    isSwitch: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      userForm: {
        userName: '',
        roleId: null,
        mobile: '',
        regionId: '',
        image: '',
        status: false
      },
      rules: {
        userName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请输入' }
        ],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        regionId: [
          { required: true, message: '请输入' }
        ],
        image: [
          { required: true, message: '请上传', trigger: 'blur' }
        ]
      },
      roleList: [],
      cityList: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.userForm.id ? '编辑人员' : '新增人员'
    }
  },
  methods: {
    success(res, file) {
      this.userForm.image = URL.createObjectURL(file.raw)
    },
    upload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    close() {
      this.$emit('close')
      this.$refs.deptForm.resetFields()
      this.userForm = {
        userName: '',
        roleId: null,
        mobile: '',
        regionId: '',
        image: '',
        status: false
      }
    },
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleListAPI()
      // console.log(res)
      this.roleList = res.data
      // console.log(this.roleList)
    },
    // 获取区域列表
    async getCityList() {
      const res = await getCityListAPI()
      // console.log(res)
      this.cityList = res.data.currentPageRecords
      console.log(this.cityList)
    },
    // 新增
    async submit() {
      try {
        await this.$refs.deptForm.validate()
        this.loading = true
        this.userForm.id ? await upRoleAPI(this.userForm) : await addRoleAPI(this.userForm)
        this.close()
        this.$message.success(`${this.userForm.id ? '编辑' : '新增'}成功`)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #f3f6fb;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
