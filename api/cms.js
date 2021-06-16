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
    let config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
      params: {
        week_eq: data.params.week_eq
      },
    }
    if(data.count){
      return await axios.get(`${origin}/api/cms/winners/count`, config)
    }else{
      return await axios.get(`${origin}/api/cms/winners`, config)
    }

  },


}
