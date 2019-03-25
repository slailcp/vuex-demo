import { UPDATEUSER, LOGININFO } from './mutations-types'

export default {
  // 更新当前用户
  [UPDATEUSER] (state, opt) {
    state.userInfo.id = opt.id;
    state.userInfo.name = opt.name;
    state.userInfo.AccountData = opt.AccountData;
    state.userInfo.password = opt.password;
    state.userInfo.MobilePhone = opt.MobilePhone;
    state.userInfo.CustomerType = opt.CustomerType;
    state.userInfo.Gender = opt.Gender;

  },
  // 当前登录的账号密码
  [LOGININFO] (state, opt){
    console.log(opt)
    state.loginInfo.username = opt.username;
    state.loginInfo.password = opt.password;
  }
}
