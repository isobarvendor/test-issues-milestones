
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
    return axios.get(`${origin}/api/campaign/public/list-prize`)
  },
  getListWallet(token) {
    return axios.get(`${origin}/api/campaign/auth/list-wallet`, setHeader(token))
  },
  redeemPrize(data, token) {
    return axios.post(`${origin}/api/campaign/auth/redeem-prize`, data, setHeader(token))
  },
  submitLogin(data, token) {
    return axios.post(`${origin}/api/campaign/auth/submission`, data, setHeader(token))
  },
  submitNonLogin(data) {
    return axios.post(`${origin}/api/campaign/public/submission`, data)
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
