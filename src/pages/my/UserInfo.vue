<template>
  <div style="margin-bottom: 50px">
    <header style="background-color: #000;position: fixed;width: 100%;margin-top: -50px">
      <div>
        <div style="width: 8%">
          <div style="margin-top: 11px;padding-left: 15px">
            <i v-on:click="$router.go(-1)" style="color: #42b983;font-size: 30px" class=" fa fa-angle-left"></i>
          </div>
        </div>
        <div style="width: 100%;float: right;text-align: center;padding-top: 10px;padding-bottom: 14px;margin-top: -36px">
          <strong style="color: #42b983">个人资料</strong>
        </div>
      </div>
    </header>
    <div
      style="margin-top: 3px;width: 100%;height: 240px;background-size:cover;position: fixed;background-image: url('http://pic.90sjimg.com/back_pic/u/00/28/77/06/55fb62dad2fe7.jpg')">
    </div>
    <div class="userlogo" style="text-align: center"  v-if="userInfo.avatar_url" :style="{backgroundImage: 'url(' + userInfo.avatar_url + ')'}">
      <span style="font-size: 16px;font-weight: bold;color: #000;line-height: 17;">{{userInfo.loginname}}</span>
    </div>

    <div style="position: fixed;margin-top: 200px;margin-left: 10px">
      <span style="font-size: 13px;color: #000">积分:<span style="color: #000">{{userInfo.score}}</span></span>
    </div>
    <div style="position: fixed;margin-top: 200px;width: 100%;text-align: right">
      <span style="font-size: 13px;padding-right: 10px;color: #000">注册:{{userInfo.create_at | formatDate}}</span>
    </div>

    <div style="position: absolute;margin-top: 243px;width: 100%;">
      <div style="position: fixed;width: 100%;text-align: center;">
        <div style="width: 50%;text-align: center;padding-top: 8px;padding-bottom: 8px;border-bottom: 1px solid #e1e1e1;background-color: #ffffff" @click="tabIndex = 1">
          <a v-bind:class="{bgactive:tabIndex==1}">主题</a>
        </div>
        <div @click="tabIndex = 2" style="width: 50%;text-align: center;float: right;margin-top: -40px;padding-bottom: 8px;padding-top: 8px;border-bottom: 1px solid #e1e1e1;border-left: 1px solid #e1e1e1;background-color: #ffffff">
          <a v-bind:class="{bgactive:tabIndex==2}">回复</a>
        </div>
      </div>
      <List v-show="tabIndex == 1" :list="recent_topics"></List>
      <List v-show="tabIndex == 2" :list="recent_replies"></List>
    </div>


  </div>
</template>


<script>
  import api from './../../api/index.js'
  import List from './List'
  export default {
    components: { List },
    data () {
      return {
        userInfo: {},
        recent_topics:[],
        recent_replies:[],
        tabIndex:1
      }
    },
    methods: {
      getUserInfo(){
        let userName = this.$route.params.userName;
        api.getUserInfo({userName:userName}).then(res =>{
          this.userInfo = res.data.data;
          this.recent_topics = res.data.data.recent_topics;
          this.recent_replies = res.data.data.recent_replies;
        });
      }
    },
    created (){
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

  .headimg {
    overflow: hidden;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-position: center center;
    background-size: cover;
  }
  .bgactive{
    color: #80bd01;
  }

</style>
