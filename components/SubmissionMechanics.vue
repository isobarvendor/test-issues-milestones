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
        <PrizeItem :prize="prize[0]" :themes="1" @playAgain="playAgain" @submitPrize="submitPrize"  v-if="isPrizePage" :loading="loading"  />
        <PrizeQuestion :questions="questions" @submit="submitQuestionWithSubmit" v-else-if="fromInstantWin&&!isPrizePage" :loading="loading" />
        <PrizeQuestion :questions="questions" @submit="submitQuestion" v-else-if="!fromInstantWin&&!isPrizePage" :loading="loading" />
        <div v-if="errorMessage" v-html="errorMessage" class="errorMessage"/>
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
import { SUBMIT_FORM, START_QUESTION, SEND_ANSWER } from '@/store/action_types';
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
        isPrizePage:false,
        fromInstantWin:false,
        questionAnswerData:null,
        participationId:-1,
        errorMessage:null,
        jooxMessage:null,
        loading:false,
        question:[]
    }

  },
    computed:{
    getAttempt(){
      return this.dataForm.attempts;
    },
    questions(){
      let question= this.getAttempt[1] ? this.getAttempt[1].Question : null;
      if(this.getAttempt[1]&&this.getAttempt[1].Question){
        this.question[0] = question[Math.floor(Math.random() * question.length)];
      }
      //console.log(question)
      return this.question;
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
       this.prize=[];
      this.question=[];
      this.submitted=false;

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
      this.isPrizePage=false;
      this.fromInstantWin=true;
      this.startQuestion();
    },
    startQuestion(){
         this.loading = true;
         this.$store.dispatch(START_QUESTION,'')
        .then((response)=>{
          this.questionAnswerData = response.data;
           this.loading = false;
        })
         .catch((error) =>{
           this.loading = false;
                 if(error.response && error.response.data.status=='201'){
                    this.questionAnswerData = error.response.data.data;
                 }
                 if(error.response && error.response.data.status=='401'){
                      localStorage.clear();
                      this.$store.commit('SET_LOGIN_ACCOUNT', null);
                      this.$store.commit('SET_TOKEN', null);
                      location.reload();
                  }
           })

    },
    submitQuestion(data){

      this.submitLuckyDraw(data);

    },
    submitQuestionWithSubmit(dataQuestion){
      this.errorMessage=null
      this.loading = true;
      let request=this.request;
      request['hasMore'] = true;
      let changeRequest=this.generateRequest(1);
      request = {...request, ...changeRequest}
      this.$store.dispatch(SUBMIT_FORM,request)
      .then((response)=>{
          // this.submitted=true;
          this.addGTMSuccess();
          this.response=response.data;
          this.participationId=response.data.participationId;
          this.submitLuckyDraw(dataQuestion);
           this.loading = false;

      })
       .catch((error) =>{
                  this.loading=false;
                    if(error.response){
                    this.errorMessage=this.submissionText.errorAPI;
                  }
                   if(error.response && error.response.data.detail){
                     this.errorMessage=this.submissionText.errorPinCode;
                   }

                 if(error.response && error.response.data.status=='401'){
                      localStorage.clear();
                      this.$store.commit('SET_LOGIN_ACCOUNT', null);
                      this.$store.commit('SET_TOKEN', null);
                      location.reload();
                  }
                  if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='1'){
                    this.errorMessage=this.submissionText.errorPinCode1;
                  }
                    if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='2'){
                    this.errorMessage=this.submissionText.errorPinCode4;
                  }
                  if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='4'){
                    this.errorMessage=this.submissionText.errorPinCode2;
                  }
                   if(error.response&&error.response.data.trace && error.response.data.trace.errorCode=='6'){
                    this.errorMessage=this.submissionText.errorPinCode3;
                  }
                })
    },

    addGTMSuccess(){
          this.$gtm.push({
            'event' : 'event_form_submit',
            'category' : 'form submit',
            'action' : 'success',
            'label' : 'rhythm sign up'
      });
     },
    submitLuckyDraw(data){
      let request = {
                      id:this.questionAnswerData.id,
                      question:data.question,
                      answer:data.answer,
                      participationId:this.questionAnswerData.participationId
                    }; // add question answer data
       if(this.participationId!=-1){
        request = {...request, participationId:this.participationId}; // add participation id data
      }
      this.errorMessage=null
      this.$store.dispatch(SEND_ANSWER,request)
        .then((response)=>{
              let attemptData =this.attemptData;
              //console.log("attemptData",attemptData)
              let prize =[
                    {
                        text : "",
                        name : attemptData.FormHeading.thankYouMessage,
                        image:  '/img/landing/luckydraw_my.png' ,
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
                this.isPrizePage=true;
                this.loading=false;
        })
         .catch((error) =>{
            this.loading = false;
                 if(error.response && error.response.data.status=='401'){
                      localStorage.clear();
                      this.$store.commit('SET_LOGIN_ACCOUNT', null);
                      this.$store.commit('SET_TOKEN', null);
                      location.reload();
                  }else{
                    this.errorMessage="Failed sending answer. Please try again."
                  }
           })


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
                       type:"link",
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
        this.participationId=prizewin.participationId;
         this.fromInstantWin=false;
        this.startQuestion();
      }


    }
  },
  mounted(){
    console.log(this.questions)
  }
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
.errorMessage{
  text-align: center;
  color:red;
  padding-top: 30px;
  padding-bottom: 30px;
}

</style>
