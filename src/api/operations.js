import request from '@/utils/request'

/**
 * 运维管理列表
 * @param {*} params
 * @returns
 */
export function getOperationsSearchApi(params) {
  return request({
    url: '/api/task-service/task/search',
    params
  })
}

/**
 * 工单状态列表
 * @param {*} params
 * @returns
 */
export function getallTaskStatusApi() {
  return request({
    url: '/api/task-service/task/allTaskStatus'
  })
}

/**
 * 获取工单类型
 * @param {*} params
 * @returns
 */
export function getTaskTypeApi(params) {
  return request({
    url: '/api/task-service/taskType/list',
    params
  })
}

/**
 *运维人员
 * @param {*} params
 * @returns
 */
export function getServiceUserApi(params) {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}

/**
 * 添加工单
 * @param {*} params
 * @returns
 */
export function addTaskApi(data) {
  return request({
    url: '/api/task-service/task/create',
    method: 'POST',
    data
  })
}
// /**
//  * 获取工单详情
//  * @param {*} taskId
//  * @returns
//  */
// export const getWorkList = (taskId) =>
//   request({
//     url: '/api/task-service/task/taskInfo/' + taskId
//   })
