<template>
    <div>
      <div>{{$route.query.id?'修改':'新增'}}</div>
      姓名：<input type="text" placeholder="请输入姓名" v-model="info.name"/><br/>
      电话：<input type="text" placeholder="请输入电话" v-model="info.MobilePhone"/><br/>
      账户：<input type="text" placeholder="请输入账户" v-model="info.AccountData"/><br/>
      乘客类型：<input type="text" placeholder="请输入乘客类型" v-model="info.CustomerType"/><br/>
      密码：<input type="text" placeholder="请输入密码" v-model="info.password"/><br/>
      <button @click="save">保存</button>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "detail",
      data(){
        return{
          info:{
            "AccountData": "",
            "name": "",
            "password": "",
            "MobilePhone": "",
            "CustomerType": 1,
          }
        }
      },
      created(){
        if(this.$route.query.id) { // 修改
          this.init();
        }

      },
      methods:{
        save(){
          if(this.$route.query.id){ // 修改
            const id = this.$route.query.id;
            axios.patch('http://localhost:3000/info/'+id,{
              "AccountData":this.info.AccountData,
              "name": this.info.name,
              "password": this.info.password,
              "MobilePhone": this.info.MobilePhone,
              "CustomerType": this.info.CustomerType,
            }).then( (res) => {
              console.log(res)
              this.$router.push({name:'list'})
            }).catch(function (error) {
            });
          }
          if(!this.$route.query.id){ // 新增
            axios.post('http://localhost:3000/info',{
              "id":parseInt(Math.random()*10000000000),
              "AccountData":this.info.AccountData,
              "name": this.info.name,
              "password": this.info.password,
              "MobilePhone": this.info.MobilePhone,
              "CustomerType": this.info.CustomerType,
              "Gender": 1
            }).then( (res) => {
              console.log(res);
              this.$router.push({name:'list'})
            }).catch(function (error) {
            });
          }
        },
        init(){
          axios.get('http://localhost:3000/info',{params:{id:this.$route.query.id}}).then( (res)=> {
            this.info = res.data[0];
          }).catch( (error) =>{
          });
        }
      }
    }
</script>

<style scoped>

</style>
