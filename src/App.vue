<template>
  <div id="app">
    <div class="navs" v-if="$route.name !== 'login'">
      <span class="nav" @click="$router.push({path:'/index'})">首页</span>
      <span class="nav" @click="$router.push({path:'/list',query:{a:1,b:2,c:3}})">列表页</span>
      <span class="logout" @click="logOut">退出登录</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    console.log(this.$route)
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  methods:{
    logOut(){
      localStorage.removeItem('token');
      this.$store.commit('UPDATEUSER',{username:'',password:''})
      this.$store.commit('LOGININFO',{ "name": "",
        "password":"",
        "sex": "",
        "old": "",
        "id": ""})
      this.$router.push({path:'/'});
    }
  }
}
</script>

<style>
#app{padding:30px 20px;text-align: center;width: 960px;}
.navs{width: 960px;left:50%;background: pink;padding:20px;margin-bottom: 20px;text-align: left}
.navs .nav{padding:20px;cursor: pointer}
.logout{float: right;}
</style>
