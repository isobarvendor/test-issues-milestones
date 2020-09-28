
import axios from 'axios';

let origin="https://ayo.isobartest.com";

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

  async uploadFile(payload) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    };
    let resp;
        resp = await axios.post(`${origin}/api/receipts`, payload, config)

    return resp;
},

async deleteFile(payload) {
  let config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      }
  };
  let resp;
      resp = await axios.delete(`${origin}/api/receipts`, payload, config)

  return resp;
},

  /* might need to remove */
  acceptVoucher(data,token) {
    return axios.post(`${origin}/api/accept`, data, setHeader(token))
  },
  rejectVoucher(data,token) {
    return axios.post(`${origin}/api/reject`, data, setHeader(token))
  },




}
