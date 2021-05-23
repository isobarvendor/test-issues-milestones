<template>
 <div style="width:100%" class="winning-area">
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
  <div class="container  prize-chance black-red-border" >
      <div class="wrapper"  v-if="prize.length>0">
        <PrizeItem :prize="prize[0]" :themes="1" @playAgain="playAgain"  />
      </div>
    </div>
      <div class="container  prize-chance black-red-border luckydraw"  v-if="campaignWin=='InstantWin'">
      <div class="wrapper center"  >
         <p> {{submissionText.luckyDrawHeader}} </p>  <BR/>
         <p>  {{submissionText.luckyDrawSuccess}} </p>  <BR/><BR/>
          <img src= '/img/landing/luckydraw.png' /><BR/><BR/>
           <a style="text-decoration:none" href="/#prize"> {{submissionText.luckyDrawFooter}}</a><BR/>
           <div style="max-width:800px" v-html="this.submissionText.luckyDrawSubHeader"></div>
      </div>
    </div>
    <div class="container prize-chance redbox-withwhiteborder joox-section" v-if="jooxMessage"   >
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
        submissionText:translation.submissionText,
        campaignWin:null,
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
    addGTMSuccessPrize(prize){
          this.$gtm.push({
            'event' : 'event_redeem_page1',
            'gift_name':prize,
      });
    /*  console.log({
            'event' : 'event_redeem_page1',
            'gift_name':prize,
      });*/
     },
       addGTMSuccessLucky(){
          this.$gtm.push({
            'event' : 'event_redeem_page1',
            'category' : 'form submit',
            'action' : 'success',
            'label' : 'LUCKY_DRAW'
      });
    /*  console.log({
            'event' : 'event_redeem_page1',
            'category' : 'form submit',
            'action' : 'success',
            'label' : 'LUCKY_DRAW'
      });*/
     },
    submit(data){
      this.submitted=true;
      let prizewin=data.response;
      let attemptData =data.attemptData;
      this.request=data.request;

      let prize = [];
      if(attemptData.campaignType == 'InstantWin' && prizewin.instantWinResult!=null && prizewin.instantWinResult.winner ){
        this.campaignWin=attemptData.campaignType;
        if(prizewin.grivy){
          this.addGTMSuccessPrize("Coke");
           prize =[
              {
                  text : this.submissionText.prizeBarcodeHeader.replace("<<NAME>>",prizewin.instantWinResult.redeemedPrize.name),
                  name : '<div class="namePrize">'+prizewin.instantWinResult.redeemedPrize.name + "</div>"+ '<img src="'+prizewin.grivy.secret_code_image+'" width="100%" /> <div class="namePrize">'+prizewin.grivy.store_name+'</div>',
                  image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
                  note : '<div class="glink">Jika ada kendala mengenai penukaran kode, hubungi Support Grivy melalui link <a target="_blank" href="https://grivy.app/ad/support-coke-music-1">ini.​</a></div>'
                  ,button:[]
                  ,havejoox:attemptData.FormHeading.Prize,
                  code:  null,
                subName:null,
                 luckyDraw:false,
                 prizeType:"Coke",
              }
          ];
        }else{
          this.addGTMSuccessPrize("JOOX");
          prize =[
              {
                  text : attemptData.FormHeading.thankYouMessage,
                  name : prizewin.instantWinResult.redeemedPrize.name,
                  image: prizewin.instantWinResult.redeemedPrize.imgUrl ? prizewin.instantWinResult.redeemedPrize.imgUrl : '/img/landing/week 1 prize.png' ,
                  note : null
                  ,button:[{
                      id:"Redeem_Now",
                      text:this.submissionText.redeemPrize,
                      link:prizewin.instantWinResult.redeemedPrize.redeemDescription + "?"+this.$config.voucherParameter+"="+prizewin.instantWinResult.redeemedPrize.voucherCode
                  }]
                  ,havejoox:attemptData.FormHeading.Prize,
                  code:  prizewin.instantWinResult.redeemedPrize.voucherCode,
                subName:null,
                 luckyDraw:false,
                 prizeType:"Joox",
              }
          ];
        }

          this.prize=prize;

          this.jooxMessage=attemptData.FormHeading.Prize;
      }
      else{
        this.addGTMSuccessLucky();
        this.campaignWin="luckyDraw";
            prize =[
              {
                  text : "<h1>"+this.submissionText.luckyDrawHeader+"</h1>",
                  name : this.submissionText.luckyDrawSuccess2,
                  image:  '/img/landing/luckydraw.png' ,
                  note : this.submissionText.luckyDrawSubHeader
                  ,button:[]
                  ,havejoox:attemptData.FormHeading.Prize,
                  code: null,
                subName:null,
                luckyDraw:true,
                 prizeType:"Lucky_Draw",
              }

          ];
          this.prize=prize;


        this.jooxMessage=attemptData.FormHeading.Prize;
      }
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

             this.$scrollTo('.winning-area', 60, options)

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
.prize-chance.luckydraw p{
  font-size:25px;
  max-width: 600px;
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
.center{
  text-align: center;
}
.prize-chance .namePrize{
  padding-bottom: 20px;
  padding-top: 10px;
}
</style>
