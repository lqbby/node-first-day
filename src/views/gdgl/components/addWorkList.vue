<template>
  <el-dialog title="新增工单" :visible="visible" width="30%" @close="onClose">
    <el-form
      ref="form"
      :rules="workRoules"
      :model="formData"
      label-width="120px"
    >
      <el-form-item label="设备编号:" prop="innerCode">
        <el-input
          type="text"
          placeholder="请输入"
          v-model="formData.innerCode"
          maxlength="15"
          show-word-limit
          @input="replenishments"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="工单类型:" prop="productType">
        <el-select v-model="formData.productType" placeholder="请选择">
          <el-option
            :label="item.typeName"
            :value="item.typeId"
            v-for="item in productTypeList"
            :key="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量:" prop="details">
        <div class="box" @click="replenishment">
          <i class="el-icon-s-order"></i>
          <span>补货清单</span>
        </div>
        <!-- 补货清单弹窗 -->
        <el-dialog
          title="补货详情"
          :visible="dialogVisible"
          width="30%"
          @close="onCloseList"
          :modal="false"
        >
          <!-- 表格区域 -->
          <el-table :data="tableData" style="width: 100%" height="310px">
            <el-table-column prop="channelCode" label="货道编号" width="80">
            </el-table-column>
            <el-table-column prop="skuName" label="商品名称" width="80">
            </el-table-column>
            <el-table-column prop="expectCapacity" label="当前数量" width="80">
            </el-table-column>
            <el-table-column prop="expectCapacity" label="还可添加" width="100">
            </el-table-column>
            <el-table-column prop="address" label="补满数量">
              <div class="input">
                <el-input-number
                  v-model="num"
                  controls-position="right"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>
            </el-table-column>
          </el-table>
          <!-- 表格区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="onCloseList">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <!-- 补货清单弹窗 -->
      </el-form-item>
      <el-form-item label="运营人员:" prop="assignorId">
        <el-select v-model="formData.assignorId" placeholder="请选择">
          <el-option
            :label="item.userName"
            :value="item.userId"
            v-for="item in userNameList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="desc">
        <el-input
          type="textarea"
          placeholder="请输入备注(不超过40字)"
          maxlength="40"
          v-model="formData.desc"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  createRepair,
  getAllWorkType,
  getReplenishmentDetailsApi,
  getWorkOrderList,
  getOperatorList
} from '@/api/workOrder'
export default {
  name: 'AddWorkList',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
    // editGoodsTypeVal: {
    //   type: Object
    // }
  },
  data() {
    return {
      formData: {
        assignorId: '', //运营人员id
        createType: 1, //工单类型
        desc: '', //描述信息
        details: [
          {
            channelCode: '1-1',
            expectCapacity: 10,
            skuId: '2',
            skuImage: 'http://lkd2-java.itheima.net/image/product2.png',
            skuName: '康师傅冰红茶'
          }
        ], //补货信息(补货工单才有)
        innerCode: '', //设备编号
        productType: '', //工单类型
        userId: 1
      },
      workRoules: {
        innerCode: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择工单类型', trigger: 'blur' }
        ],
        assignorId: [
          { required: true, message: '请选择运营人员', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      productTypeList: [], //工单类型
      dialogVisible: false,
      tableData: [], //补货清单页面渲染数据
      list: [], //首页渲染的数据
      num: 0,
      userNameList: [] //运营人员
    }
  },

  created() {
    this.getAllWorkType()
    this.getWorkOrderList()
  },

  methods: {
    // 关闭弹窗
    onClose() {
      this.$emit('update:visible', false)
      //关闭弹窗清空数据
      this.formData.desc = ''
      this.formData.innerCode = ''
      this.formData.productType = ''
      this.formData.userId = ''
      this.formData.assignorId = ''
      this.userNameList = []
    },
    onCloseList() {
      this.dialogVisible = false
    },
    //获取所有工单类型
    async getAllWorkType() {
      const res = await getAllWorkType({
        alertValue: 50
      })
      this.productTypeList = res.data
    },
    //补货详情点击事件
    async replenishment() {
      this.dialogVisible = true
      const res = await getReplenishmentDetailsApi(this.list[0].taskId)
      console.log(res.data)
      this.tableData = res.data
    },
    //首页渲染的数据
    async getWorkOrderList() {
      const res = await getWorkOrderList()
      this.list = res.data.currentPageRecords
    },
    //运营人员
    async replenishments() {
      const res = await getOperatorList(this.formData.innerCode)
      // console.log(res.data)
      this.userNameList = res.data
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        await createRepair(this.formData)
        this.$message.success('新建成功')
        this.onClose()
      } catch (error) {
        this.$message.error(error.response.data)
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  width: 630px;
  max-height: 510px;
  border-radius: 10px;
  //   取消按钮
  .el-button--default {
    position: absolute;
    left: 204px;
    bottom: 20px;
    background-color: #fbf4f0;
    width: 80px;
    height: 36px;
    border-color: #fbf4f0;
    color: #655b56;
  }
  //   确定按钮
  .el-button--primary {
    position: absolute;
    right: 185px;
    bottom: 20px;
    background-color: #e54a14;
    color: #fff;
    border-color: #e54a14;
    width: 80px;
    height: 36px;
  }
  //   名称
  .el-form-item__label {
    font-weight: normal;
    font-size: 14px;
    color: #606266;
  }
  // //input框
  // .el-input__inner {
  //   width: 396px;
  //   height: 36px;
  // }
  .el-input__count {
    margin-right: 20px;
    color: #bac0cd;
  }
  .box {
    width: 80px;
    height: 25px;
    color: #5f84ff;
    cursor: pointer;
  }
  .input {
    .is-controls-right {
      width: 150px;
    }
    //input框
    .el-input__inner {
      width: 150px;
      height: 36px;
    }
  }
}
</style>
