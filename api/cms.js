
import axios from 'axios';

let origin="";

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
