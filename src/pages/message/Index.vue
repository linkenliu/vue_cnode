<template>
  <div style="margin-bottom: 50px">
    <header style="background-color: #000;position: fixed;width: 100%;margin-top: -8px">
      <div>
        <div style="text-align: center;margin-top: 9px;padding: 15px;">
          <strong style="color: #42b983">消息</strong>
        </div>
      </div>
    </header>

    <div style="padding-top: 60px;">
      <Loading v-show='loadingFlag'></Loading>

      <div v-for="item in messageList" style="border-bottom: 1px solid #e1e1e1;bottom: 300px" v-if="messageList.length">
        <div style="padding: 5px 10px;margin-top:8px;background-color: #ffffff">
          <div>
            <img class="headimg" v-bind:src="item.author.avatar_url" @click="toUserInfo(item.author.loginname)"/>
            <div style="display: block;margin-top: -33px;margin-left: 37px;">
              <strong @click="toUserInfo(item.author.loginname)" style="font-size: 13px">{{item.author.loginname}}</strong>
              <time style="color: #000;font-size: 13px;float: right">{{ item.create_at | formatDate }}</time>

              <div v-if="item.type == 'at'" style="font-size: 14px">
                在话题
                <router-link :to="'/details/' + item.topic.id" style="color: #2ECC71">{{ item.topic.title }}</router-link>
                中 @了你
              </div>

              <div v-if="item.type == 'reply'" style="font-size: 14px">
                回复你了的话题
                <router-link :to="'/details/' + item.topic.id" style="color: #2ECC71">{{ item.topic.title }}</router-link>
              </div>
              <div class="markdown-body" v-html="item.reply.content"
                   style="font-size: 15px;background-color: #f0f6fa;padding: 5px;margin-top: 10px;border-radius: 10px"></div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <Footer></Footer>
  </div>
</template>


<script>
  import api from './../../api/index.js'
  import Loading from '@/components/Loading'

  export default {
    components: {Loading},
    data () {
      return {
        messageList: [],
        loadingFlag: false
      }
    },
    methods: {
      loadMessage () {
        let self = this;
        let userInfo = localStorage.getItem('userInfo');
        let accesstoken = '';
        if(userInfo){
          userInfo = JSON.parse(userInfo);
          accesstoken = userInfo.accesstoken;
        }
        if (!accesstoken) {
          return
        }
        self.loadingFlag = true;
        api.messages({accesstoken: accesstoken}).then(res => {
          self.messageList = res.data.data.has_read_messages;
          self.loadingFlag = false;
        });
      },
      toUserInfo(userName){
        this.$router.push({
          path:'/userInfo/'+userName
        })
      }
    },
    created () {
      this.loadMessage()
    }
  }
</script>

