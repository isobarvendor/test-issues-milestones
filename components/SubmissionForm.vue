<template>
  <div  v-if="!submitted">
   <div class="header">Be the lucky one</div>
  <form class="mechanics" autocomplete="off">

    <div class="details">
      <input type="text" name="name" v-model="form.name" v-validate="'required'" placeholder="Name"/>
        <span class="error-message">{{ errors.first('name') }}</span>
    </div>
    <div class="details">
      <input type="email" name="email" v-model="form.email"  v-validate="'required'" placeholder="Email"/>
        <span class="error-message">{{ errors.first('email') }}</span>
    </div>
    <div v-if="submissionType=='with_code_submission'"  class="details">
      <input v-model="form.code"  v-validate="'required'" type="text" name="code" placeholder="10-digit code"/>
        <span class="error-message">{{ errors.first('code') }}</span>
    </div>
    <div v-if="submissionType=='with_receipt'" class="details receipt">
      <div v-if="!image">
       <!--<h2>Upload reciept</h2>-->
       <label for="file-upload" class="custom-file-upload">
       <img src="/img/icons/upload-icon.png"/> <span class="labels">Upload receipt</span>
      </label>
       <input id="file-upload" type="file" @change="onFileChange" value="uploadReceipt">
      </div>
      <div v-else>
        <img :src="image" width="100" />
        <button @click="removeImage">Remove image</button>
      </div>
    </div>

    <br>

    <div class="row top">
      <div class="col d-flex consent">
        <div class="checkbox">
          <label for="form_tnc">
            <input type="checkbox" name="tnc" id="form_tnc" v-model="form.terms">
            <span></span>
          </label>
        </div>
        <div class="terms">I accept the <a href="">Terms and Conditions</a> of this this redemption.</div>
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
        <div class="terms">I accept the <a href="">Privacy Policy</a> of this redemption.</div>
      </div>
    </div>
   <div class="error-message" v-if="errorMessage" v-html="errorMessage"></div>
    <div class="btn-area">
      <v-progress-circular
        :width="2"
        color="white"
        indeterminate
        v-if="loading"
      ></v-progress-circular>
      <v-btn class="get-code" v-else  v-on:click="submit()">Enter Draw</v-btn>
    </div>
  </form>
  </div>
  <div v-else class="thanks">
    <div v-if="prizeWin">
        <div class="header">{{thankyouPage.Title}}</div>
        <div class="header">{{prizeWin.name}} </div>
        <div>
            <img :src="prizeWin.imgUrl" width="250" />
        </div>
        <div>
            {{prizeWin.shortDescription}}
        </div>
    </div>
    <div v-else>
      <div class="header">{{thankyouSubmission.title}} </div>
      <div class="header">{{form.name}}</div>
      <div>
          {{thankyouSubmission.message}} <a href='#'>{{form.email}}</a>
      </div>
    </div>

  </div>
</template>

<script>
import { SUBMIT_FORM, UPLOAD_FILE, GET_ACCOUNT, DELETE_FILE } from '@/store/action_types';
export default {
    name:"Form",
    inject: ['$validator'],
     props: {
        data: null,
      },
       data(){
    return{
        form:{
          name:null,
          email:null,
          code:null,
          terms:false,
          privacy:false,
          uploadFile:null
        },
        errorMessage:null,
        submitted:false,
        image:'',
        amazonImage:'',
        loading:false,
        prizeWin:null

    }
  },
  computed:{
    submissionType(){

      return this.data.campaignTypes.submissionType;
    },
     campaignType(){
      return this.data.campaignTypes.mechanicType;
    },
    thankyouSubmission(){
       return this.data.thankyouSubmission;
    },
     thankyouPage(){
       return this.data.ThankYouPage;
    },
    loginInfo(){
      return this.$store.getters.getLoginAccount;
    }
  },
  methods:{
    async submit() {
      let request = null;
      this.loading=true;
       this.$validator.validateAll().then( async(valid) => {
         if(valid){
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
             this.errorMessage=null;
            if(this.form.uploadFile){
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
            }

               request={
                          "name"  : this.form.name,
                          "email" : this.form.email
                    }
               if(this.loginInfo){
                request["userId"]=this.loginInfo.uuid;
               }
               if(this.amazonImage){
                 request['imageurl']=this.amazonImage;
               }
               if(this.form.code){
                 request['pin']=this.form.code;
               }

      //my code for submit

            this.$store.dispatch(SUBMIT_FORM,request)
            .then((response)=>{
                this.submitted=true;
                this.loading=false;
                let result=response.data;
                if( result && result.instantWinResult && result.instantWinResult.redeemedPrize.status=='claimed'){
                  this.prizeWin = result.instantWinResult.redeemedPrize;
                }
            })
            .catch((error) =>{
              let upload={
                request:this.$store.state.fileUploaded,
                type:'receipts'
              }
              this.$store.state.fileUploaded && this.$store.dispatch(DELETE_FILE,upload);
              this.submitted=false
              this.loading=false;
             // if(error.response){
                this.errorMessage='Oops something went wrong please try again';
              //}
               if(error.response && error.response.data.status=='401'){
                  localStorage.clear();
                  this.$store.commit('SET_LOGIN_ACCOUNT', null);
                  this.$store.commit('SET_TOKEN', null);
                  location.reload();
               }
            })
         }

       });

    },
       getAccount(){
        if(this.loginInfo){
          this.form.name=this.loginInfo.name;
          this.form.email=this.loginInfo.email;
        }

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

    }

  },
  beforeMount() {},
  mounted(){
    this.getAccount();
  },
}
</script>

<style scoped>
  .error-message{
    color:red;
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
}
button.get-code{
  height: 60px !important;
}
form.mechanics{
  margin: 0 1em;
}
.thanks{
  text-align: center;
}
</style>
