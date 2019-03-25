import axios from  'axios';

export default {
  getLoginInfoAsync({ commit, state }, opt){
    commit('LOGININFO',opt)
  },
  // 登录
  LoginAsync ({ commit, state }, opt) {
    if (!opt.username) {
      opt.username = state.loginInfo.username;
    }
    if (!opt.password) {
      opt.password = state.loginInfo.password;
    }
    if(!opt.username || !opt.password){
      alert('账号密码不可以为空！');
      return;
    }
    return  new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/info',{
        params:{
          "name": opt.username,
          "password":  opt.password,
        }
      }).then(function (response) {
        resolve(response.data);
        localStorage.setItem('token',response.data[0].id)
        commit('UPDATEUSER',response.data[0])
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  // 注册
  RegisterAsync ({ commit, state }, opt) {
    if (!opt.username) {
      opt.username = state.loginInfo.username;
      opt.password = state.loginInfo.password;
    }
    if(!opt.username || !opt.password){
      alert('账号密码不可以为空！');
      return;
    }
    return  new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/info/',{
        "name": opt.username,
        "password":  opt.password,
        "sex": "男",
        "old": "10"
      }).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });
    })
  }
}
