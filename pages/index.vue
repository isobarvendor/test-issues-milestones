<template>
  <div v-if="dataStatus.status == 200" id="main">
    <div class="wrapper">
      <Masthead :data="data[0].homepage.mastheadSection"/>
      <!-- <CampaignPeriod :data="configData[0].campaignPeriod"/> -->
      <!-- <Prizes :data="configData[0].ExclusivePrizes" :winners="data[0].homepage.luckyWinner"/> -->
      <!-- <HowItWorks :data="data[0].worksSection"/> -->
      <SubmissionMechanics v-if="!this.$auth.loggedIn"/>
      <v-btn>Auth: {{ this.$auth.loggedIn }}</v-btn>
    </div>
    <Footer :data="data[0].footer"/>
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
      configData: null,
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
  props: {

  },
  created(){
    this.fetchData();
  },
  methods:{
    async fetchData(){
      let result = await this.$axios.get('https://ayo.aircovery.com/cms-api/campaigns')
      this.dataStatus = {status:result.status, message:result.statusText}
      this.data = result.data
      
      let config = await this.$axios.get('https://ayo.aircovery.com/cms-api/campaign-configurations')
      this.configData = config.data
    },
    check(){
      console.log(this.$auth.loggedIn)
    },
    logout() {
      this.$toast.show('Logging out...', {icon: "fingerprint"});
      this.$auth.logout()
    },
  },
  computed: {

  },
  mounted() {
    // console.log('data status', dataStatus)
  },
}
</script>

<style>
</style>
