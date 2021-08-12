<template>
  <v-app>
    <div id="main" class="home" v-if="CMSContent" >
      <div class="wrapper" >
        <!-- <MastheadVideo :data="CMSContent[0]" :isCountDown="!notCountDown" v-if="CMSContent[0].homepage.mastheadSection.video"/>
        <Masthead :data="CMSContent[0]" :isCountDown="!notCountDown" v-else/> -->
        <MastHeadFanta :data="CMSContent[0]" :isCountDown="!notCountDown" v-if="CMSContent[0].homepage.mastheadSection.video"/>
        <HowItWorksFanta />
        <PrizesFanta />
        <PrizeRedeem @scroll="scroll"/>
        <LuckyDraw id="lucky"/>
        <!-- <CampaignPeriod :data="configData.campaignPeriod" :howData="CMSContent[0].worksSection" v-if="configData"/> -->
        <!-- <Prizes v-if="configData" :data="CMSContent[0].exclusivePrizes" :ngpsPrize="listPrizesData ? listPrizesData : []" :exclusivePrizes="configData ? configData.ExclusivePrizes.ExclusivePrizes : false" :winners="CMSContent[0].luckyWinner" :prize="CMSContent[0].prize"/> -->
        <!--HowItWorks :data="CMSContent[0].worksSection" /-->

        <SubmissionMechanics :dataForm="configData"  />
      </div>
      
      <Footer :data="CMSContent[0].footer"  />
    </div>
  </v-app>

</template>

<script >
import Masthead from '../components/Masthead'
import HowItWorksFanta from '../components/HowItWorksFanta'
import MastheadVideo from '../components/MastheadVideo'
import CampaignPeriod from '../components/CampaignPeriod'
import Prizes from '../components/Prizes'
import HowItWorks from '../components/HowItWorks'
import SubmissionMechanics from '../components/SubmissionMechanics'
import Footer from '../components/Footer'
import deepClone from 'deep-clone'
import { GET_ACCOUNT,GET_LIST_WALLET, GET_LIST_PRIZE, GET_PHONE} from '@/store/action_types';
import  VueScrollTo from 'vue-scrollto';

import * as _ from 'lodash';
//const campaignCoin = "coin"
//const campaignEmail = "email"
//const campaign
import {translation} from "@/constants/index"
export default {
  name:"index",
  components:{
    Masthead,MastheadVideo,CampaignPeriod, Prizes,HowItWorks,SubmissionMechanics, Footer
  },
  data(){
    return{
      notCountDown:this.$store.state.isCampaignStarted,
      browserTitle:translation.browserTitle,
      metaData:translation.meta,
      listPrizesData:[]
    }
  },
  head() {
    return {
      title: this.browserTitle,
      meta:this.metaData,
    };
  },
  props: {

  },
  mounted(){
    this.configData && this.configData.ExclusivePrizes&&this.configData.ExclusivePrizes.ExclusivePrizes && this.getListPrize();
    if(this.$store.state.token){
         this.getAccount();
        // this.campaignType=='Experience' && this.getListWallet();

    }
    if(this.$store.state.token||this.$store.state.goToSignin){
          var options = {
                container: 'body',
                easing: 'ease-in',
                lazy: false,
                offset: -60,
                force: true,
                cancelable: true,
                x: false,
                y: true
            }

             this.$scrollTo('.mechanics', 60, options)
    }

    if(this.CMSContent && new Date(this.CMSContent[0].endDate).getTime()>new Date().getTime()){
        this.$store.commit('SET_CAMPAIGN_STARTED',false);
        localStorage.clear();
    }
  },

  methods:{
      getAccount(){
       this.$store.dispatch(GET_ACCOUNT,this.$store.state.token).then((response)=>{
            this.$store.dispatch(GET_PHONE).then((response2)=>{

            }).catch(error=>{
              if(error.response && error.response.data.status=="401"){
                localStorage.clear();
              }
            })

       }).catch(error=>{
         if(error.response && error.response.data.status=="401"){
           localStorage.clear();
         }
       })



    },
    isVideo(data){
      return (data && data.desktopImage.length>0)  ?  data.desktopImage[0].url.includes("mp4") : false;
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


     },
        getListPrize(){

        let luckyDraw=_.filter(this.getAttempt,(a)=>{
          return a.campaignType=='LuckyDraw';
        })
         let array=[];
          for(let a=0; a<luckyDraw.length;a++){
            this.$store.dispatch(GET_LIST_PRIZE,luckyDraw[a].NPGS[0].configID)
            .then((response)=>{
                this.listPrizesData=[...this.listPrizesData,...[...array, ...response.data.prizeList]];
            })
            .catch((error) =>{

            })
        }


     },
     scroll(){
       var options = {
                container: 'body',
                easing: 'ease-in',
                lazy: false,
                offset: -60,
                force: true,
                cancelable: true,
                x: false,
                y: true
            }
        this.$scrollTo('#lucky', 120, options)
     },
     


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
      getAttempt(){
      return this.$store.getters.getCMSConfig ? this.$store.getters.getCMSConfig.attempts : null;
    },


  },

}
</script>

<style>
</style>
