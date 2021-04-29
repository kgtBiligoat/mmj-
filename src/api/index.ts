import { AxiosRequestConfig, AxiosResponse } from 'axios'
import $http from './axios.config'

export function login(parmas: any) {
  const url = '/login'
  return $http.post(url, {
    username: parmas.username,
    password: parmas.password
  })
  .then((res: any) => res.data)
}

export function regist(parmas: any) {
  const url = '/register'
  return $http.post(url, {
    username: parmas.username,
    password: parmas.password
  })
  .then((res: any) => res.data)
}

export function logout() {
  const url = '/user/logout'
  return $http.post(url)
  .then((res: any) => res.data)
}

export function askLeave(parmas: any) {
  const url = '/leaveFormCreate'
  return $http.post(url, {
    userId: parmas.userId,
    formType: parmas.formType,
    startTime: parmas.startTime,
    endTime: parmas.endTime,
    reason: parmas.reason
  })
  .then((res: any) => res.data)
}