import request from "@/utils/request";

//商品搜索
export const getshooplist = params => request.get('/api/vm-service/sku/search',{
  params
})