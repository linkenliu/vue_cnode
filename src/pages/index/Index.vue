<template>
  <div>
    <nav>
      <a style="cursor: pointer" @click="go(nav.value)" v-for="nav in navs"
         v-bind:class="{active:nav.value==currentValue,noset:nav.value!=currentValue}">{{nav.text}}</a>
    </nav>

    <div style="padding-top: 53px;margin-bottom: 50px" v-infinite-scroll="loadMore">
      <Loading v-show='loadingFlag'></Loading>
      <div v-for="topic in topics">
        <div style="padding: 5px 10px;margin-top:8px;background-color: #f0f6fa">
          <div>
            <img class="headimg" v-bind:src="topic.author.avatar_url" @click="toUserInfo(topic.author.loginname)"/>
            <div style="display: block;margin-top: -33px;margin-left: 37px;">
              <strong @click="toUserInfo(topic.author.loginname)"
                      style="font-size: 13px">{{topic.author.loginname}}</strong>
              <time style="color: #2ECC71;font-size: 13px">{{ topic.create_at | formatDate }}</time>
              <strong v-if="topic.top" style="font-size: 14px;float: right;color: green">置顶</strong>
              <strong v-if="topic.good" style="font-size: 14px;float: right;color: green">精华</strong>
            </div>
          </div>
          <div style="margin-top: 10px">
            <div style="font-size: 14px;font-weight: bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap ">
              <span style="color: #aaa;font-size: 12px">{{topic.tab | converType}}</span>
              <router-link :to="'/details/' + topic.id">{{topic.title}}</router-link>
            </div>
          </div>
          <div class="expand">
            <div style="color: #aaaaaa;font-size: 12px"><i class="fa fa-eye"></i> {{topic.visit_count}}</div>
            <div style="color: #aaaaaa;font-size: 12px"><i class=" fa fa-commenting"></i> {{topic.reply_count}}</div>
            <div style="color: #aaaaaa;font-size: 12px">{{topic.last_reply_at | formatDate }}</div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-show='loadMoreLoding' style="margin-bottom: 60px;margin-top: -30px"></Loading>
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
        currentValue: 'all',
        topics: [],
        navs: [],
        tab: '',
        i: 2,
        loadingFlag: false,
        loadMoreLoding: false,
        limit:20
      }
    },
    methods: {
      loadTopics (tab) {
        this.tab = tab;
        let self = this;
        self.loadMoreLoding = false;
        self.topics = [];
        self.loadingFlag = true;
        setTimeout(function () {
          api.getTopics({tab: tab, page: 1, limit: this.limit}).then(res => {
            self.loadingFlag = false;
            self.topics = res.data.data;
          });
        }, 300);
      },
      getData () {
        let navs = [
          {value: 'all', text: '全部'},
          {value: 'good', text: '精华'},
          {value: 'share', text: '分享'},
          {value: 'ask', text: '问答'},
          {value: 'job', text: '招聘'}
        ];
        this.navs = navs;
      },
      go(value){
        this.topics = [];
        this.currentValue = value;
        this.loadTopics(value);
      },
      toUserInfo(userName){
        this.$router.push({
          path: '/userInfo/' + userName
        })
      },
      loadMore: function () {
        let self = this;
        setTimeout(function () {
          if (!self.loadingFlag) {
            self.loadMoreLoding = true;
          }
          api.getTopics({tab: this.tab, page: self.i, limit: this.limit}).then(res => {
            let data = res.data.data;
            self.i++;
            self.topics = self.topics.concat(data)
          });
        }, 300)

      }
    },
    created () {
      this.loadTopics(),
        this.getData()
    },
    watch: {
      $route () {
        this.loadTopics()
        this.loadMore()
      }
    }
  }
</script>

<style>
  nav {
    position: fixed;
    width: 100%;
    margin: 0;
    background-color: #000;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
  }

  nav > a {
    color: #000;
    padding: 5%;
  }

  .active {
    color: hotpink !important;
  }

  .footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    height: 49px;
    text-align: center;
    border-top: 1px solid #ddd;
    background-color: #000;
  }

  .footer div {

  }

  .expand {
    margin-top: 5px;
  }

  .expand > div {
    width: 32%;
    display: inline-block;
    border-right: 1px solid #e1e1e1;
    text-align: center;
  }

  .expand > div:last-child {
    border-right: 0px solid #e1e1e1;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
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
</style>
