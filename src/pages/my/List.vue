<template>
  <div style="position: absolute;margin-top: 40px;margin-bottom: 0px;z-index: -99;width: 100%">
    <div v-for="topic in list">
      <div style="padding: 5px 10px;margin-top:8px;background-color: #f0f6fa">
        <div>
          <img class="headimg" v-bind:src="topic.author.avatar_url"/>
          <div style="display: block;margin-top: -33px;margin-left: 37px;">
            <strong style="font-size: 13px">{{topic.author.loginname}}</strong>
            <time style="color: #000;font-size: 13px;float: right">{{ topic.last_reply_at | formatDate }}</time>
          </div>
        </div>
        <div style="margin-top: 10px">
          <div style="font-size: 14px;font-weight: bold;overflow: hidden;text-overflow:ellipsis;white-space: nowrap ">
            <router-link :to="'/details/' + topic.id"><span style="color: #2ECC71">{{topic.title}}</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>



