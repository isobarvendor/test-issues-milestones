
import axios from 'axios';

let origin="";

const setHeader = (token)=>{
    return {
      headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              }
    }
}

export default {

  getListPrize(data) {
    return axios.get(`${origin}/api/campaign/public/listprize`)
  },
  getListWallet(data,token) {
    return axios.post(`${origin}/api/campaign/auth/listwallet`, data, setHeader(token))
  },
  submitLogin(data, type, token) {
    // there is 3 type : always, default, and luckydraw

    return axios.post(`${origin}/api/campaign/auth/${type}`, data, setHeader(token))
  },
  submitNonLogin(data, type) {
    // there is 3 type : always, default, and luckydraw
    return axios.post(`${origin}/api/campaign/public/${type}`, data)
  },

  async uploadFile(payload,type) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    };
    let resp;
        resp = await axios.post(`${origin}/api/${type}`, payload, config)

    return resp;
},

async deleteFile(payload,type) {
  let config = {

  };
  let resp;
      resp = await axios.delete(`${origin}/api/${type}`, payload, config)

  return resp;
},



}
