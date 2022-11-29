<template>
  <div>
    <div class="top">
      <el-form style="display:flex; align-items: center;" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="策略搜索:">
          <el-input v-model="formInline.policyName" placeholder="请输入"></el-input>
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
          prop="policyName"
          label="策略名称">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="策略方案">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期">
          <template v-slot="{row}">
            {{row.createTime.replace('T',' ')}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          >
          <template v-slot="{row}">
            <el-button
              @click="detailed(row)"
              type="text"
              size="small">
              查看详细
            </el-button>
            <el-button
              @click="putpolicy(row)"
              type="text"
              size="small">
              修改
            </el-button>
            <el-button
              @click="delpolicy(row)"
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
      :title="policyId?'编辑策略':'新增策略'"
      :visible.sync="centerDialogVisible"
      :before-close="beforeClose"
      width="45%"
      >
      <el-form :model="shoopForm" :rules="rules" ref="shoopForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="策略名称："
          prop="policyName"
          label-width="140px"
          style="margin-bottom:20px"
        >
          <el-input v-model="shoopForm.policyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="策略方案："
          prop="discount"
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
            type="text" v-model.number="shoopForm.discount">
            <div 
            style="
            display:flex;
            flex-direction: column;
            "
            >
              <button
              class="butt"
              @click="upprice(1)"
              ><i class="el-icon-arrow-up"></i></button>
              <button
              class="butt"
              @click="upprice(-1)"
              ><i class="el-icon-arrow-down"></i></button>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <el-dialog
      title="策略详细"
      :visible.sync="detailedVisible"
      width="40%">
      <p>策略名称：{{vm.policyName}}</p>
      <div><span>策略方案：</span>
        <el-table
        :data="vmList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="nodeName"
          label="点位名称">
        </el-table-column>
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="150"
          >
        </el-table-column>
      </el-table>
        <div style="padding:32px 16px;">
        <div style="display:flex;justify-content: space-between;">
          <span style="color: #dbdfe5">共{{vm.totalCount}}条记录  第 {{vm.pageIndex}}/{{vm.totalPage}} 页</span>
          <div>
            <el-button 
            @click="Seachvm(-1)"
            type="primary"
            :class="vm.pageIndex == 1 ? 'active' : ''"
            style="background-color:#d5ddf8;color:#333;border:0;">
              上一页
            </el-button>
            <el-button 
            @click="Seachvm(1)"
            :class="vm.pageIndex == vm.totalPage ? 'active' : ''"
            type="primary"
            style="background-color:#d5ddf8;color:#333;border:0;">
              下一页
            </el-button>
          </div>
        </div>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getpolicylist,delpolicy,postpolicy,putpolicy,getvmList } from '@/api/policy' 
export default {
  data(){
    return{
      detailedVisible:false,
      vmList:[],
      vm:{
        policyName:'',
        totalPage:0,
        totalCount:0,
        pageIndex:0,
      },
      shoopForm:{
        policyName:'',
        discount:''
      },
      policyId:0,
      list:[],
      formInline:{
        policyName:'',
        pageSize:10,
        pageIndex:1,
      },
      rules:{
        policyName:[
          {required:true,message: '请输入策略名称'}
        ],
        discount:[
          {required:true,message: '请输入策略方案'}
        ]
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
      if(typeof num === 'number'){
        if(+this.formInline.pageIndex + num < 1 || +this.formInline.pageIndex + num > this.totalPage) return
        this.formInline.pageIndex = +this.formInline.pageIndex + num
      }
      const {data} = await getpolicylist(this.formInline)
      console.log(data);
      this.list = data.currentPageRecords
      this.formInline.pageIndex = data.pageIndex
      this.totalPage = data.totalPage
      this.totalCount =data.totalCount
    },
    async Seachvm(num){
      if(typeof num === 'number'){
        if(+this.vm.pageIndex + num < 1 || +this.vm.pageIndex + num > this.vm.totalPage) return
        this.vm.pageIndex = +this.vm.pageIndex + num
      }
      const {data} = await getvmList({pageSize:this.formInline.pageSize,pageIndex:this.vm.pageIndex},this.policyId)
      this.vmList = data.currentPageRecords
      this.vm.totalPage = data.totalPage
      this.vm.totalCount = data.totalCount
      this.vm.pageIndex = data.pageIndex
    },
    async submit(){
     try{
       await this.$refs.shoopForm.validate()
       if(this.policyId){
          await putpolicy(this.shoopForm,this.policyId)
          this.$message.success('编辑成功了')
          this.policyId = 0
       }else{
          if(this.list.some(item => item.policyName === this.shoopForm.policyName)){
            return this.$message.error('已有此策略')
          }
          await postpolicy(this.shoopForm)
          this.$message.success('添加成功了')
        }
        this.Seach()
        this.beforeClose()
      }catch(err){
          console.log(err);
      }
    },
    async putpolicy(id){
      this.centerDialogVisible = true
      this.shoopForm.policyName = id.policyName
      this.shoopForm.discount = id.discount
      this.policyId = id.policyId
    },
    async delpolicy(id){
      console.log(id);
          this.$confirm('你确认要删除此策略吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async() => {
          this.formInline.policyName = id.policyName
          await delpolicy(this.formInline,id.policyId)
          this.formInline.policyName = ''
          this.Seach()
          this.$message({
            type: 'success',
            message: '删除成功!',
            center: true
          });
        }).catch(() => { 
          this.formInline.policyName = ''
        });
    },
    beforeClose(){
      this.$refs.shoopForm.resetFields()
      this.centerDialogVisible = false
    },
    upprice(num){
      if(typeof this.shoopForm.discount !== 'number'){
        this.shoopForm.discount = 0
      }
      if(this.shoopForm.discount + num >= 0) this.shoopForm.discount += num
      this.shoopForm.discount = +this.shoopForm.discount.toFixed(2)
    },
    detailed(row){
      this.detailedVisible = true
      this.vm.policyName = row.policyName
      this.policyId = row.policyId
      this.Seachvm()
    }
  }
}
</script>

<style lang="scss" scoped>
  .butt{
    border-radius: 0 4px 0 0;
    border: 0;
    border-bottom: 1px solid #d8dde3;
  }
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