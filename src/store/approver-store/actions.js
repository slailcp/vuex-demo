import {FILLCUSTOMER, STOREEDITCUSTOMER} from "./mutations-types";

export default {
  // 修改FillCustomer的数据
  setFillCustomerAsync({ commit, state }, opt){
    console.log(opt)
    commit('FILLCUSTOMER',opt)
  },
  setstoreEditCustomerAsync({ commit, state }, opt){
    console.log(opt)
    commit('STOREEDITCUSTOMER',opt)
  },
  setstoreAddApproverTypeAsync({ commit, state }, opt){
    commit('ADDAPPROVERTYPE',opt)
  }
}
