<template>
  <div>
    <div style="margin-bottom: 50px;background-color: #F7F7F7">
      <header style="background-color: #000;position: fixed;width: 100%;margin-top: -60px">
        <div>
          <div style="text-align: center;margin-top: 10px;padding: 15px;">
            <strong style="color: #42b983">个人中心</strong>
          </div>
          <div style="float: right;width: 10%;margin-top: -42px;margin-right: 14px" @click="logout()">
            <strong style="color: #42b983;font-size: 22px;padding: 10px"><i class="fa fa-snowflake-o"></i></strong>
          </div>
        </div>
      </header>
      <div
        style="margin-top: 3px;width: 100%;height: 240px;background-size:cover;position: fixed;background-image: url('http://pic.90sjimg.com/back_pic/u/00/28/77/06/55fb62dad2fe7.jpg')">

      </div>

    </div>

    <div class="userlogo" @click="toUserInfo()" v-if="userInfo.avatar_url"
         :style="{backgroundImage: 'url(' + userInfo.avatar_url + ')'}">

    </div>

    <div class="userlogo" @click="logo()" v-if="!userInfo.avatar_url">
      <span style="font-size: 13px;color: #80bd01;line-height: 9;margin-left: 40px">请登录</span>
    </div>

    <div style="position: fixed;border: 1px solid #e1e1e1;background-color: #F7F7F7;width: 100%;margin-top: 260px">
      <div @click="toMyTheme()" style="padding: 15px"><i class="icon-leaf"></i> &nbsp;<span
        style="font-size: 13px">我的主题</span>
        <div style="float: right;color: #ccc"><i class="fa fa-angle-right"></i></div>
      </div>
    </div>

    <div style="position: fixed;border: 1px solid #e1e1e1;background-color: #F7F7F7;width: 100%;margin-top: 343px">
      <div @click="toMsg()" style="padding: 15px;"><i class="icon-envelope-alt"></i> &nbsp;<span
        style="font-size: 13px">我的消息</span>
        <div style="float: right;color: #ccc"><i class="fa fa-angle-right"></i></div>
      </div>
    </div>

    <div style="position: fixed;border: 1px solid #e1e1e1;background-color: #F7F7F7;width: 100%;margin-top: 428px"
         @click="toAbout()">
      <div style="padding: 15px"><i class=" icon-info-sign"></i> &nbsp;<span style="font-size: 13px">关于</span>
        <div style="float: right;color: #ccc"><i class="fa fa-angle-right"></i></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>


<script>
  import api from './../../api/index.js'
  import { MessageBox } from 'mint-ui';
  export default {
    data () {
      return {
        userInfo: {}
      }
    },
    methods: {
      logo (){
        this.$router.push({
          path: '/logo'
        })
      },
      getUserInfo (){
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          this.userInfo = JSON.parse(userInfo);
        }
      },
      toUserInfo(){
        let userInfo = localStorage.getItem('userInfo');
        let userName = '';
        if (userInfo) {
          this.userInfo = JSON.parse(userInfo);
          userName = this.userInfo.loginname;
        }
        this.$router.push({
          path: '/userInfo/' + userName
        })
      },
      toMsg (){
        let userInfo = localStorage.getItem('userInfo');
        let id = '';
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
          this.$router.push({
            path: '/msg'
          })
        }
      },
      toMyTheme (){
        let userInfo = localStorage.getItem('userInfo');
        let id = '';
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
          this.$router.push({
            path: '/myTheme'
          })
        }
      },
      toAbout(){
        this.$router.push(
          {
            path:'/about'
          }
        )
      },
      logout(){
        let userInfo = localStorage.getItem('userInfo');
        let id = '';
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          id = userInfo.id;
        }
        if(!id){
          this.$router.push({
            path:'/logo'
          })
        }else{
          MessageBox.confirm('你确认要退出吗?', '系统提示').then(action =>{
            localStorage.setItem('userInfo',JSON.stringify({}));
            this.$router.push({
              path:'/logo'
            })
          });
        }
      }
    },
    created () {
      this.getUserInfo();
    }
  }
</script>


<style>
  .userlogo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #ccc;
    position: fixed;
  }

  @media screen and (max-width: 768px) {
    .userlogo {
      margin-left: 34%;
      margin-top: 20%;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 960px) {
    .userlogo {
      margin-left: 42%;
      margin-top: 13%;
    }
  }

  @media screen and (min-width: 960px) {
    .userlogo {
      margin-left: 46%;
      margin-top: 5%;
    }
  }
</style>



