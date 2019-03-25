<template>
  <div style="text-align: left">
    <button @click="$router.push({name:'detail'})">新增员工</button>
    <table>
      <tr>
        <th>姓名</th>
        <th>手机号码</th>
        <th>id</th>
        <th>账户</th>
        <th>操作</th>
      </tr>
      <tr v-for="item of list">
        <td><span class="l">{{item.name}}</span></td>
        <td><span class="l">{{item.MobilePhone}}</span></td>
        <td><span class="l">{{item.id}}</span></td>
        <td><span class="l">{{item.AccountData}}</span></td>
        <td><span @click="$router.push({name:'detail',query:{id:item.id}})">编辑员工</span> <span @click="topDelete(item)">删除员工</span></td>
      </tr>
    </table>

    <div class="fill-customer">
      <span class="add-btn" @click="select">选择乘客</span>
      <div>
        <div v-for="(item,index) of getFillCustomerGetter">
          <span class="delete" @click="deleteClick(item,index)"> - </span>
          <span class="customer-name">{{item.name}} <span class="col999">手机号：{{item.MobilePhone}}</span></span>
          <span class="edit" @click="editClick(item,'edit')">修改</span>
        </div>
      </div>
    </div>
   <div class="approver-list-wraper-bg" v-show="approverShow">
     <div class="approver-list-wraper">
       <approver-list ref="approverlist" @enterClick="enterClick" @cancelClick="cancelClick" @editClick="editClick"></approver-list>
     </div>
   </div>

    <div class="approver-list-wraper-bg" v-show="approverEditShow">
      <div class="approver-list-wraper">
        <approver-edit @enterClick="enterEditClick" @cancelClick="cancelEditClick"></approver-edit>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from "vuex";
  import ApproverList from "./approver/approver-list";
  import ApproverEdit from "./approver/approver-edit";

  export default {
    name: "list",
    components: {ApproverEdit, ApproverList},
    data() {
      return {
        approverShow:false,
        approverEditShow:false,
        addType:1,
        list: [],
        fillCustomer:[],
      }
    },
    computed:{
      ...mapGetters(['getFillCustomerGetter','getstoreEditCustomerGetter','getstoreaddApproverTypeGetter'])
    },
    created() {
      this.init();
    },
    methods: {
      /*上方乘客列表的事件*/
      init() {
        axios.get('http://localhost:3000/info').then( (res)=> {
          this.list = res.data;
          this.$store.dispatch('setFillCustomerAsync', [this.list[0],this.list[2],this.list[3]]);
        }).catch( (error) =>{
        });
      },
      topDelete(item){ // 删除
        if(confirm(`是否彻底删除 ${item.name}`)){
          axios.delete('http://localhost:3000/info/'+item.id).then( (res) => {
            console.log(res)
            this.init();
          }).catch(function (error) {
          });
        }
      },
      /*下方选择乘客的事件*/
      // 新增或修改弹出层--确定按钮
      enterEditClick(){
        this.approverEditShow = false;
        this.$nextTick(()=>{
          if(this.getstoreaddApproverTypeGetter === 2){
            console.log(2)
            const id = this.getstoreEditCustomerGetter.id;
            axios.patch('http://localhost:3000/info/'+id,{
              "name": this.getstoreEditCustomerGetter.name,
              "MobilePhone": this.getstoreEditCustomerGetter.MobilePhone,
            }).then( (res) => {
              console.log(res)
            }).catch(function (error) {
            });
          }
          if(this.getstoreaddApproverTypeGetter === 1){
            axios.post('http://localhost:3000/info',{
              "id":parseInt(Math.random()*10000000000),
              "AccountData": "fanjiaopenid0"+parseInt(Math.random()*100),
              "name": this.getstoreEditCustomerGetter.name,
              "password": "888888",
              "MobilePhone": this.getstoreEditCustomerGetter.MobilePhone,
              "CustomerType": 1,
              "Gender": 1
            }).then( (res) => {
             this.$refs.approverlist.init();
            }).catch(function (error) {
            });
          }
        })
      },
      // 新增或修改弹出层--取消
      cancelEditClick(){
        this.approverEditShow = false;
      },
      // 删除按钮已经选中的乘客
      deleteClick(item,index){
        this.getFillCustomerGetter.splice(index,1);
      },
      //点击修改或者新增乘客按钮
      editClick(item,type){
        // 修改乘客
        if(type && type === 'edit'){this.$store.dispatch('setstoreAddApproverTypeAsync', 2)}
        this.approverEditShow = true;
        this.$store.dispatch('setstoreEditCustomerAsync',item);
      },
      //选择乘客弹出层---确认按钮
      enterClick(){
        this.approverShow = false;
      },
      //选择乘客弹出层---取消按钮
      cancelClick(){
        this.approverShow = false;
      },
      // 点击选择乘客按钮
      select(){
        this.approverShow = true;
        this.$refs.approverlist.init();
      }
    }
  }
</script>

<style scoped>
  .approver-list-wraper-bg{position: fixed;background: rgba(0,0,0,0.6);top:0;right:0;bottom:0;left:0;z-index: 10;}
  .approver-list-wraper{width:500px;margin: 100px auto;background: #fff;padding: 10px 0;}
  .fill-customer{width:600px;margin: 30px;border:1px solid #d8d8d8;padding:20px;line-height: 30px;font-size: 12px;}
  .add-btn{display: block;width:100px;line-height: 30px;border:1px solid #ff6600;color:#ff6600;border-radius: 5px;text-align: center;margin-bottom: 10px;cursor: pointer}
  .delete{display: inline-block;cursor: pointer;color:red;border-radius: 50%;border:1px solid red;width:15px;height:15px;line-height: 15px;text-align: center;font-size: 20px;vertical-align: middle}
  .customer-name{display: inline-block;width:200px;}
  .col999{color:#999}
  .edit{display: inline-block;width:100px;cursor: pointer;color:blue;}
  .l{display: inline-block;width:200px;}
</style>
