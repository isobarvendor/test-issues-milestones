<template>
  <div v-if="dataStatus.status == 200" id="main">
    <div class="wrapper">
      <Masthead :data="data.mastheadSection"/>
      <CampaignPeriod :data="data.campaignPeriods"/>
      <Prizes :data="data.exclusivePrizes" :winners="data.luckyWinner"/>
      <HowItWorks :data="data.worksSection"/>
      <SubmissionMechanics />
    </div>
    <Footer :data="data.footer"/>
  </div>
  <div v-else-if="dataStatus.status >= 500">
    Status: {{dataStatus.status}} <br/>
    {{dataStatus.message}}
  </div>
</template>

<script >
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
      campaignType: 0
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
  
  created(){
    this.fetchData();
  },
  methods:{
    async fetchData(){
      let result = await this.$axios.get('https://ayo.aircovery.com/cms-api/campaigns/1')
      this.dataStatus = {status:result.status, message:result.statusText}
      this.data = result.data
    }
  }
}
</script>

<style>
</style>
