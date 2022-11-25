import request from "@/utils/request"
// 商品类型搜索
export const shoopSearch = params => request.get('/api/vm-service/skuClass/search',{
  params
})

// 商品类型增加
export const postshoop = data => request({
  url:'/api/vm-service/skuClass',
  method:'POST',
  data
})

// 修改商品类型
export const putshoop = data => request({
  url:`/api/vm-service/skuClass/${data.classId}`,
  method:'PUT',
  data
})

// 删除商品类型
export const delshoop = classId => request({
  url:`/api/vm-service/skuClass/${classId}`,
  method:'DELETE',
})