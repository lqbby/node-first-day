<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="vmChanneldialogVisible"
      width="940px"
      @close="onClose"
    >
      <!-- 上方售货机详情和智能排序 -->
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="background-color: #f3f6fb; height: 56px; margin-bottom: 15px"
      >
        <el-col :span="14">
          <span style="margin: 0 0 0 40px">货道行数：{{ types.vmRow }}</span>
          <span style="margin: 0 40px">货道列数：{{ types.vmCol }}</span>
          <span>货道容量（个）：{{ types.channelMaxCapacity }}</span>
        </el-col>
        <el-col :span="4">
          <el-button size="small" class="create" @click="sortFn"
            >智能排货</el-button
          >
        </el-col>
      </el-row>

      <!-- el-scrollbar部分 -->
      <div class="scrollbar">
        <el-scrollbar style="height: 100%" ref="elbar">
          <div
            v-for="(i, index) in channelList.length / 10"
            :key="index"
            style="margin-bottom: 60px"
          >
            <el-row class="scrollbar-item" type="flex" :gutter="12">
              <el-col
                v-for="item in List(index)"
                :key="item.channelCode"
                :span="26"
              >
                <el-row class="sku">
                  <div class="tag">{{ item.channelCode }}</div>
                  <img :src="skuImage(item)" alt="" v-imgError="defaultImg" />
                  <p>{{ skuName(item) }}</p>
                  <el-card
                    style="margin-top: 28px"
                    body-style="width: 150px; padding:0;text-align:center;"
                  >
                    <el-button type="text" @click="addGood(item)"
                      >添加</el-button
                    >
                    <el-button
                      type="text"
                      :style="{ color: !item.sku ? '#eee' : 'red' }"
                      :disabled="!item.sku"
                      @click="delGood(item)"
                      >删除</el-button
                    >
                  </el-card>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
        <el-button
          icon="el-icon-arrow-left"
          style="font-size: 40px"
          type="text"
          class="left-arrow"
          @click="clickArrowLeft"
        ></el-button>
        <el-button
          icon="el-icon-arrow-right"
          style="font-size: 40px"
          type="text"
          class="right-arrow"
          @click="clickArrowRight"
        ></el-button>
      </div>

      <!-- 智能排序弹层 -->
      <el-dialog
        :title="isAdd ? '选择商品' : '智能排货'"
        append-to-body
        width="45%"
        :visible.sync="businessTopdialogVisible"
        @close="onClosebusinessTop"
      >
        <div style="margin-left: 30px">
          <p v-if="!isAdd">
            该区域属于{{ businessType.name }}商圈适合销售一下商品：
          </p>
          <searchTop
            v-if="isAdd"
            :searchItem="searchItem"
            @searchForm="searchFormFn"
          ></searchTop>
          <el-row type="flex">
            <el-col
              style="margin: 10px"
              :span="6"
              class="sortSku"
              v-for="(item, index) in TopList1"
              :key="index"
              @click.native="choose(item)"
            >
              <img
                :src="selectedImg"
                alt=""
                v-if="item.skuId === chooseItem"
                class="selected"
              />
              <img :src="item.image" alt="" v-if="!isAdd" />
              <img :src="item.skuImage" alt="" v-if="isAdd" />
              <p>{{ item.skuName }}</p>
            </el-col>
          </el-row>
          <el-row type="flex" v-show="TopList2.length !== 0">
            <el-col
              style="margin: 10px"
              :span="6"
              class="sortSku"
              v-for="(item, index) in TopList2"
              :key="index"
              @click.native="choose(item)"
            >
              <img
                :src="selectedImg"
                alt=""
                v-if="item.skuId === chooseItem"
                class="selected"
              />
              <img :src="item.image" alt="" v-if="!isAdd" />
              <img :src="item.skuImage" alt="" v-if="isAdd" />
              <p>{{ item.skuName }}</p>
            </el-col>
          </el-row>
          <el-button
            v-if="isAdd"
            icon="el-icon-arrow-left"
            style="font-size: 40px"
            type="text"
            class="left-arrow1"
            @click="clickArrowLeft1"
          ></el-button>
          <el-button
            v-if="isAdd"
            icon="el-icon-arrow-right"
            style="font-size: 40px"
            type="text"
            class="right-arrow1"
            @click="clickArrowRight1"
          ></el-button>
        </div>
        <span class="dialog-footer">
          <el-button user="sure" @click="sureAdvice" v-if="!isAdd"
            >采纳建议</el-button
          >
          <el-button user="sure" @click="sureAdd()" v-if="isAdd"
            >确定</el-button
          >
        </span>
      </el-dialog>
      <!-- 下方按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button user="sure" @click="sureChangeChannel">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchTop from './searchTop.vue'
import defaultImg from '@/assets/404_images/none.png'
import selectedImg from '@/assets/404_images/selected.png'
import { getbusinessTopAPI, getskusearchAPI } from '@/api/equipment'
export default {
  data() {
    return {
      searchItem: {
        firstItem: '商品名称',
        secondItem: '',
        isSelect: false,
        formInline: {
          user: ''
        }
      },
      defaultImg, //默认没有商品的图片
      selectedImg, //选中时的图片
      businessTopdialogVisible: false,
      businessType: {},
      TopList1: [],
      TopList2: [],
      TopList: [],
      isAdd: false,
      currentpageIndex: 1,
      totalPage: 0,
      chooseItem: '', //选中的对应项的图片url 判断是否选中
      choice: {}, //添加的选中项
      currentChannelCode: ''
    }
  },
  components: {
    searchTop
  },
  props: {
    vmChanneldialogVisible: {
      type: Boolean,
      default: false
    },
    currentVm: {
      type: Object,
      default: () => ({})
    },
    channelList: {
      type: Array,
      default: () => []
    }
  },
  created() {},
  computed: {
    types() {
      return this.currentVm.type
    },
    List() {
      return (index) => {
        return this.channelList.slice(10 * index, (index + 1) * 10)
      }
    },
    skuImage() {
      return (item) => {
        return item.sku?.skuImage
      }
    },
    skuName() {
      return (item) => {
        return item.sku?.skuName ?? '暂无商品'
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:vmChanneldialogVisible', false)
    },
    // 左箭头点击事件
    clickArrowLeft() {
      this.$refs['elbar'].wrap.scrollLeft =
        this.$refs['elbar'].wrap.scrollLeft - 820
    },
    // 右箭头点击事件
    clickArrowRight() {
      this.$refs['elbar'].wrap.scrollLeft = this.$refs['elbar'].wrap.scrollWidth
      this.sLeft = this.$refs['elbar'].wrap.scrollLeft
    },
    // 删除商品
    delGood(item) {
      this.$emit('delGood', item)
    },
    //采纳建议
    sureAdvice() {
      this.$emit('sureAdvice', this.TopList)
      this.onClosebusinessTop()
    },
    // 确认添加
    sureAdd() {
      this.$emit('sureAdd', this.choice)
      this.onClosebusinessTop()
    },
    async sortFn() {
      console.log(this.currentVm)
      this.businessType = this.currentVm.node.businessType
      const res = await getbusinessTopAPI(this.currentVm.businessId)
      const arr = res.data
      this.TopList = res.data

      if (arr.length <= 5) {
        this.TopList1 = arr
      } else if (arr.length > 5 && arr.length < 10) {
        this.TopList1 = arr.slice(0, 5)
        this.TopList2 = [5 - arr.length]
      } else {
        this.TopList1 = arr.slice(0, 5)
        this.TopList2 = arr.slice(-5)
      }
      //   console.log(this.TopList1)
      this.businessTopdialogVisible = true
    },
    //关闭top10商品弹层
    onClosebusinessTop() {
      this.businessTopdialogVisible = false
      this.isAdd = false
      this.searchItem.formInline.user = ''
      this.chooseItem = ''
    },
    async addGood(item) {
      this.isAdd = true
      this.currentChannelCode = item.channelCode
      await this.getskusearch(this.currentpageIndex)
      this.businessTopdialogVisible = true
    },
    async getskusearch(page, skuName) {
      this.TopList1 = []
      this.TopList2 = []
      const res = await getskusearchAPI(page, skuName)
      console.log(res)
      this.totalPage = res.data.totalPage
      const arr = res.data.currentPageRecords
      if (arr.length <= 5) {
        this.TopList1 = arr
      } else if (arr.length > 5 && arr.length < 10) {
        this.TopList1 = arr.slice(0, 5)
        this.TopList2 = [5 - arr.length]
      } else {
        this.TopList1 = arr.slice(0, 5)
        this.TopList2 = arr.slice(-5)
      }
    },
    async clickArrowLeft1() {
      if (this.currentpageIndex <= 1) {
        return (this.currentpageIndex = 1)
      }
      this.currentpageIndex -= 1
      console.log(this.currentpageIndex)
      await this.getskusearch(this.currentpageIndex)
    },
    // 右箭头点击事件
    async clickArrowRight1() {
      console.log(this.totalPage)
      if (this.currentpageIndex >= this.totalPage) {
        return (this.currentpageIndex = this.totalPage)
      }
      this.currentpageIndex += 1
      console.log(this.currentpageIndex)
      await this.getskusearch(this.currentpageIndex)
    },
    async searchFormFn(val) {
      console.log(val)
      await this.getskusearch(1, val.user)
    },
    choose(item) {
      console.log(item)
      if (this.chooseItem !== '' && this.chooseItem !== item.skuId) {
        this.chooseItem = item.skuId
        this.choice = { ...item, channelCode: this.currentChannelCode }
      } else if (this.chooseItem !== '' && this.chooseItem == item.skuId) {
        this.chooseItem = ''
      } else {
        this.chooseItem = item.skuId
        this.choice = item
        this.choice = { ...item, channelCode: this.currentChannelCode }
      }
    },
    sureChangeChannel() {
      this.$emit('sureChangeChannel')
      this.onClose()
    }
  }
}
</script>

<style scoped lang="scss">
.sortSku {
  position: relative;
  width: 134px;
  height: 134px;
  padding-top: 16px;
  background-color: #f6f7fb;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  border-radius: 4px;
  text-align: center;
  .selected {
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 36px;
  }
  img {
    display: inline-block;
    width: 83px;
    height: 84px;
    margin-bottom: 5px;
    -o-object-fit: contain;
    object-fit: contain;
  }
  p {
    width: 102px;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.left-arrow1 {
  position: absolute;
  left: 0px;
  top: 233px;
}
.right-arrow1 {
  position: absolute;
  right: 0px;
  top: 233px;
}
.dialog-footer {
  text-align: center;
}
.el-button--small {
  font-size: 14px;
  color: #fff;
  width: 80px;
  height: 36px;
  border: unset;
}
.create {
  background-color: #5f84ff;
}

.scrollbar {
  position: relative;
  width: 814px;
  height: 384px;
  margin: 0 auto;
  .left-arrow {
    position: absolute;
    left: -50px;
    top: 153px;
  }
  .right-arrow {
    position: absolute;
    right: -50px;
    top: 153px;
  }

  .scrollbar-item {
    width: 150px;
    height: 135px;
  }

  .sku {
    position: relative;
    height: 135px;
    padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
    text-align: center;
    padding-bottom: 10px;
    .tag {
      position: absolute;
      top: 10px;
      left: 0;
      width: 43px;
      height: 23px;
      line-height: 23px;
      background: #829bed;
      border-radius: 0 10px 10px 0;
      font-size: 12px;
      color: #fff;
    }
    img {
      display: inline-block;
      width: 84px;
      height: 78px;
      margin-bottom: 10px;
      -o-object-fit: contain;
      object-fit: contain;
    }
    p {
      position: absolute;
      bottom: 10px;
      left: 50px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
