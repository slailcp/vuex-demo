/*
* actions:在methods里面的方法
* getter 在computed里面的方法
* mutation 中间量，不应该在外面去操作它
*
* */


import Vue from 'vue'
import Vuex from 'vuex'
import {loginModule} from './login-store'
import {approverModule} from './approver-store'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    loginModule: loginModule,
    approverModule:approverModule
  }
})

export default store



/*
*const moduleA = {
    state: { ... },
    getters: { ... }
    mutations: { ... }
};

const moduleB = {
    state: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
};

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
});

console.log(store.state.a); // moduleA 的 state
* */








