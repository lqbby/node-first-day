import request from "@/utils/request";

/**
 * 获取一定日期范围之内的合作商分成汇总数据
 * @returns promise
 */
 export const getReconciliationApi = (params) =>
 request({
   url:'/api/order-service/report/partnerCollect',
   params
 });

/**
 * 获取一定时间范围之内的分成总数
 * @returns promise
 */
  export const totalBillApi= (params) =>
  request({
    url:'/api/order-service/report/totalBill',
    params
  });

/**
 * 获取一定时间范围之内的收入
 * @returns promise
 */
    export const orderAmountApi= (params) =>
    request({
      url:'/api/order-service/report/orderAmount',
      params
    });

/**
 * 获取一定时间范围之内的订单总数
 * @returns promise
 */
  export const orderCountApi= (params) =>
  request({
    url:'/api/order-service/report/orderCount',
    params
  });
 