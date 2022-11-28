import request from "@/utils/request";

//商品搜索
export const getshooplist = params => request.get('/api/vm-service/sku/search',{
  params
})

// 新增商品
export const postshoop = data => request.post('/api/vm-service/sku',data)

// 修改商品
export const putshoop = data => request.put(`/api/vm-service/sku/${data.skuId}`,data)