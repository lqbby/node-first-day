import request from '@/utils/request'
/**
 *  获取工单搜索列表
 * @returns promise
 */
export const getWorkOrderList = (params) =>
  request({
    url: '/api/task-service/task/search',
    params
  })
/**
 * 创建工单
 * @param {*} data
 * @returns
 */
export const createRepair = (data) =>
  request({
    url: '/api/task-service/task/create',
    method: 'POST',
    data
  })

/**
 * 获取所有工单类型
 * @param {integer} params alertValue 预警值(百分比，如50代表，满量的百分之50为补货预警值)
 * @returns
 */
export const getAllWorkType = (params) =>
  request({
    url: '/api/task-service/taskType/list',
    params
  })

/**
 * 获取工单详情
 * @param {String} taskId
 * @returns promise
 */
export const getTaskInfo = (taskId) => {
  return request({
    url: `/api/task-service/task/taskInfo/${taskId}`,
    method: 'GET'
  })
}
/**
 *  补货详情
 * @param {*} taskId
 * @returns
 */
export const getReplenishmentDetailsApi = (taskId) =>
  request({
    url: '/api/task-service/taskDetails/' + taskId
  })

/**
 * 根据售货机获取运营人员列表
 * @param {Number} innerCode 设备编号
 * @returns
 */
export const getOperatorList = (innerCode) => {
  return request({
    url: `/api/user-service/user/operatorList/${innerCode}`,
    method: 'GET'
  })
}
/**
 * 获取补货预警值
 * @returns
 */
export const getSupplyAlertValue = () =>
  request({
    url: '/api/task-service/task/supplyAlertValue'
  })

/**
 * 取消工单
 * @param {*} taskId
 * @returns
 */
export const delWork = (data) =>
  request({
    url: '/api/task-service/task/cancel/' + data.taskId,
    method: 'POST',
    data
  })
