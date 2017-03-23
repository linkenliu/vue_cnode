<template>
  <div style="margin-bottom: 50px">
    <header style="background-color: #000;position: fixed;width: 100%;margin-top: -50px">
      <div>
        <div style="width: 8%">
          <div style="margin-top: 11px;padding-left: 15px">
            <i v-on:click="$router.go(-1)" style="color: #42b983;font-size: 30px" class=" fa fa-angle-left"></i>
          </div>
        </div>
        <div style="width: 100%;float: right;text-align: center;padding: 13px;padding-top: 10px;margin-top: -36px">
          <strong style="color: #42b983">登录</strong>
        </div>
      </div>
    </header>

    <div style="margin-top: 50px;width: 70%;margin-left: 15%;position: absolute">
      <div style="margin-top: 50px;border-bottom: 1px solid #e1e1e1;">
        <input placeholder="请输入token码"
               style="font-size: 14px;width: 100%;border: none;padding-top: 10px;padding-bottom: 10px;background: #fff"
               v-model="token"/>
      </div>
      <div style="width: 100%;margin-top: 20px">
        <button
          style="font-size: 14px;width: 100%;text-align: center;background: #80bd01;border: 1px solid #76ae01;border-radius: 5px;padding: 10px"
          @click="logo()">{{ logoState ? '正在登录中' : '登录' }}
        </button>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>


<script>
  import api from './../../api/index.js'
  import util from 'util'
  import {Toast} from 'mint-ui';
  export default {
    data () {
      return {
        token: 'ff4a62c2-17bd-4a92-b6e1-4c2228c06f6b',
        logoState:false,
        userInfo: {}
      }
    },
    methods: {
      logo(){
        if (!this.token) {
          return Toast({
            message: '请输入accesstoken'
          });
        }
        api.postToken({accesstoken: this.token}).then(res => {
          this.logoState = true;
          let status = res.status;
          let statusText = res.statusText;
          if ('200' == status && statusText == 'OK') {
            this.userInfo.avatar_url = res.data.avatar_url;
            this.userInfo.id = res.data.id;
            this.userInfo.loginname = res.data.loginname;
            this.userInfo.accesstoken = this.token;
            localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
            this.logoState = false;
            Toast({
              message: '登录成功'
            });
            this.$router.go(-1);
          } else {
            return Toast({
              message: '服务异常-001'
            });
          }
        })
      }
    }
  }
</script>


<style>
  input:focus{
    outline:none;
  }
</style>
