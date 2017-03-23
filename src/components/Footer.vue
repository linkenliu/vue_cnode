<style>
  .noset {
    color: #42b983;
  }
</style>
<template>
  <footer class="footer">
    <div v-for="footer in footers" style="width: 23%;display: inline-block" @click="go(footer.value)">
      <div style="margin-top: 6px" v-bind:class="{active:footer.value==currentValue,noset:footer.value!=currentValue}">
        <i v-bind:class="footer.icon" style="font-size: 20px;"></i>
      </div>
      <div style="margin-top: -6px">
        <a style="font-size: 13px;color: #42b983"
           v-bind:class="{active:footer.value==currentValue,noset:footer.value!=currentValue}">{{footer.text}}</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    data () {
      return {
        currentValue: 'home',
        footers: []
      }
    },
    methods: {
      getData () {
        let tempPath = this.$route.path;
        tempPath = tempPath.substring(1, tempPath.length);
        if (tempPath) {
          this.currentValue = tempPath;
        }
        let footers = [
          {value: 'home', text: '首页', icon: 'fa fa-home'},
          {value: 'publish', text: '发表', icon: 'fa fa-send-o'},
          {value: 'msg', text: '消息', icon: 'fa fa-comments'},
          {value: 'my', text: '我的', icon: 'fa fa-user-o'},
        ];
        this.footers = footers;
      },
      go(value){
        if ('msg' == value) {
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
              path: '/' + value
            })
          }
        } else {
          this.$router.push({
            path: '/' + value
          })
        }
      }
    },
    created () {
      this.getData()
    }
  }

</script>
