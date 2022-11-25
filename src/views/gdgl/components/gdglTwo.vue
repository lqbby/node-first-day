<template>
  <div class="app">
    <Title class="title" />
    <Buttom class="btn" />
    <Table/>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Title from '@/components/Title'
import Buttom from '@/components/Buttom'
import Table from '@/components/Table'
export default {
  components: {
    Title,
    Buttom,
    Table
  },
  data() {
    return {

    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      const res = await getList()
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>
.app{
  .title{
    margin-top: 30px;
    margin-left: 30px;
  }
    .btn{
    margin-left: 30px;
    margin-top: 10px;
  }
}
</style>
