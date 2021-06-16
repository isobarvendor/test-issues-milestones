
import axios from 'axios';
const origin = process.env.origin;
const setHeader = (token)=>{
  return {
    headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            }
  }
}
export default {

  async getCMSContent() {
    return await axios.get(`${origin}/cms-api/campaigns`)
  },
  async getCMSConfig() {
    return await axios.get(`${origin}/cms-api/campaign-configurations`)
  },
  async getWinners(data, token) {
    if(data.count){
      return await axios.get(`${origin}/api/cms/winners/count`,{params:data.params}, setHeader(token))
    }else{
      return await axios.get(`${origin}/api/cms/winners`,{params:data.params}, setHeader(token))
    }

  },


}
