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
/**
 * QQ绑定
 * @param param0 - unionId是QQ的唯一标识，mobile和code是参数
 * @returns {Promise}
 */
export const userQQBindLogin = ({ unionId, mobile, code }:{unionId:string, mobile:string, code:string}) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}
/**
 * 获取QQ绑定时候的手机验证码
 * @param mobile -手机号
 * @returns {Promise}
 */
export const userQQBindCode = (mobile:string) => {
  return request('/login/social/code', 'get', { mobile })
}
/**
 * 校验用户名是否唯一
 * @param account -手机号
 * @returns {Promise}
 */
export const userAccountCheck = (account:string) => {
  return request('/register/check', 'get', { account })
}

/**
 * QQ绑定完善信息时发送验证码
 * @param mobile -手机号
 * @returns {Promise}
 */
export const userQQPatchCode = (mobile:string) => {
  return request('/register/code', 'get', { mobile })
}
type userQQPatchLoginType = ({ unionId, mobile, code, account, password }:{ unionId: string, mobile: string, code: string, account: string, password: string })=>any
export const userQQPatchLogin:userQQPatchLoginType = ({ unionId, mobile, code, account, password }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}
