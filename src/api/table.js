import request from '@/utils/request'
// import store from '@/store'
// 工单状态列表
export const getList = () => {
  return request({
    url: '/api/task-service/task/allTaskStatus'
  })
}
// 订单管理
export const getDD = (params) => {
  return request({
    url: '/api/order-service/order/search',
    params

  })
}
// 工单列表
export const getGDList = (params) => {
  return request({
    url: '/api/task-service/task/search',
    params
  })
}
