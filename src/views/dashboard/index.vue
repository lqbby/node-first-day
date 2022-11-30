<template>
  <!-- 主体 -->
  <div class="bgc">
    <div class="dashboard-container">
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="GongDan">
            <div class="header">
              <div class="title">
                工单统计 <span class="sub-title">{{ nowdate.start }} ~ {{ nowdate.end }}</span>
              </div>
            </div>
            <div class="body">
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{ total }}</div>
                  <div class="text color2">工单总数（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{ completedTotal }}</div>
                  <div class="text color2">完成工单（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{ progressTotal }}</div>
                  <div class="text color2">进行工单（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color1 text-shadow1">{{ cancelTotal }}</div>
                  <div class="text color2">取消工单（个）</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="XiaoShou">
            <div class="header">
              <div class="title">
                销售统计 <span class="sub-title">{{ nowdate.start }} ~ {{ nowdate.end }}</span>
              </div>
            </div>
            <div class="body">
              <div class="stats">
                <div class="item">
                  <div class="num color3 text-shadow2">{{ orderCount }}</div>
                  <div class="text color4">订单量（个）</div>
                </div>
              </div>
              <div class="stats">
                <div class="item">
                  <div class="num color3 text-shadow2">{{ orderAmount }}</div>
                  <div class="text color4">销售额（万元）</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="18">
          <div class="XiaoShouShuJu">
            <div class="header">
              <div class="title">
                销售数据 <span class="sub-title">{{ weekstart }} ~ {{ weekend }}</span>
              </div>
              <div class="week-month-year">
                <div class="item"
                 v-for="(item, index) in timeDaty"
                :key="index"
                :class="active === index ? 'is-checked' : ''"
                @click="removeActive(index)"
                >{{ item.day }}</div>
              </div>
            </div>
            <div class="charts">
              <div ref="box1" class="chart" style="width:400px ;height:320px" />
              <div ref="box2" class="chart" style="width:400px ;height:280px" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="ShangPingReBang">
            <div class="header">
              <div class="title">
                商品热榜 <span class="sub-title">{{ nowdate.start }} ~ {{ nowdate.end }}</span>
              </div>
            </div>
            <div class="body">
              <el-row :gutter="20">
                <el-col  style="margin-bottom: 25px;" v-for="(item,index) in skuTop" :key="index">
                  <div class="el-col-5">
                    <div :class="`top top${index+1}`">{{ index+1 }}</div>
                  </div>
                  <div class="el-col-13">
                    <div class="sku-name">{{item.skuName}}</div>
                  </div>
                  <div class="el-col-6">
                    <div class="count">{{item.count}}单</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>

        <el-col :span="13">
          <div class="Top">
            <div class="header">
              <div class="title">
                合作商点位数Top5
              </div>
              <div class="more">
                <i class="el-icon-more" />
              </div>
            </div>
            <div class="charts">
              <div ref="box3" class="chart" style="width:450px ;height:280px" />
              <div class="collect">
                <div class="count">{{ collectCount }}</div>
                <div class="name">点位数</div>
                <div class="count count2">{{ count }}</div>
                <div class="name">合作商数</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="Top">
            <div class="header">
              <div class="title">
                异常设备监控
              </div>
              <div class="more">
                <i class="el-icon-more" />
              </div>
            </div>
            <div class="empty">
              <img src="http://likede2-admin.itheima.net/img/empty.87c4f71b.png" alt="">
              <div class="tips">暂无数据</div>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { gettaskReportInfo, getorderCount, getorderAmount, getamountCollect, getregionCollect, getskuTop, getnodeCollect, getcount } from '@/api/dataS'
import { getDate, getMonday } from '@/utils/date'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {
      active: 0,
      timeDaty: [{ day: '周' }, { day: '月' }, { day: '年' }],
      ZYNamount:{},
      ZYNregion:{},
      weekstart:'',
      weekend:'',
      nowdate: {},
      total: 0,
      cancelTotal: 0,
      completedTotal: 0,
      progressTotal: null,
      orderCount: 0,
      orderAmount: 0,
      monday: '',
      amountCollect: {},
      skuTop:[],
      collect:{},
      collectCount: 0,
      count: 0
    }
  },
  async created() {
    this.nowdate = getDate()
    const { data } = await gettaskReportInfo(this.nowdate.start, this.nowdate.end)
    console.log(data)
    data.forEach(item => {
      this.total += item.total
      this.cancelTotal += item.cancelTotal
      this.completedTotal += item.completedTotal
      this.progressTotal += item.progressTotal
    })
    const Count = await getorderCount(this.nowdate.start, this.nowdate.end)
    this.orderCount = Count.data
    const Amount = await getorderAmount(this.nowdate.start, this.nowdate.end)
    this.orderAmount = (Amount.data / 1000000).toFixed(2)
    const sku = await getskuTop(this.nowdate.start, this.nowdate.end)
    this.skuTop = sku.data
    const count = await getcount()
    this.count = count.data
  },
  computed: {
    ...mapGetters(['name'])
  },
  async mounted() {
    // const Monday = getMonday()
    // console.log(Monday)
    // this.monday = Monday
    // const res = await getamountCollect(1, this.monday, this.nowdate.end)
    // console.log(res.data)
   
    // console.log(res.data)

    const collectType = 1
    const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
    const end = dayjs(new Date()).format('YYYY-MM-DD')
    this.weekstart = start
    this.weekend = end
    const z1= await getamountCollect(collectType, start, end)
    const z2= await getregionCollect(start, end)
    this.ZYNamount = z1.data
    this.ZYNregion = z2.data
    const amount = this.ZYNamount
    const region = this.ZYNregion
    const myChart1 = echarts.init(this.$refs.box1)
    myChart1.setOption({
      title: {
        left: 'center',
        text: '销售额趋势图'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: amount.xAxis
      },
      yAxis: {
        type: 'value',
        name: '单位：元'
      },
      series: [
        {
          data: amount.series,
          itemStyle: {
            color: 'rgba(216, 20, 20, 1)'
          },
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(216, 20, 20, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(216, 20, 20, 0)'
              }
            ])
          }
        }
      ]
    })
    const myChart2 = echarts.init(this.$refs.box2)
    myChart2.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        left: 'center',
        text: '销售额分布'
      },
      xAxis: [
        {
          type: 'category',
          data: region.xAxis,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位：元'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '10%',
          data: region.series,
          itemStyle: {
            shadowColor: '#91cc75',
            borderType: 'dashed',
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [5, 5, 0, 0]
            }
          }
        }
      ]
    })
    const collect = await getnodeCollect()
    this.collect = collect.data
    this.collectCount=this.collect.reduce((sum,item)=>sum+item.value,0)
    console.log(this.collect)
    const myChart3 = echarts.init(this.$refs.box3)
    myChart3.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          color: ['#92b7ff', '#a8ffcf', '#ffc298', '#d9ffff', '#d1e0fd'],
          name: 'Access From',
          type: 'pie',
          radius: ['25%', '70%'],
          center: ['50%', '60%'],
          roseType: 'radius',
          labelLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          label: {
            formatter: '{b|{b}} \n {per|{d}%}',
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold'

              },
              per: {
                color: '#000',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          data: collect.data
        }
      ]
    })
  },
  methods: {
    async removeActive(index) {
     this.active = index
      if (index === 0) {
        const collectType = 1
        const start = dayjs(new Date()).startOf('week').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        const z1= await getamountCollect(collectType, start, end)
        const z2= await getregionCollect(start, end)
        this.ZYNamount = z1.data
        this.ZYNregion = z2.data
      } else if (index === 1) {
        const collectType = 1
        const start = dayjs(new Date()).startOf('month').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        const y1= await getamountCollect(collectType, start, end)
        const y2= await getregionCollect(start, end)
        this.ZYNamount = y1.data
        this.ZYNregion = y2.data
      } else {
        const collectType = 2
        const start = dayjs(new Date()).startOf('year').format('YYYY-MM-DD')
        const end = dayjs(new Date()).format('YYYY-MM-DD')
        const n1= await getamountCollect(collectType, start, end)
        const n2= await getregionCollect(start, end)
        this.ZYNamount = n1.data
        this.ZYNregion = n2.data
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.bgc {
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
  color: rgb(216, 20, 20);
}
.dashboard {
  &-container {
    padding:  30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .GongDan {
    height: 166px;
    padding: 20px;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: calc(20vh - 24px);
    min-height: 166px;
    border-radius: 20px;
    background: #e9f3ff;
    background-image: url(data:image/png;base64,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),url(http://likede2-admin.itheima.net/img/task.66b715b7.png);
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
    .header {
    display: flex;
      .title{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        .sub-title {
          margin-left: 10px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
        }
      }
    }
    .body {
      flex: 1;
      display: flex;
      .stats {
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -webkit-box-direction: normal;
        box-sizing: border-box;
        -webkit-box-flex: 1;
        flex: 1;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        .item {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: column;
          .num {
            height: 50px;
            font-size: 36px;
            font-weight: 600;
            line-height: 50px;
          }
          .color1 {
            color: #072074;
          }
          .text-shadow1 {
            text-shadow: 2px 4px 7px rgba(85,132,255,.5);
          }
          .text {
            height: 17px;
            margin-top: 3px;
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;
          }
          .color2 {
            color: #91a7dc;
          }
        }
      }
    }
  }
  .XiaoShou {
    height: 166px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: calc(20vh - 24px);
    min-height: 166px;
    border-radius: 20px;
    background: #fbefe8 url(http://likede2-admin.itheima.net/img/sale.606b0d8c.png) no-repeat calc(100% - 12px) 100%;
    .header {
    display: flex;
       .title{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        .sub-title {
          margin-left: 10px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
        }
      }
    }
    .body {
      flex: 1;
      display: flex;
      .stats {
        -webkit-box-flex: 1;
        flex: 1;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        .item {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: column;
          .num {
            height: 50px;
            font-size: 36px;
            font-weight: 600;
            line-height: 50px;
          }
          .color3 {
            color: #ff5757;
          }
          .text-shadow2 {
            text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
          }
          .text {
            height: 17px;
            margin-top: 3px;
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;
          }
          .color4 {
            color: #de9690;
          }
        }
      }
    }
  }
  .XiaoShouShuJu {
    padding: 20px;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: calc(40vh - 68px);
    min-height: 352px;
    margin-top: 20px;
    background: #fff;
    border-radius: 20px;
    .header {
    display: flex;
      .title{
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -webkit-box-direction: normal;
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        .sub-title {
          margin-left: 10px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
        }
      }
      .week-month-year {
          -webkit-box-direction: normal;
          box-sizing: border-box;
          width: 129px;
          height: 34px;
          background: rgba(233,243,255,.37);
          border-radius: 10px;
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
        .item {
          text-align: center;
          line-height: 25px;
          width: 37px;
          height: 25px;
          font-size: 14px;
          color: #9ca3b4;
          cursor: pointer;
        }
        .is-checked {
          background: #fff;
          box-shadow: 0 0 4px 0 rgba(0,0,0,.11);
          border-radius: 7px;
          font-weight: 600;
          color: #333;
        }
      }
    }
    .charts {
      -webkit-box-flex: 1;
      flex: 1;
      display: flex;
      .chart {
        position: relative;
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
  .ShangPingReBang {
    padding: 20px;
    margin-top: -165px;
    flex-direction: column;
    height: calc(60vh - 72px);
    min-height: 538px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    .header {
    display: flex;
      .title{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        .sub-title {
          margin-left: 10px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
        }
      }
    }
    .body {
      display: flex;
      -webkit-box-flex: 1;
      flex: 1;
      flex-direction: column;
      -webkit-box-pack: justify;
      justify-content: space-between;
      margin-top: 20px;
        .top{
          width: 16px;
          height: 20px;
          margin-left: 10px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAo0lEQVQ4T2P8/f7FfwYKAOOoAQyjYcAwGgYMgz8MGBl+gHP6fwYOXDkeX1Le8JeRsRikkeX//97/DAwB2AzBZsBVBkbGAlYB8T3IGn5/eOnC8P//BAYGBm1kcSQD/r9nYmKuZ+ITnc7IyPgHm23///9n+f3hZRYjA2MDA8N/QZAaxj/vXzxiYGTc8u3b3zo+Kak3xJRu/z89E/n7j7np////VgAGUHY6vIpVhgAAAABJRU5ErkJggg==);
          text-align: center;
          font-size: 12px;
          color: #e9b499;
          line-height: 14px;
        }
      .top1{
        width: 21px;
        height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACMElEQVQ4T82UPWgUURDHf3OXQy/4VYqVgoWKhYioKIaAhmguicaAWIitZewSEBQFQQvBtFZimdIEFSFFVBI/clFQz4OYRgQt1YgnuX1vZPdud9/tbhLt3Oa9fbv7m//M/GeFxKWfT33D2I1YBWPBKNjmGuwT51a/y+GpTS5GUtBP/RqAfGAASOyjAPFz6XjSwhGd4D3Krgi+uy+tJgA7ilvUKiw+jbUJFdFxVPqIIulCb0NpqMhN3VXvnMvRZ/H3Pi8FnS9pXEu3fonaRgEs0jWdgE6wxC+Kcgbj56DVExrVcrlmJRRL90wA1VkKfOGnr7RKjrNS4k3woHI8hrZ0PmyM28BGJtLzvAG9z0Fy3PEbdQnhAD2cFEH1XXczfbLrmmEv6X0hOkaedh6hPBR9wBoskyhf8Rhm27GPqDiWCr0a2iusbXhuQGb3IFxHKbCOUkP2GEXaGQHOsfnQVqSYa/gzafxwCJwS2Jol/3Ye5S5buCX7qKfN/7rrNnUztKrxw+lSRmXg1cWVJ2q6czt5qWC0kGmtUH1j2uqI7pSB8sKK0KAcM53DePZGrNYdVSd1dEROl28mRz2VfviCTnVcwdjLGM3F0xUNg0XtNRmcu5oE+vfLQgPFk0f24tkhTO08tg3sEti2exgdlcHyXBZwVWikehwN9+5/4v+B6ssdP4D1GYoWZX91wz8p1cf9NTyzFuOBMeD5q9dcTXNvwHq/5UKl+Ffdj6BZMDdIAP2Qgv4B21H4JL7cBkgAAAAASUVORK5CYII=);
        color: #8e5900;
      }
      .top2{
        width: 21px;
        height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACF0lEQVQ4T8WTz4vTUBDHZzYUbcEf9NBzkhaKnsRCFEqhFHqJCXv1IP4L620XBEVB0IPgXj2Jx/4DevHSW6EULw2WdpOWliKUFn+BNu+9jrxAS0zTbvZk4JE3TN7nfb+TGYTIs1gsvgkhrgkhQK7VahW898TfS6XS9TAGo9DZbEZJgOHLDMP4h4Oe53WJ6OYanslkNuoSqAwc5HK5jTZEdNB1XdJ1fXPTdDoNlIaBUXg0Xy6XN+clbws6mUwS2Q+DK5XKFtTXNC2NiEJ6GI1GsdB9aqvVagBtt9upbDb7Syr9goj3NU37LBOe5+1UuqsstVotgHqed5eI3uJwOHxMRHdUVT1ERBoMBheuab1ex0ajoRiG8VEI8QH7/f4lRVE+AcBXIcQxEQ12tVScUlmWQqFwCwBeAEBK07R7gezxeJzmnJ8AwAPGmMoYOwg3fBgWra2iKKt8Pt8HgHeqqr5GRLbV/I7jvOGcHyWcJiCiU9M0H+2dqG63W2CMOUKIVBw4opoh4g3TNM/2QmWy0+kcc85fnjdRAHBiWdar6Khv2V9/0Gq1nnLOnwghDmJ6dEVEz23bfhYFyngnVCabzeZtIjoCgIe+7wMigu/774UQp7Ztd+KA50LXh3q9Hq33xWJxr5D/A3Vd9wcAXImx+VPX9asXsj+fz3/7vn9Z1pExJuu4WeGYMfbHsqx0or8vocvlMhHUtu0t6F9KkMngoAlOWAAAAABJRU5ErkJggg==);
        color: #494949;
      }
      .top3{
        width: 21px;
        height: 20px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACd0lEQVQ4T82VMWgUQRSGv3fLabQWi4AI6VIKIiEWIgSDJiSoIFhZBEzAgCgpLAQPTLAWo5yRbSwURBHDRTSmECSKcgiGaMBOLIJ2FpqcuzNPZnb33MvGRDuvuZ2Ze9/8773/7QlrPvpicBKj24gtGAUTgwFik65J9mJ3ZsHqigzNj+YxUoA+Hwg9UNMg9xwpqIMCUQpUd6n1cDn9aqgFqjNcRmlvbrb1J4pcUOSVJMFuL05VG3dBAvTfu17nmcuiNULpp3mTPusLk4As/QyYKmsCXRmSksjom9/xjleAPjmcpO/ruQnQZRGDnC1Cp6gzIhWsy0FrveG6QA9w5TAQpSpdhLHIubpXqvcI2M4Np3SCMlXp5bM/eHQoxOaUuro61Tatp2ta/txBx94m0BodwCnRGfqBDvq4Jq7nD3tC3wAfmGtGsxSpC/zaePVy4d2QViixl/NYFkRvUqadMYRv/OQ+9uAVTKnViy21zWqdAL3VOhcrBByjRMB3rnqfap0yy/QhdPGjawfxVmnaxVsrrWezeS6D1FZbGkrnxy8o86zwVE5giua/c+AksfYknc913w2D9202DJlnZU4uLdzdeKJud+9ES+MYG3i1DpSfrha1zgrBRaksfN0Q6stxa/8RVI9n5i4OQ9rA2DyQ8aXHa0e9kH72A53qGqBhB7BWWofBl0RRnZbK++m1QLf+I9QrntyzmzjoQVe7aQiUYmgEL1k1czKx9Gk94KbQpuoaYfacf0/8P1Ctd15HaSsoUlZl39KZf1Kqs0er2KhMFKUmd0aP0rF0z86jbq2RDC+O/FX3dXawShyXk7+NHNDPerZ2YBPJ8IcC9BfAsOweLKuvfgAAAABJRU5ErkJggg==);
        color: #cf6d3d;
      }
      .sku-name {
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        line-height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .count {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #737589;
        line-height: 20px;
        text-align: right;
      }
      .el-col{
        float: left;
        box-sizing: border-box;
      }
      .el-col-5 {
        width: 20%;
      }
       .el-col-13 {
        width: 55%;
      }
       .el-col-6 {
        width: 25%;
      }
    }
  }
  .Top {
    padding: 20px;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    height: calc(40vh - 68px);
    min-height: 352px;
    margin-top: 20px;
    background: #fff;
    border-radius: 20px;
    .header {
    display: flex;
      .title{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        .sub-title {
          margin-left: 10px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
        }
      }
      .more {
        width: 18px;
        height: 18px;
        border: 2px solid #5f84ff;
        border-radius: 50%;
        text-align: center;
        line-height: 12px;
        .el-icon-more{
          color: #5f84ff;
          font-size: 11px;
        }
      }
    }
    .charts {
      -webkit-box-flex: 1;
      flex: 1;
      display: flex;
      .chart {
        position: relative;
        display: inline-block;
        margin-left: 20px;
      }
      .collect {
        width: 154px;
        height: 230px;
        margin-top: 35px;
        padding-top: 47px;
        padding-left: 38px;
        background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        .count {
          height: 33px;
          font-size: 24px;
          font-weight: 600;
          color: #072074;
          line-height: 33px;
        }
        .count2 {
          margin-top: 20px;
        }
        .name {
          height: 17px;
          margin-top: 6px;
          font-size: 12px;
          font-weight: 400;
          color: #000412;
          line-height: 17px;
        }
      }
    }
    .empty {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        border-style: none;
      }
      .tips {
        margin-top: 25px;
        color: #20232a;
        font-size: 14px;
      }
    }
  }
</style>
