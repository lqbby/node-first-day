import request from '@/utils/request'

/**
 * 获取区域列表
 * @param {Object} params
 * @returns
 */
export function getAreaListApi(params) {
  return request({
    url: '/api/vm-service/region/search',
    params
  })
}

/**
 * 添加区域
 * @param {*} data
 * @returns
 */
export function addAreaListApi(data) {
  return request({
    url: '/api/vm-service/region',
    method: 'POST',
    data
  })
}

/**
 * 获取区域详情
 * @param {*} id
 * @returns
 */
export function getAreaDetailApi(id) {
  return request({
    url: '/api/vm-service/region/' + id
  })
}

/**
 * 编辑区域
 * @param {*} data
 * @returns
 */
export function editAreaDetailApi(data) {
  return request({
    url: '/api/vm-service/region/' + data.id,
    method: 'PUT',
    data
  })
}

/**
 * 区域详情
 * @param {*} params
 * @returns
 */
export function getAreanodelApi(params) {
  return request({
    url: '/api/vm-service/node/search',
    params
  })
}

/**
 * 删除区域
 * @param {*} id
 * @returns
 */
export function DelAreaDetaillApi(id) {
  return request({
    url: '/api/vm-service/region/' + id,
    method: 'DELETE'
  })
}
