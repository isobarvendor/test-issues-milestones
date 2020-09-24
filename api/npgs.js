
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
    return axios.post(`${origin}/api/listprize/`, data)
  },
  getListWallet(data,token) {
    return axios.post(`${origin}/api/listwallet/`, data, setHeader(token))
  },
  instaWinAPI(data,token) {
    return axios.post(`${origin}/api/instawin/`, data, setHeader(token))
  },
  alwaysWinAPI(data,token) {
    return axios.post(`${origin}/api/alwayswin/`, data, setHeader(token))
  },
  acceptVoucher(data,token) {
    return axios.post(`${origin}/api/accept/`, data, setHeader(token))
  },
  rejectVoucher(data,token) {
    return axios.post(`${origin}/api/reject/`, data, setHeader(token))
  },


}
