<template>
  <div>
  <div >
    <div class="img-footer" >
            <img src="/img/landing/instruments.png" width="100%" />
    </div>
   <div class="header"></div>
  <form class="mechanics" autocomplete="off">
    <div class="details" v-if="submissionFormFields&&submissionFormFields.isEmailActive">
      <input id="email" type="email" name="email" v-model="form.email"  v-validate="'required'" placeholder="Email" readonly/>
        <!--span class="error-message">{{ errors.first('email') }}</span-->
    </div>
    <div class="details" v-if="submissionFormFields&&submissionFormFields.isNameActive">
      <input id="name" type="text" name="name" v-model="form.name" v-validate="'required'" placeholder="Name" readonly/>
        <!--span class="error-message">{{ errors.first('name') }}</span-->
    </div>
      <div class="details" v-if="submissionFormFields&&submissionFormFields.isPhoneNumberActive">
      <input id="phoneNumber" type="text" name="phoneNumber" v-model="form.phoneNumber" v-validate="'required'"   placeholder="Phone number" />
        <span class="error-message">{{ errors.first('phoneNumber') }}</span>
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

    <br>

    <div class="row top">
      <div class="col d-flex consent">
        <div class="checkbox">
          <label for="form_tnc">
            <input type="checkbox" name="tnc" id="form_tnc" v-model="form.terms">
            <span></span>
          </label>
        </div>
        <div class="terms">I accept the <a href="/tnc">Terms and Conditions</a> of this this redemption.</div>
      </div>
    </div>

    <div class="row top">
      <div class="col d-flex consent">
        <div class="checkbox">
          <label for="form_pp">
            <input type="checkbox" name="privacy" id="form_pp" v-model="form.privacy">
            <span></span>
          </label>
        </div>
        <div class="terms">I accept the <a href="/privacy">Privacy Policy</a> of this redemption.</div>
      </div>
    </div>
        <div class="row top">
      <div class="col d-flex consent">
        <div class="checkbox">
          <label for="form_age">
            <input type="checkbox" name="ageConsent" id="form_age" v-model="form.ageConsent">
            <span></span>
          </label>
        </div>
        <div class="terms">I declare that I am above 13  years old.</div>
      </div>
    </div>
   <div class="error-message-black" v-if="errorMessage" v-html="errorMessage"></div>
    <div class="btn-area">

      <div class="info-btn"  >
          <div class="btn-text">
          <input id="code" v-model="form.code"  v-validate="'required'" type="text" name="code" placeholder="Enter Unique Code"/>
             <span class="error-message">{{ errors.first('code') }}</span>
          </div>
          <div class="info-icon tooltip">
            <img src="/img/landing/info-button.png" width="25"  />
            <span class="tooltiptext">Enter the code found under the cap/tab of your Coca Cola purchase here</span>
          </div>
      </div>
      <div style="padding:20px"  v-if="loading">
      <v-progress-circular
        :width="2"
        color="white"
        indeterminate

      ></v-progress-circular>
      </div>
      <v-btn class="get-code"  dark v-else  v-on:click="submit()">Collect your prize</v-btn>
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
import { CHECK_MIXCODE, CHECK_ATTEMPT, GET_LIST_WALLET } from '@/store/action_types';
export default {
    name:"Form",
    inject: ['$validator'],
     props: {
        data: null,
        cmsData: null,
      },
       data(){
    return{
        form:{
          name:null,
          email:null,
          code:null,
          terms:false,
          privacy:false,
          uploadFile:null,
          phoneNumber:null
        },
        errorMessage:null,
        submitted:true,
        image:'',
        amazonImage:'',
        loading:false,
        prizeWin:null,


    }
  },
  computed:{
   /* submissionType(){

      return this.data.campaignTypes.submissionType;
    },*/
    submissionFormFields(){
      return this.data.submissionFormFields;
    },
     campaignType(){
      return "";
      //return this.data.campaignTypes.mechanicType;
    },


     /*campaignTitle(){
      return this.data.campaignTypes.Title;
    },*/
    campaignTitle(){
       return "Enter your code now";
    },
    thankyouSubmission(){
       return this.cmsData.ThankYouSubmission;
    },
     thankyouPage(){
       return this.cmsData.ThanksYouPage;
    },
    loginInfo(){
      return this.$store.getters.getLoginAccount;
    },
    getAttempt(){
      return this.data.attempts;
    }
  },
  methods:{
    generateRequest(currentAttempt){
      if(currentAttempt>=this.getAttempt.length){
        currentAttempt=this.getAttempt.length-1;
      }

      let mixCode=this.getAttempt[currentAttempt].mixCode;
      let ngps=this.getAttempt[currentAttempt].NPGS;
      let programId=null;
      this.attemptData=this.getAttempt[currentAttempt];
      for (let a=0;a<mixCode.length;a++) {
       // mixCode
       if(mixCode[a].characterLimit==this.form.code.length&&(mixCode[a].codeInitial==""||mixCode[a].codeInitial==null||mixCode[a].codeInitial==undefined||mixCode[a].codeInitial==this.form.code.charAt(0))){
          programId=mixCode[a].ProgrammeID;
        }
      }
      if(!programId){
        return false;
      }
      let request;
        request={
                    "name"  : this.form.name,
                    "email" : this.form.email,
                    "mechanic" : this.getAttempt[currentAttempt].campaignType,
                    "programmeId": programId,
                    "configurationId": ngps[0].configID,
                    "flowLabel": ngps[0].flowLabel
        }
        if(this.loginInfo){
          //request["userId"]=this.loginInfo.uuid;
        }
        if(this.form.phoneNumber){
          request["phone"]=this.form.phoneNumber;
        }
        if(this.form.code){
          request['pin']=this.form.code;
        }
        return request;
    },
    async checkcurrentAttempt(){
      await this.$store.dispatch(CHECK_ATTEMPT)
      .then((response)=>{
        this.currentAttempt=response.data.currentAttemptNumber;
      })
      .catch((error) =>{
        if(error){
          this.currentAttempt=9999999;
        }
      });
    },

    async submit() {
      let request = null;
      this.loading=true;
      let index =0;
      let response = {};

       this.$validator.validateAll().then( async(valid) => {
         if(valid&&this.errors.all().length<=0){
           let currentattempt=0;
           if(!this.form.terms){
             this.loading=false;
             this.errorMessage="Please accept our terms and conditions";
             return false;
           }
            if(!this.form.privacy){
              this.loading=false;
             this.errorMessage="Please accept our privacy policies";
             return false;
           }
            if(!this.form.ageConsent){
              this.loading=false;
             this.errorMessage="Please declare that you are above 13  years old";
             return false;
           }
             this.errorMessage=null;
             await this.checkcurrentAttempt();

            if(this.getAttempt)
            {

            //my code for submit
                request = this.generateRequest(this.currentAttempt);
                if(!request){
                  this.loading=false;
                  this.errorMessage='Oops your pin code is invalid or already redeemed';
                  return false;
                }
                this.$store.dispatch(CHECK_MIXCODE,request)
                .then((response)=>{
                   // this.submitted=true;
                   //console.log(response);
                   /* response.data={
                      "programId": 453269,
                      "code": "3WTD90GE5",
                      "lot": {
                        "lotId": 445586,
                        "lotName": "Coke 500ml PET",
                        "activateDate": 1611208800000,
                        "inactivateDate": 1627603200000,
                        "active": true,
                        "expired": false,
                        "bevProdPkg": {
                          "trademarkCd": "05",
                          "trademarkName": "Coca-Cola",
                          "brandCd": "001",
                          "brandName": "Coca-Cola",
                          "bevProdCd": "0001",
                          "bevProdName": "Coca-Cola",
                          "caffeinated": true,
                          "carbonated": true,
                          "calorieCategory": {
                            "code": 1,
                            "description": "Regular"
                          }
                        },
                        "releaseId": 494494,
                        "releaseName": "Coke PET",
                        "organizationId": 157168,
                        "organizationName": "Harish",
                        "realtimeCode": false,
                        "testRelease": false,
                        "pointValue": 0,
                        "bevProdOptions": []
                      },
                      "redeemed": false,
                      "actualCode": "3WTD90GE5"
                    };
*/

                    this.loading=false;
                    let result=response.data;
                    if( result) {
                      this.prizeWin = result;
                      let attemptData=this.attemptData
                      let data={
                        attemptData,response:result,request
                      }
                      //console.log(data);
                        this.$emit('submit',data);

                    }
                })
                .catch((error) =>{
                  this.loading=false;
                    if(error.response){
                    this.errorMessage='Oops something went wrong please try again';
                  }
                   if(error.response && error.response.data.detail){
                     this.errorMessage='Oops your pin code is invalid or already redeemed';
                   }

                 if(error.response && error.response.data.status=='401'){
                      localStorage.clear();
                      this.$store.commit('SET_LOGIN_ACCOUNT', null);
                      this.$store.commit('SET_TOKEN', null);
                      location.reload();
                  }
                  if(error.response&&error.response.data.errorCode=='5'){
                    this.errorMessage='Oops your pin code is invalid or already redeemed';
                  }
                })
               }else{
                 this.loading=false;
                 this.errorMessage='Oops your pin code is invalid or already redeemed';
               }
         }else{
            this.loading=false;
         }

       });

    },
       getAccount(){
        if(this.loginInfo){
          this.form.name=this.loginInfo.name;
          this.form.email=this.loginInfo.email;
        }


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
     goToRewards(){
       location.href='/rewards';
     }

  },
  beforeMount() {},
  mounted(){
    this.getAccount();
  },
  watch:{
     "form.phoneNumber": function (val) {
       let envs=this.$config;
       if(val.length==1){
         this.form.phoneNumber=envs.phoneCode+val;
       }
       if((val.length-envs.phoneCode.length)>envs.maxPhoneNumber){
         this.errors.clear();
         this.$validator.errors.add({
          field: 'phoneNumber',
          msg: 'You reach maximum phone number length'
        });
       }else{
            this.errors.clear()
       }
    },
  }

}
</script>

<style scoped>
  .error-message{
    color:red;
  }
  .error-message-black{
    color:#000;
  }
  .d-flex {
    display: flex;
    align-items: center;
  }
  .get-code {
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
.custom-file-upload span{
  padding-left: 20px;
}
.btn-area{
  text-align: center;
  margin-top: 30px;
}
button.get-code{
  height: 60px !important;
  border-radius: 15px;
}

form.mechanics{
  margin: 0 1em;
}
.thanks{
  text-align: center;
}
.info-btn{
  background: #fff;
  padding: 20px;
  border-radius:15px;
  cursor: pointer;
  position: relative;
}
.btn-text{
  color:#000;
  text-decoration: #000;
}
.info-icon{
  position: absolute;
  right: 10px;
  top: 34%;

}
 form input#code::placeholder{
   color: #1d1d1b;
 }
 form input#code{
   color: #1d1d1b;
   text-align: center;
   text-decoration: underline;
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
    top: -30px;
    left: 150%;
    text-align: left;
  }


  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #1d1d1b  transparent transparent;
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

</style>
