import request from '@/utils/request'
/**
 * 商品类型搜索
 * @returns promise
 */
export const getGoodsList = (params) =>
  request({
    url: '/api/vm-service/skuClass/search',
    params
  })

/**
 * 新增商品类型
 * @param {String} data className
 * @returns promise
 */
export const addGoodsType = (data) =>
  request({
    url: '/api/vm-service/skuClass',
    method: 'POST',
    data
  })

/**
 *  删除商品类型
 * @param {Number} classId  商品类型id
 * @returns promise
 */
export const delGoodsType = (classId) =>
  request({
    url: '/api/vm-service/skuClass/' + classId,
    method: 'DELETE'
  })

/**
 * 修改商品类型
 * @param {Number} classId 需要修改的商量类型id
 * @returns promise
 */
export const editGoodsType = (data) =>
  request({
    url: '/api/vm-service/skuClass/' + data.classId,
    method: 'PUT',
    data
  })

// 以下都是商品管理接口
/**
 * 商品搜索
 * @returns promise
 */
export const getGoodsSearch = (params) =>
  request({
    url: '/api/vm-service/sku/search',
    params
  })

/**
 *新增商品
 * @param {Object} data
 * @returns promise
 */
export const addGoods = (data) =>
  request({
    url: '/api/vm-service/sku',
    method: 'POST',
    data
  })

/**
 * 修改商品
 * @param {Object} data
 * @returns promise
 */
export const editGoods = (data) =>
  request({
    url: '/api/vm-service/sku/' + data.skuId,
    method: 'PUT',
    data
  })

/**
 * 商品数据导入
 * @param {String} data fileName 	文件名
 * @returns promise
 */
export const uploadGoods = (data) =>
  request({
    url: '/api/vm-service/sku/upload',
    method: 'POST',
    data
  })
