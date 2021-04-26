import Axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

export const defaultSourceType = Symbol('common')

export type SourceType = symbol | string

export const reuseSources = new Map<SourceType, CancelTokenSource>()

// 复用source
export function getSource(type: SourceType = defaultSourceType) {
  if (!reuseSources.has(type)) {
    reuseSources.set(type, Axios.CancelToken.source())
  }
  return reuseSources.get(type)!
}

export function cancelRequest(type: SourceType = defaultSourceType) {
  const source = getSource(type)
  source.cancel()
  reuseSources.set(type, Axios.CancelToken.source())
}

export interface AxiosRequestConfigWithSourceType extends AxiosRequestConfig {
  sourceType?: SourceType
}

export function reqInterceptor(config: AxiosRequestConfig) {
  const configWithSourceType = config as AxiosRequestConfigWithSourceType
  const token = getSource(configWithSourceType.sourceType).token
  configWithSourceType.cancelToken = token
  return config
}
