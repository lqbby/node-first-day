<template>
  <div class="app">
    <el-form class="bigge">
      <el-form-item>
        <span>订单编号：</span
        ><el-input
          v-model="page.orderNo"
          class="inputss"
          placeholder="请输入订单编号"
        />
      </el-form-item>
      <el-form-item class="test">
        <span>选择日期：</span
        ><el-date-picker
          value-format="yyyy-MM-dd"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-button icon="el-icon-search" class="btn" @click="getDD"
        >查询</el-button
      >
    </el-form>
    <el-table :data="list" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="orderNo" label="订单编号" />
      <el-table-column prop="skuName" label="商品名称" />
      <el-table-column prop="price" label="订单金额(元)" />
      <el-table-column prop="innerCode" label="设备编号" />
      <el-table-column prop="status" label="订单状态" :formatter="tacked">
      </el-table-column>
      <el-table-column prop="createTime" label="订单日期">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click="clickFn(row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 放置分页组件 -->
    <!-- 放置分页组件 -->
      <div style="padding:32px 16px;">
        <div style="display:flex;justify-content: space-between;">
          <span style="color: #dbdfe5">共{{page.totalCount}}条记录  第 {{page.pageIndex}}/{{totalPage}} 页</span>
          <div>
            <el-button 
            @click="getDD(-1)"
            type="primary"
            :class="page.pageIndex == 1 ? 'active' : ''"
            style="background-color:#d5ddf8;color:#333;border:0;">
              上一页
            </el-button>
            <el-button 
            @click="getDD(1)"
            :class="page.pageIndex == totalPage ? 'active' : ''"
            type="primary"
            style="background-color:#d5ddf8;color:#333;border:0;">
              下一页
            </el-button>
          </div>
        </div>
      </div>
    <!-- 弹层 -->
    <el-dialog
      title="订单详情"
      :visible.sync="isShow"
      width="630px"
      >
      <div>
        <div class="order-status">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAADT0lEQVRIS62WX0hTcRTHv+d3V7MkKsVAbHdSLwWhkVEvBZVRL72UvURhRFQ09SpBqZPklrU5oayZkyD68xaYUFH0h5wP9dQfqCAqonST6ikjs2jr7p64103mNndndd8u58/n/M7vnN85BIvPPRwoY12rArAWwBIABXGTEQBvADwkYevzOFwvs7miqYRNobMVBPIBqLQKJi7vZ3Bju7P+WSb9NJDKqi0yXNAJwAWGyBEyrkbQwdRtl78cUknVkm0ngZpC3vmE/GsANkwLkK4cZPzY3u5s/poQTYDMk4QL7v0HSMJ30C6PbE6cbALUHPZ3gVH7jydJMacur7NOGc8qAPPiiR5P+06soiLozLzKKBAT1BzyP5hGdVm5HyPwXiapEKwHAPR7ncpGivfJCyvrXOREeCex2NrmrH3lDvk7GDhspk3Yyqk55D8GoDUXRxYNefunHts1r/TbaDRc2MPg/Un6xw1QEMD6vwYRdAKdnOn4on56ViwVLoheAfOOFH8DBugTgOK/AjFGdcHVPrn+hjp4KS8ixnoB3pLB12cD9AuAPSFkIEJADMDs7Kmi18ImbT1R4np75I1vjpQ36yYI66awiaSBSMJuTYs9kYR0FYyyjIaE67FZ+dUdRXu/q8OnC6I8445RxlkCM0GTUkeEPR5ZuawOqnlRqfAUAwfBnGhsnYhaPY46DwjsHuosZiHdB2OZRerN1KUWg06EfR5ZuWj22JB/GwgXxsuUdnocdXfMJv/cU0rR30b/Lc7hfgfIHT57nJmOpijrJMQBj6PWBLQM95RoIiL5ShrCxv+Roc6l0vhJFuYAARG3UeMHf7mQ8DzNwHzy4fI6lfPJMvfQuRUs9LtgFOUCMXT0GJYnnqD+TK82A0yEGq+s9Jgn+9i9RtditwDMzRUCIOh1KpXxRzVQAWhPKP7IJjsxYEJQPcfoPUjvtSr7SQEQdAFafVKue5o8Js6BUTONSK1VCd1eWTFHT+rgu/9Pz9Fk9IBdHtmUNvjMkg0F5hO0vv8AG2DYqtqdrvRRnggmvpycYYYr051ly1e8eAJ2x0hD1uUk2UlLuGulzmysW7kuKkFB1GhcfKZgptzrEspGn0k2rmKmNZkWSCJ+FNOoz7dIyTo8/wDHwkf9fxFtzQAAAABJRU5ErkJggg==" alt="">
          <span>{{ status }}</span>
          <img src="https://likede2-admin.itheima.net/img/pic_2.3b5af41c.png" class="pic" alt="">
        </div>
        <div>
          <el-form style="padding-left:20px">
            <el-row :gutter="24">
              <el-col :span="14"><div class="grid-content bg-purple">订单编号:{{xi.orderNo}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple">商品名称:{{xi.skuName}}</div></el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="14"><div class="grid-content bg-purple">设备编号:{{xi.innerCode}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple">订单金额:{{xi.price}}</div></el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="14"><div class="grid-content bg-purple">完成时间:{{xi.createTime}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple">创建时间:{{xi.updateTime}}</div></el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="14"><div class="grid-content bg-purple">设备地址:{{xi.addr}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple">支付方式:{{xi.payType === 1 ? '支付宝':'微信'}}</div></el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- <descar :isShow.sync="isShow" :list="fand" /> -->
  </div>
</template>

<script>
// import descar from '@/components/Descar'
import { getDD } from '@/api/table'
export default {
  name: 'DingDan',
  data() {
    return {
      status:'',
      xi:{},
      list: [],
      value1: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        orderNo: '', //订单编号
        startDate:'',
        endDate:''
      },
      totalPage:0,
      isShow: false,
      fand: {}, //获取点击对象
      loading:false
    }
  },

  created() {
    this.getDD()
  },

  methods: {
    //获取数据
    async getDD(num) {
      if(+this.page.pageIndex + num > 0 && +this.page.pageIndex + num <= this.totalPage){
        this.page.pageIndex = +this.page.pageIndex + num
      } 
      if(this.value1.length){
        this.page.startDate = this.value1[0]
        this.page.endDate = this.value1[1]
      }
      this.loading=true
      const { data } = await getDD(this.page)
      // console.log(row)
      this.totalPage = data.totalPage
      this.list = data.currentPageRecords
      this.page.totalCount = parseInt(data.totalCount)
      this.page.orderNo = data.currentPageRecords.orderNo
      // console.log(this.page.totalCount)
      // this.test = this.list.map(item => item.status)
      // console.log(this.test)
      this.loading=false
    },
    //过滤数据
    tacked(row, column, cellValue) {
      if (cellValue === 0) {
        return '创建'
      } else if (cellValue === 1) {
        return '支付完成'
      } else if (cellValue === 2) {
        return '出货成功'
      } else if (cellValue === 3) {
        return '出货失败'
      }
    },
    // 获取页码
    changePage(newPage) {
      this.page.pageIndex = newPage
      this.getDD()
    },
    //查看详情
    clickFn(id) {
      this.xi = id
      this.status = id.status
      if(this.xi.status === 1){
        this.status = '支付完成'
      }else if(this.status === 2){
        this.status = '出货成功'
      }else{
        this.status = '出货失败'
      }
      this.fand = id
      this.isShow = true
    },
  },
}
</script>

<style scoped lang="less">
.el-col{
  font-size: 14px;
  margin-top:10px;
}
.order-status{
  display: flex;
  align-items: center;
  height: 54px;
  margin-bottom: 30px;
  background-color: hsla(0,0%,92.5%,.39);
  .pic{
    margin-right: 76px;
    margin-bottom: 7px;
  }
  img{
    margin-left: 22px;
  }
  span{
    flex: 1;
    margin-left: 16px;
    color: rgba(0,0,0,.85);
  }
}
.active{
  background: #edf0f9 !important;
  color: #d8dde3 !important;
}
.app {
  margin-top: 25px;
  margin-left: 15px;
  .bigge {
    display: flex;
    border-top: 50px;
    .inputss {
      width: 200px;
    }
    .test {
      margin-left: 25px;
    }
    .btn {
      background-color: #5f84ff;
      color: #fff;
      height: 40px;
      margin-left: 15px;
    }
  }
}
.el-dialog__wrapper{
  /deep/.el-dialog{
   border-radius:10px;
  }
}
</style>
