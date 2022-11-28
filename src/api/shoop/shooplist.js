import request from "@/utils/request";

// 图片上传
export const imgpost = file => request({
  url: '/api/vm-service/sku/fileUpload',
  method: 'POST',
  data:file
})
//商品搜索
export const getshooplist = params => request.get('/api/vm-service/sku/search',{
  params
})