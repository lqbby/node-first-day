import request from '@/utils/request'

// 获取当时工单汇总信息(人员统计头部信息)
export const gettaskReportInfo = (start, end) => request.get(`/api/task-service/task/taskReportInfo/${start}%2000:00:00/${end}%2023:59:59`)

// 获取一定时间范围之内的订单总数
export const getorderCount = (start, end) => request.get('api/order-service/report/orderCount',
  {
    params: {
      start: start + ' 00:00:00',
      end: end + ' 23:59:59'
    }
  }
)

// 获取一定时间范围之内的收入
export const getorderAmount = (start, end) => request.get('api/order-service/report/orderAmount',
  {
    params: {
      start: start + ' 00:00:00',
      end: end + ' 23:59:59'
    }
  }
)

// 获取当时工单汇总信息(人员统计头部信息)
export const getamountCollect = (collectType, monday, end) => request.get(`api/order-service/report/amountCollect/${collectType}/${monday}/${end}`)
