
import axios from 'axios';
const origin = process.env.origin;

export default {

  async getCMSContent() {
    return await axios.get(`${origin}/cms-api/campaigns`)
  },
  async getCMSConfig() {
    return await axios.get(`${origin}/cms-api/campaign-configurations`)
  },
  async getWinners(data) {
    if(data.count){
      return await axios.get(`${origin}/cms-api/winners/count`,{params:data.params})
    }else{
      return await axios.get(`${origin}/cms-api/winners`,{params:data.params})
    }

  },


}
