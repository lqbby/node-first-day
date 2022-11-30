import request from "@/utils/request";

// 搜索策略
export const getpolicylist = params => request.get('/api/vm-service/policy/search',{
  params
})

// 删除策略
export const delpolicy = (data,id) => request.delete(`/api/vm-service/policy/${id}`,{
  params:data
})

// 新增策略

export const postpolicy = data => request.post(`/api/vm-service/policy`,data)

// 修改策略

export const putpolicy = (data,id) => request.put(`/api/vm-service/policy/${id}`,data)

// 根据策略搜索售货机

export const getvmList = (data,id) => request.get(`/api/vm-service/policy/vmList/${id}`,{
  params:data
})
