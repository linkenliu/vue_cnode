<template>
  <div style="margin-bottom: 50px">
    <header style="background-color: #000;position: fixed;width: 100%;margin-top: -60px">
      <div>
        <div style="text-align: center;margin-top: 11px;padding: 15px;">
          <strong style="color:#42b983;">发表</strong>
        </div>
        <div style="float: right;width: 10%;margin-top: -42px;margin-right: 14px" @click="publish()">
          <strong style="color: #42b983;font-size: 22px;padding: 10px"><i class="fa fa-send-o"></i></strong>
        </div>
      </div>
    </header>

    <div style="position: absolute;width: 100%;margin-top: 10px">
      <div style="width: 100%;border-bottom:1px solid #e1e1e1;">
        <input v-model="form.title" style="border:none;width: 90%;padding: 15px;background-color: #ffffff"
               placeholder="请输入标题"/>
      </div>
      <br/>
      <div style="width: 100%;">
        <select style="width: 100%;height: 50px;border: none" v-model="form.tab">
          <option value="">请选择</option>
          <option value="share">分享</option>
          <option value="ask">问答</option>
          <option value="job">招聘</option>
        </select>
      </div>
      <br/>
      <div style="width: 100%;border-bottom:1px solid #e1e1e1;">
        <textarea v-model="form.content" placeholder="内容"
                  style="resize:none;border: none;width: 100%;min-height: 200px"></textarea>
      </div>

    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import api from './../../../api/index.js'
  import {Toast} from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    data () {
      return {
        form: {
            tab:''
        }
      }
    },
    methods: {
      publish(){
        let userInfo = localStorage.getItem('userInfo');
        let id = '';
        let accesstoken = '';
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          id = userInfo.id;
        }
        if (!id) {
          MessageBox.confirm('你还未登录,请登录.', '系统提示').then(action =>{
            this.$router.push({
              path: '/logo'
            })
          });
        } else {
          let {form} = this;
          if (!form.title) {
            return Toast({
              message: '标题不能为空'
            });
          }
          else if (!form.tab) {
            return Toast({
              message: '选项不能为空'
            });
          }
          else if (!form.content) {
            return Toast({
              message: '内容不能为空'
            });
          }
          let accesstoken = userInfo.accesstoken;
          form.accesstoken = accesstoken;
          api.postTopic(form).then(res =>{
              console.log(res)
            if(res.data.success){
              Toast({
                message: '发布成功'
              });
              this.$router.push({
                  path:'/'
              })
            }  else{
              Toast({
                message: '发布失败'
              });
            }
          });
        }
      }
    }
  }
</script>


<style>
  textarea:focus {
    outline: none;
  }

  input:focus {
    outline: none;
  }

  select {
    outline: none;
  }
</style>


