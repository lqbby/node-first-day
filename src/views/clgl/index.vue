<template>
  <div>
    <div class="top">
      <el-form style="display:flex; align-items: center;" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="策略搜索:">
          <el-input v-model="formInline.className" placeholder="请输入"></el-input>
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
          prop="className"
          label="策略名称">
        </el-table-column>
        <el-table-column
          prop="className"
          label="策略方案">
        </el-table-column>
        <el-table-column
          prop="className"
          label="创建日期">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          >
          <template v-slot="{row}">
            <el-button
              @click="putshoop(row)"
              type="text"
              size="small">
              修改
            </el-button>
            <el-button
              @click="delshoop(row)"
              type="text"
              size="small"
              style="color:red"
              >
              删除
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
    <el-dialog
      :title="classId?'编辑商品类型':'新增商品类型'"
      :visible.sync="centerDialogVisible"
      :before-close="beforeClose"
      width="45%"
      >
      <el-form :model="shoopForm" ref="shoopForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="商品类型名称："
          prop="className"
          label-width="120px"
          :rules="[
            { required: true, message: '请输入',triggler:'blur'}
          ]"
        >
          <el-input v-model="shoopForm.className" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { shoopSearch,postshoop,putshoop,delshoop } from '@/api/shoop' 
export default {
  data(){
    return{
      shoopForm:{
        className:'',
      },
      classId:0,
      list:[],
      formInline:{
        className:'',
        pageSize:10,
        pageIndex:1,
      },
      totalPage:0,//全部页面
      totalCount:0,//全部数据
      centerDialogVisible:false
    }
  },
  created(){
    this.Seach()
  },
  methods:{
    async Seach(num){
      // if(typeof num === 'number'){
      //   if(+this.formInline.pageIndex + num < 1 || +this.formInline.pageIndex + num > this.totalPage) return
      //   this.formInline.pageIndex = +this.formInline.pageIndex + num
      // }
      // const {data} = await shoopSearch(this.formInline)
      // this.list = data.currentPageRecords
      // this.formInline.pageIndex = data.pageIndex
      // this.totalPage = data.totalPage
      // this.totalCount =data.totalCount
    },
    async submit(){
    //  try{
    //    await this.$refs.shoopForm.validate()
    //    if(this.classId){
    //       await putshoop({...this.shoopForm,classId:this.classId})
    //       this.$message.success('编辑成功了')
    //       this.classId = 0
    //    }else{
    //       if(this.list.some(item => item.className === this.shoopForm.className)){
    //         return this.$message.error('已有此类型商品')
    //       }
    //       await postshoop(this.shoopForm)
    //       this.$message.success('添加成功了')
    //     }
    //     this.Seach()
    //     this.beforeClose()
    //   }catch(err){
    //       console.log(err);
    //   }
    },
    async putshoop(id){
      // this.centerDialogVisible = true
      // this.shoopForm.className = id.className
      // this.classId = id.classId
    },
    async delshoop(id){
        //   this.$confirm('你确认要删除此类型吗?', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        // }).then(async() => {
        //   await delshoop(id.classId)
        //   this.Seach()
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!',
        //     center: true
        //   });
        // }).catch(() => { 
        // });
    },
    beforeClose(){
      // this.$refs.shoopForm.resetFields()
      // this.centerDialogVisible = false
    }
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
  }
  .el-form-item{
    margin:0 10px 0 0;
  }
  .form{
    background-color: #fff;
    ::v-deep .el-dialog__footer{
      display: flex;
      justify-content: center;
    }
  }
</style>