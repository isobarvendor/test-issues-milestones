
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

  getListPrize(campaign='13qiq88kkqbov6j') {
    return axios.get(`${origin}/api/campaign/list-prize/${campaign}/listPrizes`)
  },
  getMyPrize(token,campaign='13qiq88kkqbov6j') {
    return axios.get(`${origin}/api/campaign/my-list-prize/${campaign}/queryVouchers`,setHeader(token))
  },
  getListWallet(token) {
    return axios.get(`${origin}/api/campaign/auth/list-wallet`, setHeader(token))
  },
  checkUserAttempt(token) {
    return axios.get(`${origin}/api/user-participators/current-attempt-number`, setHeader(token))
  },
  getUserPhone(token) {
    return axios.get(`${origin}/api/user-participators/get-phone-number`, setHeader(token))
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
