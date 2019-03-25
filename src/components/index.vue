<template>
<div>
  <div class="hello">
    <h1>当前登录用户信息:</h1>
    姓名：{{getUserInfo.name}}<br/>
    手机号码：{{getUserInfo.MobilePhone}}<br/>
    账户：{{getUserInfo.AccountData}}<br/>
    密码：{{getUserInfo.password}}<br/>
    id：{{getUserInfo.id}}<br/><br/><br/><br/>
  </div>
</div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'

  export default {
        name: "index",
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed:{
      ...mapGetters(['getUserInfo'])
    },
    methods:{


    }
  }
</script>

<style scoped>

</style>
