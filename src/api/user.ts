// 用户相关的接口（登录、注册等）
import request from '@/utils/request'
import { AxiosResponse } from 'axios'

/**
 * 账号密码登录
 * @param account -账号
 * @param password -密码
 * @returns {Promise}
 */
export const userAccountLogin = (account:string, password:string) => {
  return request('/login', 'post', { account, password })
}

/**
 * 获取手机号的短信验证码
 * @param mobile -手机号
 * @returns {Promise}
 */
export const userMobileLoginMsg = (mobile:string) => {
  return request('/login/code', 'get', { mobile })
}

/**
 * 使用手机号登录
 * @param mobile -手机号
 * @param code -验证码
 * @returns {Promise}
 */
export const userMobileLogin = (mobile:string, code:string) => {
  return request('/login/code', 'post', { mobile, code })
}
type QQLoginType = (unionId:string, source?:number)=>Promise<AxiosResponse<any, any>>
/**
 * QQ登录
 * @param unionId 用户标识
 * @param source 客户端类型，固定1（PC）
 * @returns {Promise}
 */
export const userQQLogin:QQLoginType = (unionId, source = 1) => {
  return request('/login/social', 'post', { unionId, source })
}
