import request from '@/utils/request'

/**
 * 搜索点位
 * @param {*} params
 * @returns
 */
export function getNodeSearchApi(params) {
  return request({
    url: '/api/vm-service/node/search',
    params
  })
}

/**
 * 添加点位
 * @param {*} data
 * @returns
 */
export function addNodeListApi(data) {
  return request({
    url: '/api/vm-service/node',
    method: 'POST',
    data
  })
}

/**
 * 商圈列表
 * @returns
 */
export function getBusinessListApi() {
  return request({
    url: '/api/vm-service/businessType'
  })
}

/**
 * 合作商列表
 * @param {*} params
 * @returns
 */
export function getPartnerListApi(params) {
  return request({
    url: '/api/user-service/partner/search',
    params
  })
}

/**
 * 点位详情
 * @param {*} id
 * @returns
 */
export function getNodeDetailApi(id) {
  return request({
    url: '/api/vm-service/node/vmList/' + id
  })
}

/**
 * 修改点位
 * @param {*} data
 * @returns
 */
export function editNodeDetailApi(data) {
  return request({
    url: '/api/vm-service/node/' + data.id,
    method: 'PUT',
    data
  })
}

/**
 * 删除点位
 * @param {*} id
 * @returns
 */
export function delNodeDetailApi(id) {
  return request({
    url: '/api/vm-service/node/' + id,
    method: 'DELETE'
  })
}
