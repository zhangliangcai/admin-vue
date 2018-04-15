// 自定义业务函数模块
// auth.js
// 封装和用户授权想换函数

const userInfoKey = 'uesr-info'

export function saveUserInfo (userInfo) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

export function getToken () {
  return JSON.parse(getUserInfo()).token
}

export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}
