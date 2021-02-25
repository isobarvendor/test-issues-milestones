
import axios from 'axios';

const origin = process.env.origin;

export default {

  login(data) {
    return axios.post(`${origin}/api/login`, data)
  },
  signup(data) {
    return axios.post(`${origin}/api/signup`, data)
  },
  getAccount(token) {
    var config = {
          method: 'get',
          url: `${origin}/api/account`,
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
          }
        };


      return axios(config)


  },
  async getClientInfo(){
    return axios.get(`https://www.cloudflare.com/cdn-cgi/trace`)
  }



}
