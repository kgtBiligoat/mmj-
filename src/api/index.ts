import { AxiosRequestConfig, AxiosResponse } from 'axios'
import $http from './axios.config'

export function login(parmas: any) {
  const url = '/login'
  return $http.post(url, {
    userName: parmas.username,
    password: parmas.password
  })
  .then((res: any) => res.data)
}

export function regist(parmas: any) {
  const url = '/register'
  return $http.post(url, {
    userName: parmas.username,
    password: parmas.password
  })
  .then((res: any) => res.data)
}

export function get() {
  const url = '/register'
  return $http.get(url).then((res: any) => res.data)
}