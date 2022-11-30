import request from '@/utils/request'
/**
 * 人员搜索（列表）
 * @param {Object} params 人员信息数据
 * @returns  promise
 */
/**
 * 搜索合作商
 * @param {*} params
 * @returns
 */
export const getUpersonnelApi = (params) => {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}
/**
 *
 *  获取工作量列表
 * @returns  promise
 */
export const GetWorkloadApi = (params) => {
  return request({
    url: '/api/user-service/user/searchUserWork',
    params
  })
}
/**
 *  获取用户基本信息
 * @param {Number} id  用户id
 * @returns  promise
 */
export const getuserMessageApi = (id) => {
  return request({
    url: '/api/user-service/user/' + id
  })
}
/**
 * 获取用户工作量(工单统计)
 * @param {Object} params 开始时间 结束时间
 * @returns  promise
 */
export const WorkOrderStatisticsApi = (params) => {
  return request({
    url: '/api/task-service/task/userWork',
    params
  })
}
/**
 * 获取当时工单汇总信息(人员统计头部信息) 人效统计页面
 * @returns  promise
 */
export const gettaskReportInfoApi = (start, end) => {
  return request({
    url: `/api/task-service/task/taskReportInfo/${start}/${end}`
  })
}
/**
 * 人效页面 工单状态统计
 * @param {string} start  开始时间
 * @param {string} end  结束时间
 * @returns  promise
 */
export const statusTatisticsApi = (start, end) => {
  return request({
    url: `/api/task-service/task/collectReport/${start}/${end}`
  })
}
/**
 * 人员排名  人效运营运维切换
 * @param {string} start 开始日期
 * @param {string} end  结束日期
 * @param {Boolean} isRepair  是否是运维工单
 * @param {string} regionId  区域id
 * @returns
 */
export const PersonnelRankingApi = (start, end, isRepair, regionId) => {
  return request({
    url: `/api/task-service/task/userWorkTop10/${start}/${end}/${isRepair}/${regionId}`
  })
}

/**
 *  获取人效统计页面/人员新增 区域列表
 * @returns  promise
 */
export const AreaListApi = (params) => {
  return request({
    url: '/api/vm-service/region/search',
    params
  })
}
/**
 * 获取角色列表
 * @param {Object} params 请求参数
 * @returns  promise
 */
export const RoleListApi = () => {
  return request({
    url: '/api/user-service/role'
  })
}
/**
 *上传图片
 * @param {file} data 图片地址
 * @returns  promise
 */
export const PictureUploadApi = (data) => {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST',
    data
  })
}
/**
 * 新增人员
 * @param {object} data 新增人员信息
 * @returns  promise
 */
export const NewPersonnelApi = (data) => {
  return request({
    url: '/api/user-service/user',
    method: 'POST',
    data
  })
}
/**
 * 删除人员
 * @param {string} id 用户ID
 * @returns  promise
 */
export const DelePersonnelApi = (id) => {
  return request({
    url: '/api/user-service/user/' + id,
    method: 'DELETE'
  })
}
/**
 * 修改人员
 * @param {string} id  用户id
 * @returns  promise
 */
export const addPersonnelApi = (id, data) => {
  return request({
    url: '/api/user-service/user/' + id,
    method: 'PUT',
    data
  })
}
