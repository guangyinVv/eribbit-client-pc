import { userAccountCheck } from '@/api/user'
// vee-validate校验规则函数
type SchemaType = {
  account:any,
  accountApi:any,
  password:any,
  mobile:any,
  code:any,
  isAgree:any,
  rePassword:any
}
const schema:SchemaType = {
  account(value: string | null) {
    // 规则：字母开头，6-20个字符之间
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z][a-zA-Z0-9]{5,19}$/.test(value)) return '用户名应以字母开头，长度为6-20,不能包含非法字符'
    return true
  },
  accountApi: async(value:string) => {
    // 规则：字母开头，6-20个字符之间
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z][a-zA-Z0-9]{5,19}$/.test(value)) return '用户名应以字母开头，长度为6-20,不能包含非法字符'
    const data:any = await userAccountCheck(value)
    if (data.result.valid) {
      return '用户名已存在'
    }
    return true

    return true
  },
  password(value: string | null) {
    if (!value) { return '请输入密码' }
    if (!/^[a-zA-Z0-9_]{6,24}$/.test(value)) return '密码长度应为6-24,不能包含非法字符'
    return true
  },
  mobile(value:string|null) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式不正确'
    return true
  },
  code(value:string|null) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码格式不正确'
    return true
  },
  isAgree(value:boolean) {
    if (!value) return '请先勾选登录协议'
    return true
  },
  rePassword(value:string, { form }:{form:{password:string, [key:string]:string}}) {
    if (!value) return '密码不能为空'
    if (value !== form.password) {
      return '密码不一致！'
    }
    return true
  }
}

export default schema
