<template>
 <div style="width:100%">
  <div class="container mechanics campaign-section redbox-withwhiteborder submission-section submission" id="submission-section" v-if="cmsData&&!submitted">
      <div class="divider">
        <img src="/develop/fanta-logo.png" width="100%" />
      </div>
      <Login :social="dataSocial" v-if="!this.$store.state.login"   />
      <Form :data="dataForm" :cmsData="cmsData[0]"  v-if="this.$store.state.login" @submit="submit"  />
      <!--Login :social="dataSocial" v-if="false"   />
      <Form :data="dataForm" :cmsData="cmsData[0]" /-->

  </div>
  <div  v-else >
  <!-- <div class="container  prize-chance black-red-border">
      <div class="wrapper"> -->
      <!-- <PrizeItem :prize="prize[0]" :themes="1" @playAgain="playAgain" v-if="prize.length>0"  /> -->
      <PrizeRedeem @scroll="scroll" v-if="prize.length>0" :voucher="prize[0].code" :data="cms" :image="prize[0].image" :config="dataForm" />
      <div v-else style="text-align:center">

            <span v-html="thankYouMessage"></span>
             <div class="prize-button-area center" style="margin-top:40px;">
                  <v-btn @click="playAgain" id="participateAgain">{{submissionText.participateAgain}}</v-btn>
            </div>

      </div>
<!--       </div>
    </div> -->
    <!-- <div class="container prize-chance redbox-withwhiteborder joox-section" v-if="jooxMessage"   >
      <div class="background-image-joox">
      <img src="/img/landing/back-dots.png" />
    </div> -->
    <LuckyDraw id="lucky" :data="dataForm" :cms="cms"/>
    <!-- <div class="desc-joox" >
        <span v-html="jooxMessage"></span>
        div class="joox-listen">
            <a :href="listenNowLink" target="_blank"><v-btn >{{submissionText.listenNow}}</v-btn></a>
        </div>
    </div> -->
  </div>
    <Sticky v-if="submitted" @scroll="playAgain" :label="submissionText.participateAgain"/>
  </div>
 </div>
</template>

<script>
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
import {translation} from "@/constants/index"
export default {
  name: "SubmissionMechanics",
  components:{
    Login,
    Form
  },
   props: {
        dataForm: null,
        cms: null
      },
  data() {
    return {
        prize:[],
        submitted:false,
        listenNowLink:'',
        thankYouMessage:"",
        request:{
          email:''
        },
        submissionText:translation.submissionText
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
  mounted(){
      this.$emit('changeStatus',this.submitted);
  },

  methods: {
    playAgain(){
      this.submitted=false;
      this.prize=[];
      this.$emit('changeStatus',this.submitted);
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
        this.$scrollTo('#form', 120, options);
    },
    submit(data){
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.request=data.request;
      if(attemptData.campaignType == 'InstantWin'){
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
                  }]
                  ,havejoox:attemptData.FormHeading.Prize,
                  code:  prizewin.instantWinResult.redeemedPrize.voucherCode,
                subName:null
              }
          ];
          this.prize=prize;
          this.listenNowLink=prizewin.instantWinResult.redeemedPrize.redemptionLink;
          this.jooxMessage=attemptData.FormHeading.Prize;
      }
      else{
        this.thankYouMessage=attemptData.FormHeading.thankYouMessage;
        this.listenNowLink="";
        this.jooxMessage=attemptData.FormHeading.Prize;
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
}
</script>

<style>
  .submission{
    margin: auto;
    background-image: url('/develop/background-submission.png');
    background-size: 100% 101%;
    z-index: 100;
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
