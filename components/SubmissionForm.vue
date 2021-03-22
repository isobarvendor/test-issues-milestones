<template>
  <div>
  <div >
    <div class="img-footer" >
            <img src="/img/landing/instruments.png" width="100%" />
    </div>
   <div class="header">{{form.name ? submissionText.hello+" "+form.name : submissionText.header}}</div>
  <form class="mechanics" autocomplete="off">
    <div class="inner-wrapper">
     <div class="details" v-if="submissionFormFields&&submissionFormFields.isNameActive">
      <input id="name" type="text" name="name" v-model="form.name" v-validate="'required'" :placeholder="submissionText.name" readonly/>
        <!--span class="error-message">{{ errors.first('name') }}</span-->
    </div>
    <div class="details" v-if="submissionFormFields&&submissionFormFields.isEmailActive">
      <input id="email" type="email" name="email" v-model="form.email"  v-validate="'required'" :placeholder="submissionText.email" readonly/>
        <!--span class="error-message">{{ errors.first('email') }}</span-->
    </div>
    <div class="details" v-if="submissionFormFields&&submissionFormFields.isPhoneNumberActive">
      <div class="btn-text">
        <input id="phoneCode" type="tel"  v-model="phoneCodeDisplay"   :readonly="true" />
     <input id="phoneNumber" type="tel" name="phone" v-model="form.phoneNumber" v-validate="'required'"  class="short"  :placeholder="submissionText.phoneNumber"  />
      </div>
        <div class="info-icon tooltip">
            <img src="/img/landing/info-button.png" width="25"  />
            <span class="tooltiptext">{{submissionText.phoneTooltip}}</span>
          </div>
        <span class="error-message">{{ errors.first('phone') ? (errors.first('phone').includes('required') ? submissionText.errorRequiredPhone : errors.first('phone')) : errors.first('phoneNumber')   }}</span>
    </div>
    </div>

    <div class="checkbox-area">
    <div class="inner-wrapper">
       <div class="row top">
          <div class="col d-flex consent">
            <div class="checkbox">
              <label for="form_pp">
                <input type="checkbox" name="privacy" id="form_pp" v-model="form.privacy">
                <span></span>
              </label>
            </div>
            <div class="terms" v-html="submissionText.acceptPrivacy"></div>
          </div>
        </div>
    </div>

   <v-row  class="top two-checkbox"  >
    <v-col
        cols="12"
        md="6"
        sm="6"
        class="no-padding-top border-white-right"
      >
       <div class="row top">
        <div class="col d-flex consent">
          <div class="checkbox">
            <label for="form_tnc">
              <input type="checkbox" name="tnc" id="form_tnc" v-model="form.terms">
              <span></span>
            </label>
          </div>
          <div class="terms" v-html="submissionText.acceptTerm"></div>
        </div>
      </div>
    </v-col>
      <v-col
        cols="12"
        md="6"
        sm="6"
        class="no-padding-top"
      >
          <div class="row top">
            <div class="col d-flex consent">
              <div class="checkbox">
                <label for="form_age">
                  <input type="checkbox" name="ageConsent" id="form_age" v-model="form.ageConsent">
                  <span></span>
                </label>
              </div>
              <div class="terms" v-html="submissionText.declareAge"></div>
            </div>
          </div>
      </v-col>
   </v-row>
    </div>
   <div class="error-message-black" v-if="errorMessage" v-html="errorMessage"></div>
    <div class="btn-area">

      <div class="info-btn"  >
          <div class="btn-text">
          <input id="code" v-model="form.code"  v-validate="'required'" type="text" name="code" :placeholder="submissionText.enterCode"/>
             <span class="error-message-red">{{ errors.first('code') }}</span>
          </div>
          <div class="info-icon tooltip">
            <img src="/img/landing/info-button.png" width="25"  />
            <span class="tooltiptext">{{submissionText.tooltipText}}</span>
          </div>
      </div>
         <div class="details receipt">
      <div v-if="!image">

       <label for="file-upload" class="custom-file-upload">
       <img src="/img/icons/upload-icon.png"/> <span class="labels">Upload unique code image</span>
      </label>
       <input id="file-upload" name="upload" type="file"  v-validate="'required'" @change="onFileChange" value="uploadReceipt">
      </div>
      <div v-else class="image-upload-container">
        <v-row no-gutters  class="center-layout" >
          <v-col
              cols="6"
            >
            <img :src="image" width="100" />
          </v-col>
          <v-col
              cols="6"
            >
                <span>{{fileName}}</span>
          </v-col>
        </v-row>
        <button class="remove-image" @click="removeImage">X</button>
      </div>
    </div>
      <span class="error-message">{{ errors.first('upload') }}</span>

      <div style="padding:20px"  v-if="loading">
      <v-progress-circular
        :width="2"
        color="white"
        indeterminate

      ></v-progress-circular>
      </div>
      <v-btn class="get-code" id="submission"  dark v-else  v-on:click="submit()">{{submissionText.buttonText}}</v-btn>
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
import { SUBMIT_FORM, UPLOAD_FILE, CHECK_ATTEMPT, DELETE_FILE,GET_LIST_WALLET } from '@/store/action_types';
import * as _ from 'lodash';
import {translation} from "@/constants/index"
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
        fileName:"",
        image:'',
        amazonImage:null,
        loading:false,
        prizeWin:null,
        phoneCodeDisplay:"+"+this.$config.phoneCode,
        phoneCode:this.$config.phoneCode+"-",
        showPhone:false,
        submissionText:translation.submissionText


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


    maxPhoneNumber(){
      return this.$config.maxPhoneNumber;
    },
     /*campaignTitle(){
      return this.data.campaignTypes.Title;
    },*/

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
    async uploadFile(){

              var formData = new FormData();
              formData.append("file", this.form.uploadFile);
                let upload={
                request:formData,
                type:'receipts'
              }

               await this.$store.dispatch(UPLOAD_FILE,upload)
               .then((response)=>{
                  this.amazonImage=response.data.filePath;

                })
                .catch((error) =>{
                    if(error){
                      this.errorMessage="Upload error please try again";
                      return false;
                    }

                });


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
          return a.codeInitial!=null&&a.codeInitial.toUpperCase()==this.form.code.charAt(0).toUpperCase()&&a.characterLimit==this.form.code.length;
        })
        //console.log(programs);
        let programsNull=_.filter(mixCode,(a)=>{
          return (a.codeInitial==null||a.codeInitial=="")&&a.characterLimit==this.form.code.length;
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
          request["phone"]=this.phoneCode+this.form.phoneNumber;
        }
        if(this.form.code){
          request['pin']=this.form.code;
        }
        if(this.amazonImage){
          request['imageurl']=this.amazonImage;
        }

        return request;
    },
      onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      let FileSize = files[0].size / 1024 / 1024; // in MB
        if (FileSize > 2) {
           this.errorMessage ="Please upload file not more than 2 MB"
           return;
        }
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf)$/i;
      let filePath = e.target.value;
      this.fileName= e.target.files[0].name;
      if(!allowedExtensions.exec(filePath)){
         this.errorMessage ="Please upload image or file"
           return;
      }
      this.form.uploadFile = files[0];
      this.createImage(files[0]);
       this.errorMessage = null;
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
      this.amazonImage =null;
    },
    async checkcurrentAttempt(){
      await this.$store.dispatch(CHECK_ATTEMPT)
      .then((response)=>{
        this.currentAttempt=response.data.currentAttemptNumber;
      })
      .catch((error) =>{
        if(error){
          this.currentAttempt=0;
        }
      });
    },

    async submit() {
      let request = null;
      this.loading=true;
      let index =0;


       this.$validator.validateAll().then( async(valid) => {
         if(valid&&this.errors.all().length<=0){
           let currentattempt=0;

            if(!this.form.privacy){
              this.loading=false;
             this.errorMessage=this.submissionText.errorPolicy;
             return false;
           }
             if(!this.form.terms&&!this.form.ageConsent){
             this.loading=false;
              this.errorMessage=this.submissionText.errorDeclare;
             return false;
           }

             this.errorMessage=null;
             await this.checkcurrentAttempt();

            if(this.getAttempt)
            {
               if(this.form.uploadFile&&!this.amazonImage){
                await this.uploadFile();
               }

            //my code for submit
                request = this.generateRequest(this.currentAttempt);
                if(!request){
                  this.loading=false;
                  this.errorMessage=this.submissionText.errorPinCode;
                  return false;
                }
                this.$store.dispatch(SUBMIT_FORM,request)
                .then((response)=>{
                   // this.submitted=true;
                   this.addGTMSuccess();
                   let loginData={...this.$store.state.login, phone : this.phoneCode+this.form.phoneNumber, terms:this.form.terms, privacy:this.form.privacy, ageConsent:this.form.ageConsent  }

                   this.$store.commit('SET_LOGIN_ACCOUNT',loginData );
                    this.loading=false;
                    let result=response.data;
                    if( result) {
                      this.prizeWin = result;
                      let attemptData=this.attemptData
                      let data={
                        attemptData,response:result,request
                      }
                        this.$emit('submit',data);


                    }
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
               }else{
                 this.loading=false;
                 this.errorMessage=this.submissionText.errorPinCode;
               }
         }else{
            this.loading=false;
         }

       });

    },
       async getAccount(){
        if(this.loginInfo){
          this.form.name=this.loginInfo.name;
          this.form.email=this.loginInfo.email;
           if(this.loginInfo.phone){
             this.form.phoneNumber=this.loginInfo.phone.replace(this.phoneCode,"").replace(this.phoneCodeDisplay,"");
             this.showPhone=true;
           }
           this.form.privacy=this.loginInfo.privacy;

        }
        await this.checkcurrentAttempt();
        if(this.currentAttempt>1){
           this.form.privacy=true;
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
     },
     addGTMSuccess(){
          this.$gtm.push({
            'event' : 'event_form_submit',
            'category' : 'form submit',
            'action' : 'success',
            'label' : 'rhythm sign up'
      });
     },


  },
  beforeMount() {},
  mounted(){
    this.getAccount();
  },
  watch:{
     "form.phoneNumber": function (val) {
       let envs=this.$config;
       if(val.length==1){
         if(val=="0"){
            this.form.phoneNumber="";
         }
       }
       if((val.length)>envs.maxPhoneNumber){
         this.errors.clear();
         this.$validator.errors.add({
          field: 'phoneNumber',
          msg: 'You’ve reached the maximum phone number length'
        });
       }else if(isNaN(val)){
         this.errors.clear();
         this.$validator.errors.add({
          field: 'phoneNumber',
          msg: 'Please enter a number'
        });
       }
       else{
            this.errors.clear()
       }
    },
  }

}
</script>

<style scoped>
  .details{
    position: relative;
  }
  .error-message-red{
    color:red;
  }
  .error-message{
    color:#000;
  }
  .error-message-black{
    color:#000;
    text-align: center;
    padding-bottom: 20px;
  }
  .d-flex {
    display: flex;
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
  max-width: 360px;
  margin: auto;
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
.info-btn .info-icon{
  position: absolute;
  right: 10px;
  top: 34%;

}
.details .info-icon{
  position: absolute;
  right: 10px;
  top: 0px;

}
 form input#code::placeholder{
   color: #1d1d1b;
   text-decoration: underline;
 }
 form input#code{
   color: #1d1d1b;
   text-align: center;
 }
.tooltip {

  display: inline-block;

}
.no-padding-top{
  padding-top: 0px !important;
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
      top: -15px;
  }
  .details .tooltip .tooltiptext {
    top:-50px;
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
form input#phoneCode{
  width: 35px !important;
  display: inline-block;
  border: none;
}
form input#phoneNumber{
   border: none;
}
form input#phoneNumber.short{
  width: calc(100% - 65px) !important;
  border: none;
}
.details .btn-text{
  border-bottom: solid 1px #fff;
}
form.mechanics{
 margin: auto;
}
.two-checkbox{
  margin-top: 40px !important;
  margin-bottom: 40px !important;
}
</style>
