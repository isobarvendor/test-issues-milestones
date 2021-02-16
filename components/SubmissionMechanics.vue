<template>
 <div style="width:100%">
  <div class="container campaign-section redbox-withwhiteborder submission-section" v-if="cmsData&&!submitted">
      <div class="divider">
        <img src="/img/landing/coke line divider.png" width="100%" />
      </div>
      <Login :social="dataSocial" v-if="!this.$store.state.login"   />
      <Form :data="dataForm" :cmsData="cmsData[0]"  v-if="this.$store.state.login" @submit="submit"  />
      <!--Login :social="dataSocial" v-if="false"   />
      <Form :data="dataForm" :cmsData="cmsData[0]" /-->

  </div>
  <div  v-else >
  <div class="container  prize-chance black-red-border">
      <div class="wrapper"  v-for="(item, idx) in prize" :key="idx" >
      <PrizeItem :prize="item" :themes="themes" @playAgain="playAgain" @submitPrize="submitPrize"  />
      </div>
    </div>
    <div class="container prize-chance black-background joox-section" v-if="prize[0].havejoox"  >
      <div class="background-image-joox">
      <img src="/img/landing/back-dots.png" />
    </div>
    <div class="desc-joox" >
        <span v-html="prize[0].havejoox"></span>
        <div class="joox-listen">
            <a :href="listenNowLink" target="_blank"><v-btn >Listen now</v-btn></a>
        </div>
    </div>
  </div>
  </div>
 </div>
</template>

<script>
import {SUBMIT_FORM } from '@/store/action_types';
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
export default {
  name: "SubmissionMechanics",
  components:{
    Login,
    Form
  },
   props: {
        dataForm: null,
      },
  data() {
    return {
        prize:null,
        submitted:false,
        submitNumber:0,
        listenNowLink:'',
        request:{},
        attemptData:null,
        lotID:null,
        themes:1
    }

  },
    computed:{
    campaignType(){
      return this.dataForm;
    },
    cmsData(){
      return this.$store.getters.getCMSContent;
    },
    dataSocial() {
      return {
        email: this.dataForm .socialMedia.Email,
        facebook: this.dataForm.socialMedia.Facebook,
        google: this.dataForm.socialMedia.Google,
        line: this.dataForm.socialMedia.Line,
      }
    }
  },

  methods: {
    playAgain(){
      this.submitted=false;
    },
    submitPrize(){
      let request= this.request;
      let data = {
        attemptData:this.attemptData,
        request:this.request
      }
      if(this.submitNumber==1){

      }
       this.$store.dispatch(SUBMIT_FORM,request)
      .then((response)=>{
         if(this.submitNumber==1){
           data.response=response.data
           this.submitOne(data);
         }
          if(this.submitNumber==2){
           data.response=response.data
           this.submitTwo(data);
         }

      }).catch((err)=>{

      })

    },
     submit(data){
      // console.log(data);
      this.submitted=true;
      let response=data.response;
      let lotID=response.lot.lotId;
      this.attemptData =data.attemptData;
      this.submitNumber=1;
      this.lotID=lotID;
      this.request=data.request;
      let prize = [
         {
            text : "<h2>You have entered the Entry Code from Coca-Cola 300ml PET bottle and Coca Cola 235 ml can, you will have 2 lucky draw opportunities</h2>"
            ,name:null
            ,note:null
            ,image:null
            ,havejoox:false
            ,button:[{
                text:"Start redeeming",
                type:"submission"
            }],
            code:null,
            subName:null,
            isPlayAgain:false
           },
      ];
      this.prize=prize;


    },
    submitOne(data){
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.submitNumber=2;
      let prize =[
          {
              text : attemptData.FormHeading.thankYouMessage,
              name : prizewin.instantWinResult.redeemedPrize.name,
              image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
              note : null
              ,button:attemptData.campaignType == 'InstantWin' ? [{
                  text:"Redeem Prize",
                  type:"submission"
              }]:[]
              ,havejoox:attemptData.FormHeading.Prize,
              code: attemptData.campaignType == 'InstantWin' ? prizewin.instantWinResult.redeemedPrize.voucherCode : null,
            subName:attemptData.campaignType == 'InstantWin' ? null : prizewin.instantWinResult.redeemedPrize.emailMessage
          }
      ];
      this.prize=prize;

      this.listenNowLink=prizewin.instantWinResult.redeemedPrize.shortDescription;



    },
     submitTwo(data){
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.submitNumber=3;
      if(this.lotID!==453275&&this.lotID!==453273){
        this.themes=2;
      }
      let prize =[
          {
              text : attemptData.FormHeading.thankYouMessage,
              name : prizewin.instantWinResult.redeemedPrize.name,
              image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
              note : null
              ,button:attemptData.campaignType == 'InstantWin' ? [{
                  text:"Redeem Prize",
                  link:prizewin.instantWinResult.redeemedPrize.redeemDescription + "?c="+prizewin.instantWinResult.redeemedPrize.voucherCode
              }]:[]
              ,havejoox:false,
              code: attemptData.campaignType == 'InstantWin' ? prizewin.instantWinResult.redeemedPrize.voucherCode : null,
            subName:attemptData.campaignType == 'InstantWin' ? null : prizewin.instantWinResult.redeemedPrize.emailMessage
          }
      ];
      this.prize=prize;

      this.listenNowLink=prizewin.instantWinResult.redeemedPrize.shortDescription;

    }
  },
}
</script>

<style>


 .prize-chance.joox-section{
     padding-top: 80px;
     text-align: center;
    min-height: 380px !important;
 }
.prize-chance .background-image-joox{
    position: absolute;
    top:0px;

    z-index: 0;
}
.prize-chance .background-image-joox img{
    width:100%;
}
.desc-joox{
    z-index: 1;
}
.desc-joox h4{
  font-size:25px;
  max-width: 500px;
  margin: auto;
  padding-bottom: 10px;
  text-align: center;
}
.joox-listen{
    padding-top: 50px;
}
.joox-listen .v-btn:not(.v-btn--round).v-size--default{
    padding:30px;
    font-weight: bold;
}


</style>
