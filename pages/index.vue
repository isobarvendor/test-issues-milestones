<template>
  <v-app>
    <div id="main" class="home" v-if="CMSContent" >
      <div class="wrapper" >
        <!-- <MastheadVideo :data="CMSContent[0]" :isCountDown="!notCountDown" v-if="CMSContent[0].homepage.mastheadSection.video"/>
        <Masthead :data="CMSContent[0]" :isCountDown="!notCountDown" v-else/> -->
        <MastHeadFanta :data="CMSContent[0]" :isCountDown="!notCountDown" v-if="CMSContent[0].homepage.mastheadSection.video"/>
        <HowItWorksFanta :data="CMSContent[0]" />
        <PrizesFanta :data="listPrizesData" :total="remaining"  v-if="notCountDown"/>
        <!-- <PrizeRedeem @scroll="scroll"/>
        <LuckyDraw id="lucky"/> -->
        <!-- <CampaignPeriod :data="configData.campaignPeriod" :howData="CMSContent[0].worksSection" v-if="configData"/> -->
        <!-- <Prizes v-if="configData" :data="CMSContent[0].exclusivePrizes" :ngpsPrize="listPrizesData ? listPrizesData : []" :exclusivePrizes="configData ? configData.ExclusivePrizes.ExclusivePrizes : false" :winners="CMSContent[0].luckyWinner" :prize="CMSContent[0].prize"/> -->
        <!--HowItWorks :data="CMSContent[0].worksSection" /-->
        <!-- <PrizeRedeem  :data="CMSContent[0]" image="/develop/fanta-logo.png" :config="configData" id="form"/> -->
        <Sticky v-if="$store.state.login&&!submission&&notCountDown" @scroll="scroll" label="ร่วมสนุกเลย"/>
        <SubmissionMechanics :dataForm="configData" :cms="CMSContent[0]" @changeStatus="changeStatus" id="form" v-if="notCountDown"/>

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
import Sticky from '../components/Sticky'
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
      remaining: null,
      notCountDown:this.$store.state.isCampaignStarted,
      browserTitle:translation.browserTitle,
      metaData:translation.meta,
      listPrizesData:[],
      submission:false
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
    /* if(this.$store.state.token||this.$store.state.goToSignin){
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
    } */

    if(this.CMSContent && new Date(this.CMSContent[0].endDate).getTime()>new Date().getTime()){
        console.log("HELLO")
        this.$store.commit('SET_CAMPAIGN_STARTED',false);
        localStorage.clear();
    }

    window.mobileAndTabletCheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

      return check
    };
    let check = window.mobileAndTabletCheck();
    
    if (check){
        if (!this.$store.state.token){
          location.href= window.location.origin + "/api/oauth2/authorize/line?redirect_uri=" +
              window.location.origin +
              "/settoken";
        }
      }

    /* var isMobileIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    var isMobileAndriod = /Android/i.test(navigator.userAgent);
    if (isMobileIOS){
      alert("ios")
    }
    if (isMobileAndriod){
      alert("andriod")
    } */

  },


  methods:{
    changeStatus(data){
      this.submission=data;
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
        this.$scrollTo('#form', 120, options)
     },
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
        async getListPrize(){
        let luckyDraw=_.filter(this.getAttempt,(a)=>{
          return a.campaignType=='InstantWin';
        })

         let array=[];
          for(let a=0; a<luckyDraw.length;a++){
            await this.$store.dispatch(GET_LIST_PRIZE,luckyDraw[a].NPGS[0].configID)
            .then((response)=>{
                this.listPrizesData=[...this.listPrizesData,...[...array, ...response.data.prizeList]];
                
                let total = 0;
                this.listPrizesData.forEach(ele => {
                  total += ele.amountAvailable
                })
                this.remaining = total;
                
            })
            .catch((error) =>{

            })



          }
        },
     /* scroll(){
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
     }, */



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
