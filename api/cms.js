import axios from 'axios';
const origin = process.env.origin;





export default {

  async getCMSContent() {
    return await axios.get(`${origin}/cms-api/campaigns`)
  },
  async getCMSConfig() {
    return await axios.get(`${origin}/cms-api/campaign-configurations`)
  },
  async getWinners(data, token) {
    let key = Object.keys(data.params);
    
    let config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
      params: {
        [key]: data.params[key]
      },
    }
    if(data.count){
      return await axios.get(`${origin}/api/cms/winners/count`, config)
    }else{
      return await axios.get(`${origin}/api/cms/winners`, config)
    }

  },


}
