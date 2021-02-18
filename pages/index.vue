<template>
  <div id="main" class="home" v-if="CMSContent" >
    <div class="wrapper" >
      <MastheadVideo :data="CMSContent[0]" :isCountDown="true" v-if="isVideo(CMSContent[0].homepage.mastheadSection)"/>
      <Masthead :data="CMSContent[0]" :isCountDown="true" v-else/>

      <CampaignPeriod :data="configData.campaignPeriod" :howData="CMSContent[0].worksSection" v-if="configData"/>
      <Prizes v-if="configData && listPrizesData" :data="CMSContent[0].exclusivePrizes" :ngpsPrize="listPrizesData" :exclusivePrizes="configData ? configData.ExclusivePrizes.ExclusivePrizes : false" :winners="CMSContent[0].luckyWinner" :prize="CMSContent[0].prize"/>
      <!--HowItWorks :data="CMSContent[0].worksSection" /-->

      <SubmissionMechanics :dataForm="configData" v-if="notCountDown" />
    </div>
    <Footer :data="CMSContent[0].footer"  />
  </div>

</template>

<script >
import Masthead from '../components/Masthead'

import MastheadVideo from '../components/MastheadVideo'
import CampaignPeriod from '../components/CampaignPeriod'
import Prizes from '../components/Prizes'
import HowItWorks from '../components/HowItWorks'
import SubmissionMechanics from '../components/SubmissionMechanics'
import Footer from '../components/Footer'
import deepClone from 'deep-clone'
import { GET_ACCOUNT,GET_LIST_WALLET, GET_LIST_PRIZE} from '@/store/action_types';
import  VueScrollTo from 'vue-scrollto';


//const campaignCoin = "coin"
//const campaignEmail = "email"
//const campaign

export default {
  name:"index",
  components:{
    Masthead,MastheadVideo,CampaignPeriod, Prizes,HowItWorks,SubmissionMechanics, Footer
  },
  data(){
    return{
      notCountDown:this.$store.state.isCampaignStarted
    }
  },
  head() {
    return {
      title: "Coke Campaign",
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
    this.getListPrize();
    if(this.$store.state.token){
         this.getAccount();
        // this.campaignType=='Experience' && this.getListWallet();

            var options = {
                container: 'body',
                easing: 'ease-in',
                lazy: false,
                offset: -60,
                force: true,
                cancelable: true,
                onStart: function(element) {
                  // scrolling started
                },
                onDone: function(element) {
                  // scrolling is done
                },
                onCancel: function() {
                  // scrolling has been interrupted
                },
                x: false,
                y: true
            }

             this.$scrollTo('#submission-section', 60, options)

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
          this.$store.dispatch(GET_LIST_PRIZE)
                .then((response)=>{
                })
                .catch((error) =>{

                })


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
      listPrizesData(){
      return this.$store.getters.getListPrize
    }
  },

}
</script>

<style>
</style>
