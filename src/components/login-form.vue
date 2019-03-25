<template>
    <div>
      <div><input type="text" @blur="getLoginInfoAsync({username,password})" v-model="username" placeholder="请输入姓名" /></div>
      <div><input type="text" @blur="getLoginInfoAsync({username,password})" v-model="password" placeholder="请输入密码" /></div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "login-form",
      data() {
        return {
          username:'',
          password: ''
        }
      },
      methods: {
        ...mapActions({
          getLoginInfoAsync:'getLoginInfoAsync'
        })
      }
    }
</script>

<style scoped>

</style>
