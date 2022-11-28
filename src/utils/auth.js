import Cookies from 'js-cookie'

const TokenKey = 'likede_token'
const TokenKey1 = 'app_user_name'
const TokenKey2 = 'app_user_id'
const TokenKey3 = 'app_token'

export function getToken() {
  return Cookies.get(TokenKey)
}



export function setToken1(token) {
  return Cookies.set(TokenKey1, token)
}
export function setToken2(token) {
  return Cookies.set(TokenKey2, token)
}
export function setToken3(token) {
  return Cookies.set(TokenKey3, token)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
