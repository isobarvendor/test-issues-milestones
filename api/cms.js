
import axios from 'axios';

let origin="https://ayotest.coke.com";

export default {

  async getCMSContent() {
    return await axios.get(`${origin}/cms-api/campaigns`)
  },
  async getCMSConfig() {
    return await axios.get(`${origin}/cms-api/campaign-configurations`)
  },


}
