<template>
  <div>
    <div class="top">
      <el-form style="display:flex; align-items: center;" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品搜索:">
          <el-input v-model="formInline.skuName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="Seach">
            <i class="el-icon-search"></i>
            查询
            </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form" style="padding: 20px 15px 19px 17px;">
        <div style="margin-bottom: 20px;">
          <el-button
          @click="centerDialogVisible = true"
          style="background-color:#ff8337;color:#fff;">
            <i style="font-size:17px;" class="el-icon-circle-plus-outline"></i>
            新建
          </el-button>
          <el-button
          @click="importdialog = true"
          style="background-color:#fbf4f0;color:#333;">
            导入数据
          </el-button>
        </div>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="skuName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="skuImage"
          label="商品图片">
          <template v-slot='{row}'>
              <el-avatar :src="row.skuImage"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格">
          <template v-slot="{row}">
            {{ row.price/100 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="商品类型">
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="160"
          label="创建时间">
          <template v-slot="{row}">
            {{ row.createTime.replace('T',' ') }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          >
          <template v-slot="{row}">
            <el-button
              @click="putshoop(row)"
              type="text"
              size="small">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding:32px 16px;">
        <div style="display:flex;justify-content: space-between;">
          <span style="color: #dbdfe5">共{{totalCount}}条记录  第 {{formInline.pageIndex}}/{{totalPage}} 页</span>
          <div>
            <el-button 
            @click="Seach(-1)"
            type="primary"
            :class="formInline.pageIndex == 1 ? 'active' : ''"
            style="background-color:#d5ddf8;color:#333;border:0;">
              上一页
            </el-button>
            <el-button 
            @click="Seach(1)"
            :class="formInline.pageIndex == totalPage ? 'active' : ''"
            type="primary"
            style="background-color:#d5ddf8;color:#333;border:0;">
              下一页
            </el-button>
          </div>
        </div>
      </div>
      <!-- 新建和修改 -->
    <el-dialog
      :title="skuId?'编辑商品':'新增商品'"
      :visible.sync="centerDialogVisible"
      :before-close="beforeClose"
      width="45%"
      >
      <el-form 
      :model="shoopForm"
      :rules="rules"
      ref="shoopForm" 
      label-width="100px" 
      class="demo-ruleForm">
        <el-form-item
          label="商品名称："
          prop="skuName"
          label-width="140px"
        >
          <el-input v-model="shoopForm.skuName" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌："
          prop="brandName"
          label-width="140px"
        >
          <el-input v-model="shoopForm.brandName" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格（元）："
          prop="price"
          label-width="140px"
        >
          <div style="display:flex">
            <input  
            placeholder="请输入"
            style="
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            border-right:0;
            height:40px;
            width:100%;
            text-align:center;
            color:#c0c4cc;
            "
            type="text" v-model.number="shoopForm.price">
            <div 
            style="
            display:flex;
            flex-direction: column;
            "
            >
              <button
              class="butt"
              @click="upprice(0.5)"
              ><i class="el-icon-arrow-up"></i></button>
              <button
              class="butt"
              @click="upprice(-0.5)"
              ><i class="el-icon-arrow-down"></i></button>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="商品类型："
          prop="classId"
          label-width="140px"
        >
            <el-select 
            style="width:100%;"
            @focus="classshoop" v-model="shoopForm.classId" placeholder="请选择">
              <el-option v-for="item in classlist" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item
          label="规格："
          prop="unit"
          label-width="140px"
        >
          <el-input placeholder="请输入" v-model="shoopForm.unit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品图片："
          prop="skuImage"
          label-width="140px"
        >
          <el-upload
            class="avatar-uploader"
            action="https://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="fileName"
          >
            <img
              v-if="shoopForm.skuImage"
              :src="shoopForm.skuImage"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <!-- 数据导入对话框 -->
    <el-dialog
      title="数据导入"
      :visible.sync="importdialog"
      width="30%"
      >
      <el-upload
        ref="upload"
        name="fileName"
        accept=".xls,.xlsx"
        class="upload-demo"
        action="https://likede2-admin.itheima.net/likede/api/vm-service/sku/upload"
        :on-preview="handlePreview"
        :on-change="handleChange"
        :file-list="fileList"
        :headers="headers"
        :auto-upload="false"
        style="display:flex;flex-direction: column;align-items: center;"
        >
        <el-button size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名：xls、xlsx</div>
      </el-upload>
      <span slot="footer" class="dialog-footer" style="display:flex;justify-content: center;">
        <el-button @click="importdialog = false">取 消</el-button>
        <el-button type="primary" @click.prevent="submitprimary">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setToken1,setToken2,setToken3,removeToken } from '@/utils/auth'
import { shoopSearch } from '@/api/shoop' 
import { getshooplist,postshoop,putshoop } from '@/api/shoop/shooplist' 
export default {
  data(){
    return{
      fileList:[],
      headers: {
        Authorization: this.$store.getters.token,
        Accept: 'application/json, text/plain',
      },
      importdialog:false,
      classlist:[],
      shoopForm:{
        skuName:'',
        skuImage:'',
        price:'',
        classId:'',
        unit:'',
        brandName:'',
      },
      rules:{
        skuName:[
          {required:true,message: '请输入商品名称'}
        ],
        skuImage:[
          {required:true,message: '请上传商品图片'}
        ],
        price:[
          {required:true,message: '请输入商品价格'}
        ],
        classId:[
          {required:true,message: '请输入商品类型'}
        ],
        unit:[
          {required:true,message: '请输入商品规格'}
        ],
        brandName:[
          {required:true,message: '请输入品牌'}
        ]
      },
      skuId:0,
      list:[],
      formInline:{
        skuName:'',
        classId:'',
        pageSize:10,
        pageIndex:1,
      },
      totalPage:0,//全部页面
      totalCount:0,//全部数据
      centerDialogVisible:false,

    }
  },
  created(){
    removeToken()
    setToken1(this.$store.getters.token)
    setToken2(this.$store.state.user.userInfo.userId)
    setToken3(this.$store.state.user.uname)
    this.Seach()
  },
  methods:{
    async Seach(num){
      if(typeof num === 'number'){
        if(+this.formInline.pageIndex + num < 1 || +this.formInline.pageIndex + num > this.totalPage) return
        this.formInline.pageIndex = +this.formInline.pageIndex + num
      }
      const {data} = await getshooplist(this.formInline)
      console.log(data);
      this.list = data.currentPageRecords
      this.formInline.pageIndex = data.pageIndex
      this.totalPage = data.totalPage
      this.totalCount =data.totalCount
    },
    async submit(){
     try{
       await this.$refs.shoopForm.validate()
       if(this.skuId){
         await putshoop({...this.shoopForm,skuId:this.skuId})
          this.$message.success('编辑成功了')
       }else{
          this.shoopForm.price = this.shoopForm.price * 100
          await postshoop(this.shoopForm)
          this.$message.success('添加成功了')
        }
        this.Seach()
        this.beforeClose()
      }catch(err){
        console.log(err);
      }
    },
    async putshoop(id){
      this.centerDialogVisible = true
      this.shoopForm.skuName = id.skuName
      this.shoopForm.skuImage = id.skuImage
      this.shoopForm.price = id.price/100
      this.shoopForm.classId = id.classId
      this.shoopForm.unit = id.unit
      this.shoopForm.brandName = id.brandName
      this.skuId = id.skuId
    },
    beforeClose(){
      this.shoopForm = {
        skuName:'',
        skuImage:'',
        price:'',
        classId:'',
        unit:'',
        brandName:'',
      }
      this.$refs.shoopForm.resetFields()
      this.skuId = 0
      this.centerDialogVisible  = false
    },
    upprice(num){
      console.log(num);
      if(!this.shoopForm.price){
        this.shoopForm.price = 0.01
      }
      if(this.shoopForm.price + num > 0) this.shoopForm.price += num
      this.shoopForm.price = +this.shoopForm.price.toFixed(2)
    },
    async classshoop(){
      const {data:{currentPageRecords}} = await shoopSearch()
      this.classlist = currentPageRecords
    },
        // 图片上传
    handleAvatarSuccess (res,file) {
      this.shoopForm.skuImage = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isJPG && isLt2M
    },
    // 文件上传
    submitprimary() {
      this.$refs.upload.submit();
        this.importdialog = false
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(){
        this.fileList = fileList.slice(-1);
      },
  }
}
</script>

<style lang="scss" scoped>
  .active{
    background: #edf0f9 !important;
    color: #d8dde3 !important;
  }
  .top{
    height: 64px;
    margin-top:20px;
    margin-bottom:20px;
    padding-left:17px;
    display: flex;
    background-color: #fff;
    ::v-deep .el-dialog__body{
      padding-top:0 !important;
    }
  }
  .el-form-item{
    margin:20px 10px 0 0;
  }
  .form{
    background-color: #fff;
    ::v-deep .el-dialog__footer{
      display: flex;
      justify-content: center;
    }
  }
  .butt{
    border-radius: 0 4px 0 0;
    border: 0;
    border-bottom: 1px solid #d8dde3;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #111;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #111;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 76px;
    height: 76px;
    line-height: 76px;
    text-align: center;
  }
  .avatar {
    width: 76px;
    height: 76px;
    display: block;
  }
</style>