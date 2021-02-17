
import axios from 'axios';
import {envs}  from "@/constants/index";

const origin = envs.origin;

export default {

  async getCMSContent() {
    return await axios.get(`${origin}/cms-api/campaigns`)
  },
  async getCMSConfig() {
    return await axios.get(`${origin}/cms-api/campaign-configurations`)
  },
  async getWinners() {
    return await axios.get(`${origin}/cms-api/winners`)
  },


}
