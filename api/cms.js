
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
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {

      }
    }
    let param = Object.keys(data.params);
    param.forEach(ele => {
      config.params[ele] = data.params[ele]
    })

    if(data.count){
      return await axios.get(`${origin}/api/auth/cms/winners/count`, config)
    }else{
      return await axios.get(`${origin}/api/auth/cms/winners`, config)
    }

  },


}
