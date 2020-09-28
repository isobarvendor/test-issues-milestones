
import axios from 'axios';

let origin="https://ayo.isobartest.com";

export default {

  login(data) {
    return axios.post(`${origin}/api/login`, data)
  },
  signup(data) {
    return axios.post(`${origin}/api/signup`, data)
  },
  getAccount(token) {
   // console.log(token)
    var config = {
          method: 'get',
          url: `${origin}/api/account`,
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
          }
        };


      return axios(config)


  }


}
