<template>
  <div style="margin-bottom: 50px">
    <header style="background-color: #000;position: fixed;width: 100%;margin-top: -50px">
      <div>
        <div style="width: 8%">
          <div style="margin-top: 11px;padding-left: 15px">
            <i v-on:click="$router.go(-1)" style="color: #42b983;font-size: 30px" class=" fa fa-angle-left"></i>
          </div>
        </div>
        <div
          style="width: 100%;float: right;text-align: center;padding-top: 10px;padding-bottom: 14px;margin-top: -36px">
          <strong style="color: #42b983">我的主题</strong>
        </div>
      </div>
    </header>
    <div style="padding-top: 10px;margin-top: 50px">
      <Loading v-show='loadingFlag'></Loading>
      <div v-if="recent_topics.length">
        <List :list="recent_topics" style="margin: 0"></List>
      </div>
    </div>
  </div>
</template>


<script>
  import api from './../../api/index.js'
  import List from './List'
  import Loading from '@/components/Loading'
  export default {
    components: {List, Loading},
    data () {
      return {
        recent_topics: [],
        loadingFlag: false
      }
    },
    methods: {
      getRecentTopics(){
        let self = this;
        self.recent_topics = [];
        let userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let userName = userInfo.loginname;
        if (!userName) {
          return;
        }
        self.loadingFlag = true;
        setTimeout(() => {
          api.getUserInfo({userName: userName}).then(res => {
            self.loadingFlag = false;
            self.recent_topics = res.data.data.recent_topics;
          }, 500);
        });
      }
    },
    created (){
      this.getRecentTopics();
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

  .bgactive {
    color: #80bd01;
  }

  a {
    color: #000;
  }

</style>
