<template>
  <div>
    <div>
      <div class="img-footer">
        <img src="/img/landing/instruments.png" width="100%" />
      </div>
      <div class="header">
        {{
          form.name
            ? submissionText.hello + " " + form.name
            : submissionText.header
        }}
      </div>
      <form class="mechanics" autocomplete="off">
        <div
          class="details"
          v-if="submissionFormFields && submissionFormFields.isNameActive"
        >
          <input
            id="name"
            type="text"
            name="name"
            v-model="form.name"
            v-validate="'required'"
            :placeholder="submissionText.name"
          />
          <div style="text-align: left;">
            <p class="error-message">
              {{ errors.first("name") ? submissionText.errorRequiredName : "" }}
            </p>
            <p class="name-tip">{{ submissionText.nameTip }}</p>
          </div>
        </div>
        <div
          class="details"
          v-if="submissionFormFields && submissionFormFields.isEmailActive"
        >
          <input
            id="email"
            type="email"
            name="email"
            v-model="form.email"
            v-validate="'required'"
            :placeholder="submissionText.email"
            readonly
          />
          <!--span class="error-message">{{ errors.first('email') }}</span-->
        </div>
        <div
          class="details"
          v-if="
            submissionFormFields && submissionFormFields.isPhoneNumberActive
          "
        >
          <div class="btn-text">
            <input
              id="phoneCode"
              type="tel"
              v-model="phoneCodeDisplay"
              :readonly="true"
            />
            <input
              id="phoneNumber"
              type="tel"
              name="phone"
              v-model="form.phoneNumber"
              v-validate="'required'"
              class="short"
              :placeholder="submissionText.phoneNumber"
            />
          </div>
          <div class="info-icon tooltip">
            <img src="/img/landing/info-button.png" width="25" />
            <span class="tooltiptext">{{ submissionText.phoneTooltip }}</span>
          </div>
          <span class="error-message">{{
            errors.first("phoneNumber")
              ? errors.first("phoneNumber").includes("required")
                ? submissionText.errorRequiredPhone
                : errors.first("phoneNumber")
              : ""
          }}</span>
        </div>

        <!--div v-if="submissionType=='with_receipt'" class="details receipt">
      <div v-if="!image">

       <label for="file-upload" class="custom-file-upload">
       <img src="/img/icons/upload-icon.png"/> <span class="labels">Upload receipt</span>
      </label>
       <input id="file-upload" type="file" @change="onFileChange" value="uploadReceipt">
      </div>
      <div v-else>
        <img :src="image" width="100" />
        <button @click="removeImage">Remove image</button>
      </div>
    </div-->

        <br />

        <div class="row top">
          <div class="col d-flex consent">
            <div class="checkbox">
              <label for="form_tnc">
                <input
                  type="checkbox"
                  name="tnc"
                  id="form_tnc"
                  v-model="form.terms"
                />
                <span></span>
              </label>
            </div>
            <div class="terms" v-html="submissionText.acceptTerm"></div>
          </div>
        </div>
        <div class="row top">
          <div class="col d-flex consent">
            <div class="checkbox">
              <label for="form_age">
                <input
                  type="checkbox"
                  name="ageConsent"
                  id="form_age"
                  v-model="form.ageConsent"
                />
                <span></span>
              </label>
            </div>
            <div class="terms" v-html="submissionText.declareAge"></div>
          </div>
        </div>
        <div class="row top">
          <div class="col d-flex consent">
            <div class="checkbox">
              <label for="form_pp">
                <input
                  type="checkbox"
                  name="privacy"
                  id="form_pp"
                  v-model="form.privacy"
                />
                <span></span>
              </label>
            </div>
            <div class="terms" v-html="submissionText.acceptPrivacy"></div>
          </div>
        </div>

        <div
          class="error-message-black"
          v-if="errorMessage"
          v-html="errorMessage"
        ></div>
        <div class="btn-area">
          <div class="info-btn">
            <div class="btn-text">
              <input
                id="code"
                v-model="form.code"
                v-validate="'required'"
                type="text"
                name="code"
                :placeholder="submissionText.enterCode"
              />
              <span class="error-message-red">{{
                errors.first("code")
                  ? submissionText.theCodeFieldIsRequired
                  : null
              }}</span>
            </div>
            <div class="info-icon tooltip">
              <img src="/img/landing/info-button.png" width="25" />
              <span class="tooltiptext">{{ submissionText.tooltipText }}</span>
            </div>
          </div>
          <div style="padding:20px" v-if="loading">
            <v-progress-circular
              :width="2"
              color="white"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-btn
            class="get-code"
            id="form_submission"
            dark
            v-else
            v-on:click="submit()"
            >{{ submissionText.buttonText }}</v-btn
          >
        </div>
      </form>
    </div>

    <!--div v-else class="thanks"-->

    <!--div v-if="prizeWin.allocationArray">
        <div class="header">{{thankyouPage.Title}}</div>
        <div>{{  prizeWin.allocationArray[0].amount }}&nbsp;
            {{thankyouPage.Message}}
        </div>
        <div>
          <v-btn class="get-code" v-on:click="goToRewards()">View Rewards</v-btn>
        </div>
    </div>
     <div v-if="prizeWin.participationInserted">
           <div class="header" >{{thankyouSubmission.Ttitle}} </div>

        <div>
            {{thankyouSubmission.Message}} <a href='#'>{{form.email}}</a>
        </div>
    </div>
    <div v-if="prizeWin.instantWinResult&&prizeWin.instantWinResult.redeemedPrize.status=='claimed'">
        <div class="header">{{thankyouPage.Title}}</div>
        <div class="header">{{prizeWin.instantWinResult.redeemedPrize.name}} </div>
        <div>
            <img :src="prizeWin.instantWinResult.redeemedPrize.imgUrl" width="250" />
        </div>
        <div>
            {{prizeWin.instantWinResult.redeemedPrize.shortDescription}}
        </div>
    </div>
    <div v-else-if="prizeWin.instantWinResult&&prizeWin.instantWinResult.redeemedPrize.status!='claimed'">
      <div class="header" >{{thankyouSubmission.Ttitle}} </div>

       <div>
          {{prizeWin.instantWinResult.redeemedPrize.redeemDescription}}
       </div>
      <div>
          {{thankyouSubmission.Message}} <a href='#'>{{form.email}}</a>
      </div>
    </div>
  </div-->
  </div>
</template>

<script>
import {
  CHECK_MIXCODE,
  CHECK_ATTEMPT,
  GET_LIST_WALLET,
  GET_USER_DATA
} from "@/store/action_types";
import { translation } from "@/constants/index";
import * as _ from "lodash";
export default {
  name: "Form",
  inject: ["$validator"],
  props: {
    data: null,
    cmsData: null
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        code: null,
        terms: false,
        privacy: false,
        uploadFile: null,
        phoneNumber: null,
        ageConsent: null
      },
      errorMessage: null,
      submitted: true,
      image: "",
      amazonImage: "",
      loading: false,
      prizeWin: null,
      phoneCodeDisplay: "+" + this.$config.phoneCode,
      phoneCode: this.$config.phoneCode + "-",
      showPhone: false,
      submissionText: translation.submissionText
    };
  },
  computed: {
    /* submissionType(){

      return this.data.campaignTypes.submissionType;
    },*/
    submissionFormFields() {
      return this.data.submissionFormFields;
    },
    campaignType() {
      return "";
      //return this.data.campaignTypes.mechanicType;
    },

    maxPhoneNumber() {
      return this.$config.maxPhoneNumber;
    },

    /*campaignTitle(){
      return this.data.campaignTypes.Title;
    },*/

    thankyouSubmission() {
      return this.cmsData.ThankYouSubmission;
    },
    thankyouPage() {
      return this.cmsData.ThanksYouPage;
    },
    loginInfo() {
      return this.$store.getters.getLoginAccount;
    },
    getAttempt() {
      return this.data.attempts;
    }
  },
  methods: {
    generateRequest(currentAttempt) {
      if (currentAttempt >= this.getAttempt.length) {
        currentAttempt = this.getAttempt.length - 1;
      }

      let mixCode = this.getAttempt[currentAttempt].mixCode;
      let ngps = this.getAttempt[currentAttempt].NPGS;
      let programId = null;
      this.attemptData = this.getAttempt[currentAttempt];

      if (mixCode.length > 0) {
        // console.log(mixCode);
        let programs = _.filter(mixCode, a => {
          return (
            a.codeInitial !== null &&
            a.codeInitial.toUpperCase() ==
              this.form.code.charAt(0).toUpperCase() &&
            a.characterLimit == this.form.code.length
          );
        });
        //console.log(programs);
        let programsNull = _.filter(mixCode, a => {
          return (
            (a.codeInitial == null || a.codeInitial == "") &&
            a.characterLimit == this.form.code.length
          );
        });
        if (programs.length > 0) {
          programId = programs[0].ProgrammeID;
        } else {
          programId =
            programsNull.length > 0 ? programsNull[0].ProgrammeID : null;
        }
      }

      if (!programId) {
        return false;
      }
      let request;
      request = {
        name: this.form.name,
        email: this.form.email,
        mechanic: this.getAttempt[currentAttempt].campaignType,
        programmeId: programId,
        configurationId: ngps[0].configID,
        flowLabel: ngps[0].flowLabel,
        termsAgreement: this.form.terms,
        privacyAgreement: this.form.privacy,
        ageAgreement: this.form.ageConsent
      };
      if (this.loginInfo) {
        //request["userId"]=this.loginInfo.uuid;
      }
      if (this.form.phoneNumber) {
        request["phone"] = this.phoneCode + this.form.phoneNumber;
      }
      if (this.form.code) {
        request["pin"] = this.form.code;
      }
      return request;
    },
    async checkcurrentAttempt() {
      await this.$store
        .dispatch(GET_USER_DATA)
        .then(response => {
          this.form.phoneNumber = response.data.phoneNumber
            .replace(this.phoneCode, "")
            .replace(this.phoneCodeDisplay, "");
          // this.showPhone = true;
          this.currentAttempt = response.data.currentAttemptNumber;
          this.form.terms = response.data.termsAgreement;
          this.form.privacy = response.data.privacyAgreement;
          this.form.ageConsent = response.data.ageAgreement;
        })
        .catch(error => {
          if (error) {
            this.currentAttempt = 9999999;
          }
        });
    },

    async submit() {
      let request = null;
      this.loading = true;
      let index = 0;
      let response = {};

      this.$validator.validateAll().then(async valid => {
        if (valid && this.errors.all().length <= 0) {
          let currentattempt = 0;
          if (!this.form.terms) {
            this.loading = false;
            this.errorMessage = this.submissionText.errorTerm;
            return false;
          }
          if (!this.form.privacy) {
            this.loading = false;
            this.errorMessage = this.submissionText.errorPolicy;
            return false;
          }
          if (!this.form.ageConsent) {
            this.loading = false;
            this.errorMessage = this.submissionText.errorDeclare;
            return false;
          }
          this.errorMessage = null;
          await this.checkcurrentAttempt();

          if (this.getAttempt) {
            //my code for submit
            request = this.generateRequest(this.currentAttempt);
            if (!request) {
              this.loading = false;
              this.errorMessage = this.submissionText.errorPinCode;
              return false;
            }
            const captchaResponse = await this.$recaptcha.execute("validation");
            request.captchaResponse = captchaResponse;
            this.$store
              .dispatch(CHECK_MIXCODE, request)
              .then(response => {
                // this.submitted=true;
                let loginData = {
                  ...this.$store.state.login,
                  phone: this.phoneCode,
                  name: this.form.name
                };
                // console.log(loginData);

                this.$store.commit("SET_LOGIN_ACCOUNT", loginData);
                this.loading = false;
                // console.log(response);
                let result = response.data;
                if (result.redeemed) {
                  this.errorMessage = this.submissionText.errorPinCode;
                }
                if (!result.redeemed) {
                  this.prizeWin = result;
                  let attemptData = this.attemptData;
                  let data = {
                    attemptData,
                    response: result,
                    request
                  };
                  //console.log(data);
                  this.$emit("submit", data);
                }
              })
              .catch(error => {
                this.loading = false;
                if (error.response) {
                  this.errorMessage = this.submissionText.errorAPI;
                }
                if (error.response && error.response.data.status == "400") {
                  this.errorMessage = this.submissionText.errorPinCode;
                }

                if (error.response && error.response.data.status == "401") {
                  localStorage.clear();
                  this.$store.commit("SET_LOGIN_ACCOUNT", null);
                  this.$store.commit("SET_TOKEN", null);
                  location.reload();
                }
              });
          } else {
            this.loading = false;
            this.errorMessage = this.submissionText.errorPinCode;
          }
        } else {
          this.loading = false;
        }
      });
    },
    async getAccount() {
      if (this.loginInfo) {
        this.form.name = this.loginInfo.name;
        this.form.email = this.loginInfo.email;
        if (this.loginInfo.phone) {
          this.form.phoneNumber = this.loginInfo.phone
            .replace(this.phoneCode, "")
            .replace(this.phoneCodeDisplay, "");
          this.showPhone = true;
        }
      }
      await this.checkcurrentAttempt();
      if (this.currentAttempt > 1) {
      }
    },

    getListWallet() {
      this.$store
        .dispatch(GET_LIST_WALLET)
        .then(response => {})
        .catch(error => {
          if (error.response && error.response.data.status == "401") {
            localStorage.clear();
          }
        });
    },
    goToRewards() {
      location.href = "/rewards";
    },
    addPhoneCode() {
      this.showPhone = true;
    }
  },
  beforeMount() {},
  async mounted() {
    try {
      await this.getAccount();
    } catch (e) {
      console.error(e);
    }
  },

  watch: {
    "form.phoneNumber": function(val) {
      let envs = this.$config;
      if (val.length == 1) {
        if (val == "0") {
          this.form.phoneNumber = "";
        }
      }
      if (
        val.length > envs.maxPhoneNumber ||
        val.length < envs.minPhoneNumber
      ) {
        this.errors.clear();
        this.$validator.errors.add({
          field: "phoneNumber",
          msg: "តម្រូវឲ្យមានលេខទូរស័ព្ទ"
        });
      } else if (isNaN(val)) {
        this.errors.clear();
        this.$validator.errors.add({
          field: "phoneNumber",
          msg: "តម្រូវឲ្យមានលេខទូរស័ព្ទ"
        });
      } else {
        this.errors.clear();
      }
    }
  }
};
</script>

<style scoped>
.details {
  position: relative;
}
.error-message-red {
  color: red;
}
.error-message {
  color: #000;
  text-align: left;
}
.error-message-black {
  color: #000;
}

.d-flex {
  display: flex;
  align-items: center;
}
.get-code {
  font-family: "Koulen-Regular" !important;
  display: block;
  width: 100%;
  margin: 25px 0;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 12px 12px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
}
.custom-file-upload span {
  padding-left: 20px;
}
.btn-area {
  text-align: center;
  margin-top: 30px;
}
button.get-code {
  height: 60px !important;
  border-radius: 15px;
}

form.mechanics {
  margin: 0 1em;
}
.thanks {
  text-align: center;
}
.info-btn {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
}
.btn-text {
  color: #000;
  text-decoration: #000;
}
.info-btn .info-icon {
  position: absolute;
  right: 10px;
  top: 34%;
}
.details .info-icon {
  position: absolute;
  right: 10px;
  top: 0px;
}
form input#code::placeholder {
  color: #1d1d1b;
  text-decoration: underline;
}
form input#code {
  color: #1d1d1b;
  text-align: center;
}
.tooltip {
  display: inline-block;
}
@media only screen and (min-width: 769px) {
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 280px;
    background-color: #1d1d1b;
    color: #fff;
    border-radius: 6px;
    padding: 15px;
    position: absolute;
    z-index: 1;
    left: 150%;
    top: -15px;
    text-align: left;
  }
  .info-btn .tooltip .tooltiptext {
    top: -35px;
  }
  .details .tooltip .tooltiptext {
    top: -40px;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #1d1d1b transparent transparent;
  }
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
@media only screen and (max-width: 768px) {
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 280px;
    background-color: #1d1d1b;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    padding: 15px;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: -720%;
    margin-left: -60px;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 90%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #1d1d1b transparent;
  }
}
form input#phoneCode {
  width: 45px !important;
  display: inline-block;
  border: none;
}
form input#phoneNumber {
  border: none;
}
form input#phoneNumber.short {
  width: calc(100% - 65px) !important;
  border: none;
}
.details .btn-text {
  border-bottom: solid 1px #fff;
}
form.mechanics {
  margin: auto;
}
</style>
