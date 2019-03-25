import { FILLCUSTOMER, STOREEDITCUSTOMER ,ADDAPPROVERTYPE} from './mutations-types'

export default {
  // 更新界面上选择的乘客
  [FILLCUSTOMER] (state, opt){ //  opt是一个数组
    state.fillCustomer = opt;
  },
  [STOREEDITCUSTOMER] (state, opt){ //  opt是一个{ }
    state.storeEditCustomer = opt;
  },
  [ADDAPPROVERTYPE] (state, opt){ //  opt是一个number
    state.addApproverType = opt;
  },



}
