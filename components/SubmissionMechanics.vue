<template>
 <div style="width:100%">
  <div class="container campaign-section redbox-withwhiteborder submission-section" id="submission-section" v-if="cmsData&&!submitted">
      <div class="divider">
        <img src="/img/landing/coke line divider.png" width="100%" />
      </div>
      <Login :social="dataSocial" v-if="!this.$store.state.login"   />
      <Form :data="dataForm" :cmsData="cmsData[0]"  v-if="this.$store.state.login" @submit="submit"  />
      <!--Login :social="dataSocial" v-if="false"   />
      <Form :data="dataForm" :cmsData="cmsData[0]" /-->
  </div>
  <div  v-else >
  <div class="container  prize-chance black-red-border" id="prize-chance">

        <div class="wrapper"  v-for="(item, idx) in prize" :key="idx"  >
          <PrizeItem :prize="item" :themes="themes" @playAgain="playAgain" @submitPrize="submitPrize" v-if="prize.length>0" :loading="loading"  />
          <div class="error-message" v-if="idx==prize.length-1">{{errorMessage}}</div>
        </div>
        <div class="error-message" v-if="prize.length==0">{{errorMessage}}</div>
      </div>
      <div v-if="prize.length==0" style="text-align:center">
            <span v-html="thankYouMessage"></span>
             <div class="prize-button-area center" style="margin-top:40px;">
                  <v-btn @click="playAgain">{{submissionText.participateAgain}}</v-btn>
            </div>
      </div>
    <div class="container prize-chance redbox-withwhiteborder joox-section" v-if="prize.length>0 && prize[0].havejoox"  >
      <div class="background-image-joox">
      <img src="/img/landing/back-dots.png" />
    </div>
    <div class="desc-joox" >
        <span v-html="jooxMessage"></span>
        <!--div class="joox-listen">
            <a :href="listenNowLink" target="_blank"><v-btn >{{submissionText.listenNow}}</v-btn></a>
        </div-->
    </div>
  </div>

 </div>
 </div>
</template>

<script>
import {SUBMIT_FORM } from '@/store/action_types';
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
import {translation} from "@/constants/index"

let configID=process.env.configID.split(",");
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
        prize:[],
        submitted:false,
        submitNumber:0,
        listenNowLink:'',
        request:{},
        attemptData:null,
        lotID:null,
        themes:1,
        thankYouMessage:"",
        request:{
          email:''
        },
        errorMessage:null,
        submissionText:translation.submissionText,
        loading:false
    }

  },
    computed:{
    campaignType(){
      return this.dataForm;
    },
    cmsData(){
      return this.$store.getters.getCMSContent;
    },

    email(){
      return this.request.email;
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
      this.prize=[];
    },
    submitPrize(){
      let request= this.request;
      let response = {};
      let data = {
        attemptData:this.attemptData,
        request:this.request
      }
      request.configurationId=configID[this.submitNumber-1];

    if(this.submitNumber==1){
      this.loading=true;
      this.$store.dispatch(SUBMIT_FORM,request)
      .then((response)=>{
           data.response=response.data
           this.submitOne(data,true,2);
             this.loading=false;

      }).catch((error)=>{
       if(error.response){
          this.errorMessage=this.submissionText.errorAPI;
        }
        if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='1'){
              this.errorMessage=this.submissionText.errorPinCode1;
            }
        if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='2'){
          this.errorMessage=error.response.data.trace.message;
        }

        if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='4'){
          this.errorMessage=this.submissionText.errorPinCode2;
        }
          if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='6'){
          this.errorMessage=this.submissionText.errorPinCode3;
        }
          this.loading=false;
      })
    }else{
        this.submitPrizeDouble(3);
    }

    },

     submitPrizeDouble(page=1){
       this.loading=true;
      let request= this.request;
      request.configurationId=configID[0];
      let data = {
        attemptData:this.attemptData,
        request:request
      }

     /* let response={};
      let response2={};
       let result={
            "burnResult": [
                {
                    "pincode": "0J6TC2VP5",
                    "programId": "453269",
                    "lotId": "445580",
                    "burned": true
                }
            ],
            "participationId": "1ylazdy9kkxmpa53",
            "instantWinResult": {
                "winner": true,
              "redeemedPrize": {
                    "prizeId": "kkqhy9so",
                    "voucherCode": "Voucher891",
                    "status": "claimed",
                    "expiryDate": 1620018590000,
                    "name": "JOOX VIP PASS",
                    "shortDescription": "http://google.com",
                    "redeemDescription": "http://abcd",
                    "imgUrl": "/img/landing/week 1 prize.png",
                    "barcodeType": 1,
                    "emailSent": false,
                    "emailMessage": "Email could not be sent"
                }
            }
        }
        response.data=result;*/
       this.$store.dispatch(SUBMIT_FORM,request)
      .then((response)=>{
           data.response=response.data
           this.submitOne(data,false,page);
           request.configurationId=configID[1];

             this.$store.dispatch(SUBMIT_FORM,request)
            .then((response2)=>{
                data.response=response2.data
               this.submitTwo(data,page);
                 this.loading=false;
             }).catch((error)=>{
               if(error.response){
                  this.errorMessage=this.submissionText.errorAPI;
                }
                if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='1'){
                this.errorMessage=this.submissionText.errorPinCode1;
              }
              if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='2'){
          this.errorMessage=error.response.data.trace.message;
        }
              if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='4'){
                this.errorMessage=this.submissionText.errorPinCode2;
              }
                if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='6'){
                this.errorMessage=this.submissionText.errorPinCode3;
              }
                this.loading=false;
            })
     }).catch((error)=>{
           if(error.response){
          this.errorMessage=this.submissionText.errorAPI;
        }
         if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='1'){
                this.errorMessage=this.submissionText.errorPinCode1;
              }
              if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='2'){
          this.errorMessage=error.response.data.trace.message;
        }
              if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='4'){
                this.errorMessage=this.submissionText.errorPinCode2;
              }
                if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='6'){
                this.errorMessage=this.submissionText.errorPinCode3;
              }
            this.loading=false;

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
      if(!this.$config.lotID.includes(lotID)){
        this.submitPrizeDouble();
      }else{

          let prize = [
            {
                text : "<h2>"+this.submissionText.textPage+"/h2>"
                ,name:null
                ,note:null
                ,image:null
                ,havejoox:false
                ,button:[{
                    text:this.submissionText.startRedeeming,
                    type:"submission",
                    id:1
                }],
                code:null,
                subName:null,
                isPlayAgain:false
              },
          ];
          this.prize=prize;
       }


    },
    submitOne(data,button=true,page=1){
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.submitNumber=2;
      this.request=data.request;
       // console.log(data)
          let prize =[
              {
                  text : attemptData.FormHeading.thankYouMessage,
                  name : prizewin.instantWinResult.redeemedPrize.name,
                  image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
                  note : null
                  ,button:button ? [{
                      text:this.submissionText.redeemNextPrize,
                     type:"submission",
                     id:page
                  }]:[]
                  ,havejoox:false,
                  code: null,
                subName:null,
              }
          ];
          this.prize=prize;
         // console.log(prize);
         //  this.listenNowLink=prizewin.instantWinResult.redeemedPrize.redemptionLink;


    },
     submitTwo(data,page=1){
       // console.log(data)
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.submitNumber=3;

      let prize =[
              {
                  text :null,
                  name : prizewin.instantWinResult.redeemedPrize.name,
                  image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
                  note : null
                  ,button:[{
                      text:this.submissionText.redeemPrize,
                      link:prizewin.instantWinResult.redeemedPrize.redeemDescription + "?"+this.$config.voucherParameter+"="+prizewin.instantWinResult.redeemedPrize.voucherCode,
                      id:page
                  }]
                  ,havejoox:false,
                  code:  prizewin.instantWinResult.redeemedPrize.voucherCode,
                subName:null,
                isPlayAgain:false
              }
          ];

     //console.log(prize)
      this.prize=[...this.prize,...prize]

     // this.listenNowLink=prizewin.instantWinResult.redeemedPrize.shortDescription;

    }
  },
}
</script>

<style>

  .error-message{
    padding-top: 20px;
    color:#fff;
    text-align: center;
  }
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
.prize-chance .wrapper{
  padding-bottom: 50px;
  padding-top: 30px;
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
