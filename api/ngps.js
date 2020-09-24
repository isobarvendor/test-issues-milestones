
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
    return axios.post(`${origin}/api/campaign/listPrizes`, data)
  },
  getListWallet(data,token) {
    return axios.post(`${origin}/api/campaign/listWallet`, data, setHeader(token))
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
        resp = await axios.post(`${origin}/api/upload`, payload, config)

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
