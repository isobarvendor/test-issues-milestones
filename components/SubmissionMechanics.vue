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
  <div class="container  prize-chance black-red-border" id="prize-area">
      <div class="wrapper">
      <PrizeItem :prize="prize[0]" :themes="1" @playAgain="playAgain" @submitPrize="submitPrize"  v-if="isPrizePage"  />
      <PrizeQuestion :questions="questions" @submit="submitQuestion" v-else />

      </div>
    </div>
    <div class="container prize-chance redbox-withwhiteborder joox-section" v-if="jooxMessage"   >
      <div class="background-image-joox">
      <img src="/img/landing/back-dots.png" />
    </div>
    <div class="desc-joox" >
        <span v-html="jooxMessage"></span>

    </div>
  </div>

  </div>
 </div>
</template>

<script>
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
import { SUBMIT_FORM } from '@/store/action_types';
import {translation} from "@/constants/index"
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
        attemptData:[],
        listenNowLink:'',
        thankYouMessage:"",
        request:{
          email:''
        },
        submissionText:translation.submissionText,
        isPrizePage:false
    }

  },
    computed:{
    getAttempt(){
      return this.dataForm.attempts;
    },
    questions(){
      return this.attemptData ? this.attemptData.Question : null
    },
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
      generateRequest(currentAttempt){

      if(currentAttempt>=this.getAttempt.length){
        currentAttempt=this.getAttempt.length-1;
      }

      let mixCode=this.getAttempt[currentAttempt].mixCode;
      let ngps=this.getAttempt[currentAttempt].NPGS;
      let programId=null;
      this.attemptData=this.getAttempt[currentAttempt];

       if(mixCode.length>0){
         // console.log(mixCode);
          let programs=_.filter(mixCode,(a)=>{
          return a.codeInitial!=null&&a.codeInitial.toUpperCase()==this.request.pin.charAt(0).toUpperCase()&&a.characterLimit==this.request.pin.length;
        })
        //console.log(programs);
        let programsNull=_.filter(mixCode,(a)=>{
          return (a.codeInitial==null||a.codeInitial=="")&&a.characterLimit==this.request.pin.length;
        })
        if(programs.length>0){
          programId=programs[0].ProgrammeID;
        }else{
          programId=programsNull.length>0 ? programsNull[0].ProgrammeID : null;
        }
      }


      if(!programId){
        return false;
      }
      let request;
        request={
                    "mechanic" : this.getAttempt[currentAttempt].campaignType,
                    "programmeId": programId,
                    "configurationId": ngps[0].configID,
                    "flowLabel": ngps[0].flowLabel
        }
        return request;
    },
    submitPrize(){
      let request=this.request;
      let changeRequest=this.generateRequest(1);
      request = {...request, changeRequest}

          this.$store.dispatch(SUBMIT_FORM,request)
                .then((response)=>{
                   // this.submitted=true;
                   this.addGTMSuccess();
                    this.response=response.data;
                    this.isPrizePage=false;
                });
    },
    submitQuestion(){
      this.isPrizePage=true;
      this.submitLuckyDraw();

    },
    addGTMSuccess(){
          this.$gtm.push({
            'event' : 'event_form_submit',
            'category' : 'form submit',
            'action' : 'success',
            'label' : 'rhythm sign up'
      });
     },
    submitLuckyDraw(){

        let attemptData =this.attemptData;
        let prize =[
              {
                  text : attemptData.FormHeading.thankYouMessage,
                  name : this.submissionText.luckyDrawSuccess,
                  image:  '/img/landing/luckydraw.png' ,
                  note : null
                  ,button:[]
                  ,havejoox:attemptData.FormHeading.Prize,
                  isPlayAgain:true,
                  code: null,
                subName:null
              }
          ];
          this.prize=prize;
          this.jooxMessage=attemptData.FormHeading.Prize;
    },
    submit(data){
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.attemptData=data.attemptData;
      this.request=data.request;
      this.response=prizewin;
      if(attemptData.campaignType == 'InstantWin'){
        this.isPrizePage=true;
          let prize =[
              {
                  text : attemptData.FormHeading.thankYouMessage,
                  name : prizewin.instantWinResult.redeemedPrize.name,
                  image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
                  note : null
                  ,button:[{
                      id:"redeemNow",
                      text:this.submissionText.redeemPrize,
                      link:prizewin.instantWinResult.redeemedPrize.redeemDescription + "?"+this.$config.voucherParameter+"="+prizewin.instantWinResult.redeemedPrize.voucherCode
                  },
                    {
                      id:"gotoquestions",
                      text:this.submissionText.nextPrize,
                      type:"submission",
                      link:"#"
                    }

                  ]
                  ,havejoox:attemptData.FormHeading.Prize,
                  code:  prizewin.instantWinResult.redeemedPrize.voucherCode,
                  isPlayAgain:false,
                subName:null
              }
          ];
          this.prize=prize;

          this.listenNowLink=prizewin.instantWinResult.redeemedPrize.redemptionLink;
          this.jooxMessage=attemptData.FormHeading.Prize;
      }
      else{
        this.isPrizePage=false;
      }


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
