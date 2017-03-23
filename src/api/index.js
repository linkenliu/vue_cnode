import axios from 'axios'

const baseUrl = 'https://cnodejs.org/api/v1'


export default {
  getTopics (params) {
    return (params.tab) ? axios.get(`${baseUrl}/topics?tab=${params.tab}&page=${params.page}&limit=${params.limit}`) : axios.get(`${baseUrl}/topics?page=${params.page}&limit=${params.limit}`)
  },
  getTopic (params){
    return axios.get(`${baseUrl}/topic/` + params.id)
  },
  postToken (params){
    return axios.post(`${baseUrl}/accesstoken`, params)
  },
  getUserInfo (params){
    return axios.get(`${baseUrl}/user/` + params.userName)
  },
  replies (params,topic_id){
    return axios.post(`${baseUrl}/topic/${topic_id}/replies`, params)
  },
  messages (params){
    return axios.get(`${baseUrl}/messages?accesstoken=${params.accesstoken}`)
  },
  postTopic (params){
    return axios.post(`${baseUrl}/topics`,params);
  }


}
