<template>
  <div v-if="dataStatus.status == 200" id="main">
    <div class="wrapper">
      <Masthead :data="data ? data[0].homepage.mastheadSection :  null"/>
      <CampaignPeriod :data="configData ? configData[0].campaignPeriod : null"/>
      <Prizes v-if="configData && configData[0].ExclusivePrizes.ExclusivePrizes" :data="data && data[0].exclusivePrizes" :winners="data && data[0].luckyWinner"/>
      <HowItWorks :data="data && data[0].worksSection" />

      <SubmissionMechanics :dataForm="configData ? configData[0] : null" />
    </div>
    <Footer :data="data[0].footer"/>
  </div>
  <div v-else-if="dataStatus.status >= 500">
    Status: {{dataStatus.status}} <br/>
    {{dataStatus.message}}
  </div>
</template>

<script >
import { GET_LIST_PRIZE} from '@/store/action_types';
import CampaignPeriod from '../components/CampaignPeriod'
import Prizes from '../components/Prizes'
import HowItWorks from '../components/HowItWorks'
import SubmissionMechanics from '../components/SubmissionMechanics'
import Footer from '../components/Footer'

//const campaignCoin = "coin"
//const campaignEmail = "email"
//const campaign

export default {
  data(){
    return{
      dataStatus:{},
      data:null,
      configData: null,
      campaignType: 0,
      listPrizes:null
    }
  },
  head() {
    return {
      title: "Coke Campaign Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description"
        }
      ],
      noscript: [],
      script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],
      css: []
    };
  },
  props: {

  },
  created(){

  },

  methods:{
    async fetchData(){
      let result = await this.$axios.get('https://ayo.aircovery.com/cms-api/campaigns')
      this.dataStatus = {status:result.status, message:result.statusText}
      this.data = result.data

      let config = await this.$axios.get('https://ayo.aircovery.com/cms-api/campaign-configurations')
      this.configData = config.data

    }

  },
  computed: {

  },
  mounted() {
     this.fetchData();
  },
}
</script>

<style>
</style>
