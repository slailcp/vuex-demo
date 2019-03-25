import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const approverModule = {
  state: {
    addApproverType:1, // 新增乘客
    fillCustomer:[],
    storeEditCustomer:{
      name:'',
      MobilePhone:''
    }
  },
  actions: actions,
  getters: getters,
  mutations: mutations
}
