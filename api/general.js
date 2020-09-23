
import axios from 'axios';

let origin="http://localhost:8080";

export default {

  login(data) {
    return axios.post(`${origin}/api/login/`, data)
  },
  signup(data) {
    return axios.post(`${origin}/api/signup/`, data)
  },
  getAccount(token) {
    console.log(token)
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
