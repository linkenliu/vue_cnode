<template>
  <div style="margin-bottom: 50px">
    <header style="background-color: #000;position: fixed;width: 100%;margin-top: -60px">
      <div>
        <div style="width: 8%">
          <div style="margin-top: 11px;padding-left: 15px">
            <i v-on:click="$router.go(-1)" style="color: #42b983;font-size: 30px" class=" fa fa-angle-left"></i>
          </div>
        </div>
        <div style="width: 100%;float: right;text-align: center;padding: 13px;padding-top: 10px;margin-top: -36px">
          <strong style="color: #42b983">主题详情</strong>
        </div>

      </div>
    </header>
    <div>
      <div style="margin-top: 60px;width: 100%">
        <Loading v-show='loadingFlag'></Loading>
        <div>
          <div style="border-bottom: 1px solid #e1e1e1;padding-left: 5px;height: 45px;">
            <img class="headimg" v-bind:src="avatar_url" @click="toUserInfo(loginname)"/>
            <div style="display: block;margin-top: -33px;margin-left: 37px;">
              <strong @click="toUserInfo(loginname)" style="font-size: 13px;color: #000">{{loginname}}</strong>
              <time style="color: #2ECC71;font-size: 13px">{{ topic.create_at | formatDate }}</time>
              <span style="font-size: 13px;float: right;margin-right: 20px">#作者</span>
            </div>
          </div>
        </div>
        <h3 class="title" style="padding-left: 10px;padding-right: 10px">{{topic.title}}</h3>
        <div class="content"  v-html="topic.content"></div>
      </div>

      <div v-if="replies.length" style="font-size: 13px;font-weight: bold;border-top: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding: 7px">
        共(<em style="color: #80bd01">{{ replies.length }}</em>)条回复
      </div>

      <div v-for="(item,$index) in replies">
        <div style="padding: 5px 0px;margin-top:8px;">
          <div style="border-bottom: 1px solid #e1e1e1;padding-left: 5px ">
            <img class="headimg" v-bind:src="item.author.avatar_url" @click="toUserInfo(item.author.loginname)"/>
            <div style="display: block;margin-top: -33px;margin-left: 37px;">
              <strong @click="toUserInfo(item.author.loginname)" style="font-size: 13px;color: #80bd01">{{item.author.loginname}}</strong>
              <time style="color: #2ECC71;font-size: 13px">{{ item.create_at | formatDate }}</time>
              <span style="font-size: 13px;float: right;margin-right: 10px">#{{$index+1}}</span>
              <div style="font-size: 14px" v-html="item.content">
              </div>

              <div style="margin-bottom: 5px">
                <i class="fa fa-thumbs-o-up"></i>
                <i class=" fa fa-commenting-o" style="margin-left: 30px"></i>
              </div>

            </div>

          </div>

        </div>
      </div>


      <div v-if="userInfo.id">
        <div>
          <textarea placeholder="发表你的看法" v-model="replie_text" style="resize:none;border:  1px solid #e1e1e1;border-radius: 4px;margin-left: 10px;margin-top: 20px;width: 93%;min-height: 60px"></textarea>
        </div>

        <div style="width: 100%;margin-top: 0px;">
          <button
            style="float: right;margin-right: 11px;font-size: 14px;width: 80px;text-align: center;background: #80bd01;border: 1px solid #76ae01;border-radius: 5px;padding: 5px"
          ><span style="color: #fff" @click="toReplies()">确定</span>
          </button>
        </div>
      </div>

      <div style="text-align: center;" v-if="!userInfo.id">
        <div style="width: 100%;font-size: 13px;bottom: 0px;margin-top: 15px;color: #000">
          请还未登录,请先<span style="color: #80bd01">&nbsp;<span @click="logo()">登录</span></span>
        </div>
      </div>
    </div>



  </div>

</template>

<script>
  import api from './../../../api/index.js'
  import Loading from './../../../components/Loading'
  import {Toast} from 'mint-ui';
  export default {
    components: {Loading},
    data () {
      return {
        topic: {},
        replies:[],
        replie_text:'',
        avatar_url:'',
        loginname:'',
        loadingFlag: false,
        userInfo:{}
      }
    },
    methods: {
      loadTopic () {
        let userInfo = localStorage.getItem('userInfo');
        if(userInfo){
          this.userInfo = JSON.parse(userInfo);
        }
        let self = this;
        self.loadingFlag = true;
        setTimeout(function () {
          let id = self.$route.params.id;
          api.getTopic({id: id}).then(res => {
            self.topic = res.data.data;
            self.replies = res.data.data.replies;
            self.avatar_url = self.topic.author.avatar_url;
            self.loginname = self.topic.author.loginname;
            self.loadingFlag = false;
          });
        }, 300)
      },
      logo (){
        this.$router.push({
          path:'/logo'
        })
      },
      toReplies (){
        let replie_text = this.replie_text;
        if(!replie_text){
          return  Toast({
            message: '内容不能为空'
          });
        }
        let userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let accesstoken = userInfo.accesstoken;
        let topic_id = this.topic.id;
        let params = {};
        params.content = replie_text;
        params.accesstoken = accesstoken;
        api.replies(params,topic_id).then(res =>{
           console.log(res)
          this.loadTopic();
        });
      },
      toUserInfo(userName){
        this.$router.push({
          path:'/userInfo/'+userName
        })
      }
    },
    created () {
      this.loadTopic()
    }
  }
</script>

<style>
  .content {
    text-align: center;
    padding: 10px;
    border-top: 1px solid #e1e1e1
  }

  img {
    width:100%;
  }

  .title {
    font-weight: bold;
    text-align: center;
  }

  pre {
    background-color: #f7f7f7;
    padding: 10px;
    overflow:auto;
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
  textarea:focus {
    outline:none;
  }
</style>

