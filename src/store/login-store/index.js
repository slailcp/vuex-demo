import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const loginModule = {
  state: {
    loginInfo:{
      username:'',
      password:''
    },
    userInfo:{
      "id":"","AccountData":"","name":"","password":"","MobilePhone":"","CustomerType":1,"Gender":1
    }
  },
  actions: actions,
  getters: getters,
  mutations: mutations
}
