/**
 * 获取角色列表
 * @returns
 */
export const getRoleListAPI = () =>
  request({
    url: 'user-service/role'
  })

/**
 * 获取城市列表
 * @returns
 */
export const getCityListAPI = () =>
  request({
    url: '/vm-service/region/search'
  })

/**
 * 新增人员
 * @returns
 */
export const addRoleAPI = (data) =>
  request({
    url: '/user-service/user',
    method: 'POST',
    data
  })

/**
 * 编辑人员
 * @param {*} data
 * @returns
 */
export const upRoleAPI = (data) =>
  request({
    url: `/user-service/user/${data.id}`,
    data
  })
