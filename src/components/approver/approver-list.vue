<template>
  <div class="approver">
    <div class="customer-list">
      <div class="add-passenger" @click="editClick('','add')">+新增入住人</div>
      <div class="passenger-tip">已选入住人列表</div>
      <ul class="passenger-list">
        <li class="ii" v-for="(item,index) of select">
          <label class="l select-box" @click="selectClick(item,index)">
            <div class="l-l">
            <span class="box">
              <span class="checkbox selected"></span>
            </span>
            </div>
            <div class="l-r">
              <div class="name">{{item.name}} <span class="self" v-if="item.self">本人</span></div>
              <div class="tel">手机号码：{{item.MobilePhone}}</div>
            </div>
          </label>
          <div class="r">
            <div class="edit" @click="editClick(item,'edit')">修改</div>
          </div>
        </li>
      </ul>
      <div class="passenger-tip">未选入住人列表</div>
      <ul class="passenger-list">
        <li class="ii"  v-for="(item,index) of noselect">
          <label class="l select-box" @click="noselectClick(item,index)">
            <div class="l-l">
            <span class="box">
              <span class="checkbox"></span>
            </span>
            </div>
            <div class="l-r">
              <div class="name">{{item.name}} <span class="self" v-if="item.self">本人</span></div>
              <div class="tel">手机号码：{{item.MobilePhone}}</div>
            </div>
          </label>
          <div class="r">
            <div class="edit" @click="editClick(item,'edit')">修改</div>
          </div>
        </li>
      </ul>
      <div class="add-enter"  @click="enterClick">确定</div>
      <div class="add-enter"  @click="cancelClick">关闭</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {
    name: "approver-list",
    data(){
      return{
        list:[],
        select:[],
        noselect:[]
      }
    },
    computed:{
      ...mapGetters(['getFillCustomerGetter','getstoreEditCustomerGetter','getstoreaddApproverTypeGetter'])
    },
    created(){
      this.init();
      console.log(this.getFillCustomerGetter)
    },
    methods:{
      editClick(item,type) {
        type === 'add' ? this.$store.dispatch('setstoreAddApproverTypeAsync', 1) : this.$store.dispatch('setstoreAddApproverTypeAsync', 2)
        this.$emit('editClick', item ? item : {
          name: '',
          MobilePhone: ''
        })
      },
      enterClick(){
        this.$emit('enterClick')
        this.$store.dispatch('setFillCustomerAsync', this.select);
      },
      cancelClick(){
        this.$emit('cancelClick')
      },
      selectClick(item,index){
        this.noselect.unshift(item);
        this.select.splice(index,1);
      },
      noselectClick(item,index){
        this.select.push(item);
        this.noselect.splice(index,1);
      },
      init() {
        axios.get('http://localhost:3000/info').then( (res)=> {
          this.list = res.data;

          this.select = this.list.filter(items => {
            let v = false;
            this.getFillCustomerGetter.forEach(cus => {
              if(cus.id === items.id){ v = true;}
            })
            return v;
          })

          this.noselect = this.list.filter(items => {
            let v = true;
            this.getFillCustomerGetter.forEach(cus => {
              if(cus.id === items.id){v = false;}
            })
            return v;
          })
          console.log(this.getFillCustomerGetter)
          console.log(this.select)
          console.log(this.noselect)
        }).catch( (error) =>{
        });
      }
    }
  }
</script>

<style scoped lang="less">
  label.select-box{display:block;zoom: 1;}
  label.select-box:after{content:".";display:block;visibility:hidden;height:0;clear:both;}
  .select-box .checkbox{width:20px;height:20px;background:url(../../assets/pitchup_icon.png) no-repeat center center;float:left;background-size:contain;}
  .select-box input[type=checkbox][type=checkbox]{display:none;}
  .select-box input:checked+.checkbox{width:20px;height:20px;padding:0.07rem;background:url(../../assets/pitchon_icon.png) no-repeat;background-size:contain;}


  .self {
    display: inline-block;
    padding: 2px 5px;
    border: 1px solid #ff6e00;
    font-size: .2rem;
    color: #ff6e00;
    vertical-align: middle;
    border-radius: 3px;
  }

  .checkbox.selected {
    border-color: #2a86e8;
    background: url('../../assets/Checked_icon.png') no-repeat center center;
    background-size: 20px 20px;
  }
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
  .add-passenger {
    text-align: center;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    margin: 10px 10px 10px;
    border-radius: 2px;
    padding-bottom:10px;
    color: #378eeb;
    font-size: 12px;
  }

  .passenger-tip {
    padding: 10px 20px ;
    font-size: 12px;
    color: #999
  }

  .passenger-list {
    background: #fff;
    padding-left: 15px;
    margin:0;
    .ii {
      display: flex;
      border-bottom: 1px solid #d8d8d8;
      padding: 10px 0;
      .l {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .l-l {
        flex: 0 0 40px;
        width: 40px;
        display: flex;
        justify-content: left;
        align-items: left;
        .box {
          display: block;
        }
        .name {
          color: #333
        }
        .tel {
          color: #999
        }
      }
      .l-r {
        flex: 4;
        .name {
          color: #333;
          font-size: 12px;
        }
        .tel {
          color: #999;
          font-size: 12px;
        }
      }
      .r {
        flex: 0 0 50px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        .edit {
         font-size: 12px;color:blue;cursor: pointer;
        }
      }
    }
    .ii:last-child {
      border-bottom: 0;
    }
  }
</style>
