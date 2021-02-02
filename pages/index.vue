<template>
  <div id="main" class="home" v-if="CMSContent&&notCountDown" >
    <div class="wrapper" >
      <!--Masthead :data="CMSContent[0].homepage.mastheadSection"/-->
      <MastheadVideo :data="CMSContent[0].homepage.mastheadSection"/>
      <CampaignPeriod :data="configData.campaignPeriod" v-if="configData"/>
      <Prizes v-if="configData && configData.ExclusivePrizes.ExclusivePrizes" :data="CMSContent[0].exclusivePrizes" :winners="CMSContent[0].luckyWinner"/>
      <HowItWorks :data="CMSContent[0].worksSection" />

      <SubmissionMechanics :dataForm="configData" />
    </div>
    <Footer :data="CMSContent[0].footer"  />
  </div>
  <div id="main" class="home" v-else-if="CMSContent">
    <MastheadCountDown :data="CMSContent[0].homepage.mastheadSection"/>
  </div>
</template>

<script >
import Masthead from '../components/Masthead'
import MastheadCountDown from '../components/MastheadCountDown'
import MastheadVideo from '../components/MastheadVideo'
import CampaignPeriod from '../components/CampaignPeriod'
import Prizes from '../components/Prizes'
import HowItWorks from '../components/HowItWorks'
import SubmissionMechanics from '../components/SubmissionMechanics'
import Footer from '../components/Footer'
import deepClone from 'deep-clone'
import { GET_ACCOUNT,GET_LIST_WALLET } from '@/store/action_types';

//const campaignCoin = "coin"
//const campaignEmail = "email"
//const campaign

export default {
  name:"index",
  components:{
    Masthead,MastheadVideo,MastheadCountDown,CampaignPeriod, Prizes,HowItWorks,SubmissionMechanics, Footer
  },
  data(){
    return{
      notCountDown:this.$store.state.isCampaignStarted
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
  mounted(){
    if(this.$store.state.token){
         this.getAccount();
         this.campaignType=='collect_to_redeem' && this.getListWallet();
    }
  },

  methods:{
      getAccount(){
       this.$store.dispatch(GET_ACCOUNT,this.$store.state.token).then({

       }).catch(error=>{
         if(error.response && error.response.data.status=="401"){
           localStorage.clear();
         }
       })
    },

     getListWallet(){
          this.$store.dispatch(GET_LIST_WALLET)
                .then((response)=>{
                })
                .catch((error) =>{
                  if(error.response && error.response.data.status=='401'){
                    localStorage.clear();
                  }
                })


     }


  },
  computed: {
    CMSContent(){
        return this.$store.getters.getCMSContent;
     },
     configData(){
       return this.$store.getters.getCMSConfig;
     },
    campaignType(){
      return this.$store.getters.getCMSConfig ? this.$store.getters.getCMSConfig.campaignTypes.mechanicType : null;
    },
  },

}
</script>

<style>
</style>
