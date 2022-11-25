import request from '@/utils/request'

// 登录
export const login = (data) => request.post('api/user-service/user/login', data)

// 获取个人信息
export const userInfo = (id) => {
  return request({
    url: `/api/user-service/user/${id}`
  })
}
