<template>
  <div id="main" >
    <client-only>
    <div class="wrapper" v-if="CMSContent">
      <Masthead :data="CMSContent ? CMSContent[0].homepage.mastheadSection :  null"/>
      <CampaignPeriod :data="configData.campaignPeriod" v-if="configData"/>
      <Prizes v-if="configData && configData.ExclusivePrizes.ExclusivePrizes" :data="CMSContent && CMSContent[0].exclusivePrizes" :winners="CMSContent && CMSContent[0].luckyWinner"/>
      <HowItWorks :data="CMSContent && CMSContent[0].worksSection" />

      <SubmissionMechanics :dataForm="configData ? configData : null" />
    </div>
    <Footer :data="CMSContent && CMSContent[0].footer"/>
    </client-only>
  </div>
</template>

<script >

import CampaignPeriod from '../components/CampaignPeriod'
import Prizes from '../components/Prizes'
import HowItWorks from '../components/HowItWorks'
import SubmissionMechanics from '../components/SubmissionMechanics'
import Footer from '../components/Footer'
import deepClone from 'deep-clone'
import { GET_ACCOUNT } from '@/store/action_types';

//const campaignCoin = "coin"
//const campaignEmail = "email"
//const campaign

export default {
  data(){
    return{

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
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
  props: {

  },
  created(){
    this.getAccount();
  },

  methods:{
    async getAccount(){
       await this.$store.state.token && this.$store.dispatch(GET_ACCOUNT,this.$store.state.token)
    },

  },
  computed: {
      CMSContent(){
      return deepClone(this.$store.state.CMSContent)
     },
     configData(){
       return deepClone(this.$store.state.config)
     }
  },

}
</script>

<style>
</style>
