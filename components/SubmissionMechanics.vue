I<template>
  <div style="width:100%" class="winning-area">
    <div
      class="container campaign-section redbox-withwhiteborder submission-section"
      id="submission-section"
      v-if="cmsData && !submitted"
    >
      <div class="divider">
        <img src="/img/landing/coke line divider.png" width="100%" />
      </div>
      <Login :social="dataSocial" v-if="!this.$store.state.login" />
      <Form
        :data="dataForm"
        :cmsData="cmsData[0]"
        v-if="this.$store.state.login"
        @submit="submit"
      />
      <!--Login :social="dataSocial" v-if="false"   />
      <Form :data="dataForm" :cmsData="cmsData[0]" /-->
    </div>
    <div v-else>
      <div class="container  prize-chance black-red-border">
        <div style="padding:20px; margin: auto;" v-if="loading">
          <v-progress-circular
            :size="32"
            :width="4"
            color="white"
            indeterminate
          ></v-progress-circular>
        </div>
        <div class="wrapper" v-if="!loading">
          <!-- <PrizeItem :prize="prize[0]" :themes="1" @playAgain="playAgain"  /> -->
          <PrizeItem
            v-for="(p, index) in prize"
            :key="index"
            :prize="prize[index]"
            :themes="1"
            @playAgain="playAgain"
            :showParticipateAgain="index == prize.length - 1 ? true : false"
          />
        </div>
      </div>
      <div
        class="container  prize-chance black-red-border luckydraw"
        v-if="campaignWin == 'InstantWin'"
      >
        <div class="wrapper center">
          <p>{{ submissionText.luckyDrawHeader }}</p>
          <BR />
          <p>{{ submissionText.luckyDrawSuccess }}</p>
          <BR /><BR /> <img src="/img/landing/luckydraw.png" /><BR /><BR />
          <a style="text-decoration:none" href="/#prize">
            {{ submissionText.luckyDrawFooter }}</a
          ><BR />
          <div
            style="max-width:800px"
            v-html="this.submissionText.luckyDrawSubHeader"
          ></div>
        </div>
      </div>
      <div
        class="container prize-chance redbox-withwhiteborder joox-section"
        v-if="jooxMessage"
      >
        <div class="background-image-joox">
          <img src="/img/landing/back-dots.png" />
        </div>
        <div class="desc-joox">
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
import Login from "./SubmissionLogin";
import Form from "./SubmissionForm";
import { translation } from "@/constants/index";
import { SUBMIT_FORM } from "@/store/action_types";

export default {
  name: "SubmissionMechanics",
  components: {
    Login,
    Form
  },
  props: {
    dataForm: null
  },
  data() {
    return {
      prize: [],
      submitted: false,
      listenNowLink: "",
      thankYouMessage: "",
      loading: true,
      request: {
        email: ""
      },
      submissionText: translation.submissionText,
      campaignWin: null
    };
  },
  computed: {
    campaignType() {
      return this.dataForm;
    },
    cmsData() {
      return this.$store.getters.getCMSContent;
    },

    email() {
      return this.request.email;
    },
    dataSocial() {
      return {
        email: this.dataForm.socialMedia.Email,
        facebook: this.dataForm.socialMedia.Facebook,
        google: this.dataForm.socialMedia.Google,
        line: this.dataForm.socialMedia.Line
      };
    }
  },

  methods: {
    playAgain() {
      this.submitted = false;
      this.prize = [];
    },
    addGTMSuccessPrize(prize) {
      this.$gtm.push({
        event: "event_redeem_page1",
        gift_name: prize
      });
      /*  console.log({
            'event' : 'event_redeem_page1',
            'gift_name':prize,
      });*/
    },
    addGTMSuccessLucky() {
      this.$gtm.push({
        event: "event_redeem_page1",
        category: "form submit",
        action: "success",
        label: "LUCKY_DRAW"
      });
      /*  console.log({
            'event' : 'event_redeem_page1',
            'category' : 'form submit',
            'action' : 'success',
            'label' : 'LUCKY_DRAW'
      });*/
    },
    submit(data) {
      console.log(data)
      this.submitted = true;
      let prize = [];
      for (let index=0;index<2;index++){
        let prizewin = data[index].response;
        let attemptData = data[index].attemptData;
        this.request = data[index].request;
        this.loading = true;
        let newRequest = data[index].request;
        newRequest.hasMore = true;
        if (index==1){
          newRequest.hasMore = false;
        }
        this.$store.dispatch(SUBMIT_FORM, newRequest).then(async response => {
          let prizewin2 = await response.data;
          console.log(prizewin2)
          if (
            attemptData.campaignType == "InstantWin" &&
            prizewin2.instantWinResult != null &&
            prizewin2.instantWinResult.winner
          ) {
            /////////// Instant Win ///////////
            this.campaignWin = attemptData.campaignType;
            if (prizewin2.grivy) {
              this.addGTMSuccessPrize("Coke");
              prize.push({
                text: this.submissionText.prizeBarcodeHeader.replace(
                  "<<NAME>>",
                  prizewin2.instantWinResult.redeemedPrize.name
                ),
                name:
                  '<div class="namePrize">' +
                  prizewin2.instantWinResult.redeemedPrize.name +
                  "</div>" +
                  '<img src="' +
                  prizewin2.grivy.secret_code_image +
                  '" width="100%" /> <div class="namePrize">' +
                  prizewin2.grivy.store_name +
                  "</div>",
                image: prizewin2.instantWinResult.redeemedPrize.imgUrl
                  ? prizewin2.instantWinResult.redeemedPrize.imgUrl
                  : "/img/landing/week 1 prize.png",
                note:
                  '<div class="glink">Jika ada kendala mengenai penukaran kode, hubungi Support Grivy melalui link <a target="_blank" href="https://grivy.app/ad/support-coke-music-1">ini.​</a></div>',
                button: [],
                havejoox: attemptData.FormHeading.Prize,
                code: null,
                subName: null,
                luckyDraw: false,
                prizeType: "Coke"
              });
            } else {
              this.addGTMSuccessPrize("JOOX");
              prize.push({
                text: attemptData.FormHeading.thankYouMessage,
                name: prizewin2.instantWinResult.redeemedPrize.name,
                image: prizewin2.instantWinResult.redeemedPrize.imgUrl
                  ? prizewin2.instantWinResult.redeemedPrize.imgUrl
                  : "/img/landing/week 1 prize.png",
                note: null,
                button: [
                  {
                    id: "Redeem_Now",
                    text: this.submissionText.redeemPrize,
                    link:
                      prizewin2.instantWinResult.redeemedPrize
                        .redeemDescription +
                      "?" +
                      this.$config.voucherParameter +
                      "=" +
                      prizewin2.instantWinResult.redeemedPrize.voucherCode
                  }
                ],
                havejoox: attemptData.FormHeading.Prize,
                code: prizewin2.instantWinResult.redeemedPrize.voucherCode,
                subName: null,
                luckyDraw: false,
                prizeType: "Joox"
              });
            }

            this.jooxMessage = attemptData.FormHeading.Prize;
          } else {
            this.addGTMSuccessLucky();
            this.campaignWin = "luckyDraw";
            prize.push({
              text: "<h1>" + this.submissionText.luckyDrawHeader + "</h1>",
              name: this.submissionText.luckyDrawSuccess2,
              image: "/img/landing/luckydraw.png",
              note: this.submissionText.luckyDrawSubHeader,
              button: [],
              havejoox: attemptData.FormHeading.Prize,
              code: null,
              subName: null,
              luckyDraw: true,
              prizeType: "Lucky_Draw"
            });

            this.jooxMessage = attemptData.FormHeading.Prize;
          }
          if (index == 1) {
            this.loading = false;
          }
        });
        this.prize = prize;
        console.log(this.prize);
      }
      
      var options = {
        container: "body",
        easing: "ease-in",
        lazy: false,
        offset: -60,
        force: true,
        cancelable: true,
        x: false,
        y: true
      };

      this.$scrollTo(".winning-area", 60, options);
    }
  }
};
</script>

<style>
.prize-chance.joox-section {
  padding-top: 80px;
  text-align: center;
  min-height: 380px !important;
}
.prize-chance .background-image-joox {
  position: absolute;
  top: 0px;

  z-index: 0;
}
.prize-chance .background-image-joox img {
  width: 100%;
}
.prize-chance.luckydraw p {
  font-size: 25px;
  max-width: 600px;
}
.desc-joox {
  z-index: 1;
}
.desc-joox h4 {
  font-size: 25px;
  max-width: 500px;
  margin: auto;
  padding-bottom: 10px;
  text-align: center;
}
.joox-listen {
  padding-top: 50px;
}
.joox-listen .v-btn:not(.v-btn--round).v-size--default {
  padding: 30px;
  font-weight: bold;
}
.center {
  text-align: center;
}
.prize-chance .namePrize {
  padding-bottom: 20px;
  padding-top: 10px;
}
</style>
