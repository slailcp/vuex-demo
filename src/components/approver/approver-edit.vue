<template>
    <div class="customer-edit">
      <div>{{getstoreaddApproverTypeGetter === 1?'新增':'修改'}}</div>
            姓名:<input type="text" placeholder="姓名" @blur="setstoreEditCustomerAsync()" v-model="getstoreEditCustomerGetter.name"/><br/><br/>
      手机号:<input type="text" placeholder="手机号" @blur="setstoreEditCustomerAsync()" v-model="getstoreEditCustomerGetter.MobilePhone"/><br/>
      <div class="add-enter"  @click="enterClick">确定</div>
      <div class="add-enter"  @click="cancelClick">关闭</div>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
    export default {
      name: "approver-edit",
      data(){
        return{
          name:'',
          MobilePhone:''
        }
      },
      computed:{
        ...mapGetters(['getstoreEditCustomerGetter','getstoreaddApproverTypeGetter']),
      },
      methods: {
        setstoreEditCustomerAsync(){
          this.$store.dispatch('setstoreEditCustomerAsync',this.getstoreEditCustomerGetter)
        },
        enterClick(){
          this.$emit('enterClick')
        },
        cancelClick(){
          this.$emit('cancelClick')
        },
      }
    }
</script>

<style scoped>
  .customer-edit{text-align: center}
  .add-enter{
    text-align: center;
    border-top: 1px solid #e8e8e8;
    background: #fff;
    margin: 10px 10px 10px;
    border-radius: 2px;
    padding-top:10px;
    padding-bottom:10px;
    color: #378eeb;
    font-size: 12px;
    cursor: pointer;
  }
</style>
