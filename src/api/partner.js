import request from '@/utils/request'

/**
 * 搜索合作商
 * @param {*} params
 * @returns
 */
export function getPartnerSearchApi(params) {
  return request({
    url: '/api/user-service/partner/search',
    params
  })
}

/**
 *添加合作商
 * @param {*} body
 * @returns
 */
export function addPartnerListApi(data) {
  return request({
    url: '/api/user-service/partner',
    method: 'POST',
    data
  })
}

/**
 *编辑合作商
 * @param {*} data
 * @returns
 */
export function editPartnerListApi(data) {
  return request({
    url: '/api/user-service/partner/' + data.id,
    method: 'PUT',
    data
  })
}

/**
 * 重置合作商密码
 * @param {*} data
 * @returns
 */
export function resetPartnerMessageApi(id) {
  return request({
    url: '/api/user-service/partner/resetPwd/' + id,
    method: 'PUT'
  })
}

/**
 * 删除合作商
 * @param {*} id
 * @returns
 */
export function delPartnerApi(params) {
  return request({
    url: '/api/user-service/partner/' + params.id,
    method: 'DELETE',
    params
  })
}
