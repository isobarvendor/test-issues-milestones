<template>
  <div style="width:100%">
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
      <div class="container prize-chance black-red-border" id="prize-chance">
        <span v-html="thankYouMessage"></span>
        <!-- <span>{{ thankYouMessage }}</span> -->
        <div style="padding:20px; margin: auto;" v-if="loading">
          <v-progress-circular
            :width="2"
            color="white"
            indeterminate
          ></v-progress-circular>
        </div>
        <div class="wrapper" v-for="(item, idx) in prize" :key="idx">
          <PrizeItem
            :prize="item"
            :themes="themes"
            @playAgain="playAgain"
            @submitPrize="submitPrize"
            v-if="prize.length > 0"
            :loading="loading"
          />
          <div class="error-message" v-if="idx == prize.length - 1">
            {{ errorMessage }}
          </div>
        </div>
        <div class="error-message" v-if="prize.length == 0">
          {{ errorMessage }}
        </div>
      </div>
      <div v-if="prize.length == 0" style="text-align:center">
        <span v-html="thankYouMessage"></span>

        <!--div class="prize-button-area center" style="margin-top:40px;">
          <v-btn @click="playAgain" id="participateAgain">{{
            submissionText.participateAgain
          }}</v-btn>
        </div-->
      </div>
      <div
        class="container prize-chance redbox-withwhiteborder joox-section"
        v-if="prize.length > 0 && prize[0].havejoox"
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
import { SUBMIT_FORM, FETCH_CMS_DATA } from "@/store/action_types";
import Login from "./SubmissionLogin";
import Form from "./SubmissionForm";
import { translation } from "@/constants/index";

let configID = process.env.configID.split(",");

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
      submitNumber: 0,
      listenNowLink: "",
      request: {},
      attemptData: null,
      lotID: null,
      themes: 1,
      thankYouMessage: "",
      request: {
        email: ""
      },
      errorMessage: null,
      submissionText: translation.submissionText,
      loading: false,
      winFirstPrize: false
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
    async submitPrize() {
      let request = this.request;
      let response = {};
      let data = {
        attemptData: this.attemptData,
        request: this.request
      };

      request.configurationId = configID[this.submitNumber - 1];
      request.hasMore = false;

      if (this.submitNumber == 1) {
        this.loading = true;
        try {
          const token = await this.$recaptcha.execute("register");
          //console.log('ReCaptcha token:', token)

          request.captchaResponse = token;
          this.$store
            .dispatch(SUBMIT_FORM, request)
            .then(response => {
              data.response = response.data;
              this.submitOne(data, true, 2);
              this.loading = false;
              this.winFirstPrize = true;
            })
            .catch(error => {
              this.winFirstPrize = false;

              if (error.response) {
                //this.errorMessage=this.submissionText.errorNormalPrize;
                let prize = [
                  {
                    text: "<h2>" + this.submissionText.hardLuckHeader + "</h2>",
                    name: this.submissionText.hardLuckTitle,
                    note: null,
                    image: this.submissionText.hardLuckImage,
                    havejoox: false,
                    button: [
                      {
                        text: this.submissionText.redeemPrize,
                        link: this.submissionText.hardLuckMusic,
                        id: "RedeemMusic"
                      },
                      {
                        text: this.submissionText.redeemNextPrize,
                        type: "submission",
                        id: 1
                      }
                    ],
                    code: null,
                    subName: null,
                    isPlayAgain: false
                  }
                ];
                this.prize = prize;
                this.submitNumber = 2;
                this.errorMessage = "";
              }

              this.loading = false;
            });
        } catch (error) {
          console.log("register error:", error);
        }
      } else {
        this.submitPrizeDouble(3);
      }
    },

    async submitPrizeDouble(page = 1) {
      this.loading = true;
      let request = this.request;

      let data = {
        attemptData: this.attemptData,
        request: request
      };

      if (request.pin[0] == "2") {
        for (let i = 0; i < 2; i++) {
          request.hasMore = i < 1 ? true : false;
          // console.log(request.hasMore);
          for (let a = 0; a < 1; a++) {
            request.configurationId = configID[a];
            try {
              const token = await this.$recaptcha.execute("register");
              //console.log('ReCaptcha token:', token)
              request.captchaResponse = token;

              await this.$store
                .dispatch(SUBMIT_FORM, request)
                .then(response => {
                  data.response = response.data;
                  // console.log(
                  //   response.data.instantWinResult.redeemedPrize
                  //     .shortDescription
                  // );

                  if (a == 0) {
                    this.submitOne(data, false, page);
                    if (configID.length == 1) {
                      this.loading = false;
                    }
                  } else {
                    this.submitTwo(data, page);
                    this.loading = false;
                  }
                })
                .catch(error => {
                  if (error.response) {
                    // console.log(error.response);
                    //this.errorMessage=this.submissionText.errorNormalPrize;
                    this.errorMessage = "";
                    if (a == 0) {
                      let prize = [
                        {
                          text:
                            "<h2>" +
                            this.submissionText.hardLuckHeader +
                            "</h2>",
                          name: this.submissionText.hardLuckTitle,
                          note: null,
                          image: this.submissionText.hardLuckImage,
                          havejoox: false,
                          button: [],
                          code: null,
                          subName: null,
                          isPlayAgain: false
                        }
                      ];
                      this.prize.push(prize[0]);
                      i = 100;
                    }
                  }

                  this.loading = false;
                });
            } catch (error) {
              console.log("register error:", error);
            }
          }
        }
      } else {
        request.hasMore = page > 1 && this.winFirstPrize ? true : false;
        for (let a = 0; a < configID.length; a++) {
          request.configurationId = configID[a];
          try {
            const token = await this.$recaptcha.execute("register");
            //console.log('ReCaptcha token:', token)
            request.captchaResponse = token;

            await this.$store
              .dispatch(SUBMIT_FORM, request)
              .then(response => {
                data.response = response.data;
                if (a == 0) {
                  this.submitOne(data, false, page);
                  if (configID.length == 1) {
                    this.loading = false;
                  }
                } else {
                  this.submitTwo(data, page);
                  this.loading = false;
                }
              })
              .catch(error => {
                if (error.response) {
                  //this.errorMessage=this.submissionText.errorNormalPrize;
                  this.errorMessage = "";
                  if (a == 0) {
                    let prize = [
                      {
                        text:
                          "<h2>" + this.submissionText.hardLuckHeader + "</h2>",
                        name: this.submissionText.hardLuckTitle,
                        note: null,
                        image: this.submissionText.hardLuckImage,
                        havejoox: false,
                        button: [],
                        code: null,
                        subName: null,
                        isPlayAgain: false
                      }
                    ];
                    this.prize = prize;
                  }
                }

                this.loading = false;
              });
          } catch (error) {
            console.log("register error:", error);
          }
        }
      }
    },
    addGTMSuccess(data) {
      this.$gtm.push(data);
      //console.log(data);
    },
    submit(data) {
      // console.log(data);
      this.submitted = true;
      let response = data.response;
      let lotID = response.lot.lotId;
      this.attemptData = data.attemptData;
      this.submitNumber = 1;
      this.lotID = lotID;
      this.request = data.request;
      if (!this.$config.lotID.includes(lotID)) {
        this.submitPrizeDouble();
      } else {
        this.addGTMSuccess({
          event: "event_redeem_page1",
          sku_type: "235ml or 300ml"
        });
        let prize = [
          {
            text: "<h2>" + this.submissionText.textPage + "</h2>",
            name: null,
            note: prizewin.instantWinResult.redeemedPrize.shortDescription,
            image: null,
            havejoox: false,
            button: [
              {
                text: this.submissionText.startRedeeming,
                type: "submission",
                id: 1
              }
            ],
            code: null,
            subName: null,
            isPlayAgain: false
          }
        ];
        this.prize = prize;
      }
    },
    submitOne(data, button = true, page = 1) {
      this.submitted = true;
      let prizewin = data.response;
      let attemptData = data.attemptData;
      this.submitNumber = 2;
      this.request = data.request;
      // console.log(data)
      let prize = [];
      if (prizewin.instantWinResult.winner) {
        if (page > 1) {
          this.addGTMSuccess({
            event: "event_redeem_page" + page,
            sku_type: "235ml or 300ml",
            gift_name: prizewin.instantWinResult.redeemedPrize.name
          });
        } else {
          this.addGTMSuccess({
            event: "event_redeem_page1",
            sku_type: "other sku",
            gift_name: prizewin.instantWinResult.redeemedPrize.name
          });
        }

        prize = [
          {
            text: attemptData.FormHeading.thankYouMessage,
            name: prizewin.instantWinResult.redeemedPrize.name,
            image: prizewin.instantWinResult.redeemedPrize.imgUrl
              ? prizewin.instantWinResult.redeemedPrize.imgUrl
              : "/img/landing/week 1 prize.png",
            note: prizewin.instantWinResult.redeemedPrize.shortDescription,
            button: button
              ? prizewin.instantWinResult.redeemedPrize.redemptionLink
                ? [
                    {
                      text: this.submissionText.redeemPrize,
                      link:
                        prizewin.instantWinResult.redeemedPrize.redemptionLink +
                        "?" +
                        this.$config.voucherParameter +
                        "=" +
                        prizewin.instantWinResult.redeemedPrize.voucherCode,
                      id: page
                    },
                    {
                      text: this.submissionText.redeemNextPrize,
                      type: "submission",
                      id: page
                    }
                  ]
                : [
                    {
                      text: this.submissionText.redeemNextPrize,
                      type: "submission",
                      id: page
                    }
                  ]
              : prizewin.instantWinResult.redeemedPrize.redemptionLink
              ? [
                  {
                    text: this.submissionText.redeemPrize,
                    link: this.$config.prizeHasVoucher.includes(
                      prizewin.instantWinResult.redeemedPrize.prizeId
                    )
                      ? prizewin.instantWinResult.redeemedPrize.redemptionLink +
                        "?" +
                        this.$config.voucherParameter +
                        "=" +
                        prizewin.instantWinResult.redeemedPrize.voucherCode
                      : prizewin.instantWinResult.redeemedPrize.redemptionLink,
                    id: page
                  }
                ]
              : [],
            havejoox: false,
            code: !prizewin.instantWinResult.redeemedPrize.redemptionLink
              ? prizewin.instantWinResult.redeemedPrize.voucherCode
              : null,
            subName: null
          }
        ];
      } else {
        prize = [
          {
            text: "<h2>" + this.submissionText.hardLuckHeader + "</h2>",
            name: this.submissionText.hardLuckTitle,
            note: prizewin.instantWinResult.redeemedPrize.shortDescription,
            image: this.submissionText.hardLuckImage,
            havejoox: false,
            button: [],
            code: null,
            subName: null,
            isPlayAgain: false
          }
        ];
      }
      // this.prize = prize;
      this.prize.push(prize[0]);

      // console.log(prize);
      //  this.listenNowLink=prizewin.instantWinResult.redeemedPrize.redemptionLink;
    },
    submitTwo(data, page = 1) {
      // console.log(data)
      this.submitted = true;
      let prizewin = data.response;
      let attemptData = data.attemptData;
      this.submitNumber = 3;
      let prize = [];
      if (prizewin.instantWinResult.winner) {
        if (page > 1) {
          this.addGTMSuccess({
            event: "event_redeem_page" + page,
            sku_type: "235ml or 300ml",
            gift_name: prizewin.instantWinResult.redeemedPrize.name
          });
        } else {
          this.addGTMSuccess({
            event: "event_redeem_page1",
            sku_type: "other sku",
            gift_name: prizewin.instantWinResult.redeemedPrize.name
          });
        }

        prize = [
          {
            text: null,
            name: prizewin.instantWinResult.redeemedPrize.name,
            image: prizewin.instantWinResult.redeemedPrize.imgUrl
              ? prizewin.instantWinResult.redeemedPrize.imgUrl
              : "/img/landing/week 1 prize.png",
            note: prizewin.instantWinResult.redeemedPrize.shortDescription,
            button: prizewin.instantWinResult.redeemedPrize.redemptionLink
              ? [
                  {
                    text: this.submissionText.redeemPrize,
                    link: this.$config.prizeHasVoucher.includes(
                      prizewin.instantWinResult.redeemedPrize.prizeId
                    )
                      ? prizewin.instantWinResult.redeemedPrize.redemptionLink +
                        "?" +
                        this.$config.voucherParameter +
                        "=" +
                        prizewin.instantWinResult.redeemedPrize.voucherCode
                      : prizewin.instantWinResult.redeemedPrize.redemptionLink,
                    id: page
                  }
                ]
              : [],
            havejoox: false,
            code: prizewin.instantWinResult.redeemedPrize.voucherCode,
            subName: null,
            isPlayAgain: false
          }
        ];
      } else {
        prize = [
          {
            text: "<h2>" + this.submissionText.hardLuckHeader + "</h2>",
            name: this.submissionText.hardLuckTitle,
            note: null,
            image: this.submissionText.hardLuckImage,
            havejoox: false,
            button: [],
            code: null,
            subName: null,
            isPlayAgain: false
          }
        ];
      }

      //console.log(prize)
      this.prize = [...this.prize, ...prize];

      // this.listenNowLink=prizewin.instantWinResult.redeemedPrize.shortDescription;
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy();
  }
};
</script>

<style>
.error-message {
  padding-top: 20px;
  color: #fff;
  text-align: center;
}
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
.prize-chance .wrapper {
  padding-top: 30px;
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
</style>
