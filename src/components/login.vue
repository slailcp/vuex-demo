<template>
  <div>
    <div v-if="loginshow">
      <sheader>登录</sheader>
      <login-form/>
      <p class="content-block"><a href="javascript:;" @click="loginbtn" class="button button-fill button-success">登录</a></p>
      <p class="content-block"><a href="javascript:;" @click="loginshow = false" class="button button-fill button-success">去注册</a></p>
    </div>
    <div v-if="!loginshow">
      <sheader>注册</sheader>
      <login-form/>
      <p class="content-block"><a href="javascript:;" @click="registerbtn" class="button button-fill button-success">注册</a></p>
      <p class="content-block"><a href="javascript:;" @click="loginshow = true" class="button button-fill button-success">去登录</a></p>

    </div>
  </div>

</template>

<script>
    import Sheader from "./sheader";
    import LoginForm from "./login-form";
    import { mapActions,mapGetters } from 'vuex'
    export default {
        name: "login",
      data(){
          return{
            loginshow:true
          }
      },
      components: {LoginForm, Sheader},
      beforeRouteEnter(to, from, next){
        next(vm => {
          if (localStorage.getItem('token')) {  // store获取当前的token是否存在
            vm.$router.push({path:from.path});
          }
        });
      },
      created(){
        // this.$store.dispatch('increment');
        // this.increment()
        console.log(this.$route.query)
      },
      computed:{
        ...mapGetters(['getUserInfo','getLoginInfo'])
      },
      methods:{
        loginbtn(){
          this.$store.dispatch('LoginAsync',{}).then((res)=>{
            if(res.length === 0){
              alert('账号密码错误');
              return;
            }
            if(this.$route.query.redirect){
              this.$router.push({path:this.$route.query.redirect});
            }else{
              this.$router.push({path:'/index'});
            }

          }).catch((err)=>{console.log(err)})
        },
        registerbtn(){
          this.$store.dispatch('RegisterAsync', {}).then((res)=>{
            this.loginbtn()
          }).catch((err)=>{console.log(err)})
        },
        ...mapActions([
          'LoginAsync','RegisterAsync'
        ])
      }
    }
</script>

<style scoped>

</style>
