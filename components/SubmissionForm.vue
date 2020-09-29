<template>
  <div  v-if="!submitted">
   <div class="header">Be the lucky one</div>
  <form>

    <div>
      <input type="text" name="name" v-model="form.name" v-validate="'required'" placeholder="Name"/>
        <span class="error-message">{{ errors.first('name') }}</span>
    </div>
    <div>
      <input type="email" name="email" v-model="form.email"  v-validate="'required'" placeholder="Email"/>
        <span class="error-message">{{ errors.first('email') }}</span>
    </div>
    <div v-if="submissionType=='with_code_submission'" >
      <input v-model="form.code"  v-validate="'required'" type="number" name="code" placeholder="10-digit code"/>
        <span class="error-message">{{ errors.first('code') }}</span>
    </div>
    <div v-if="submissionType=='with_receipt'">
      <div v-if="!image">
       <h2>Upload reciept</h2>
       <input type="file" @change="onFileChange" value="uploadReceipt">
      </div>
      <div v-else>
        <img :src="image" width="100" />
        <button @click="removeImage">Remove image</button>
      </div>
    </div>

    <br>

    <div class="row top">
      <div class="col d-flex">
        <div class="checkbox">
          <label for="form_tnc">
            <input type="checkbox" name="tnc" id="form_tnc" v-model="form.terms">
            <span></span>
          </label>
        </div>
        <div>I accept the <a href="">Terms and Conditions</a> of this this redemption.</div>
      </div>
    </div>

    <div class="row top">
      <div class="col d-flex">
        <div class="checkbox">
          <label for="form_pp">
            <input type="checkbox" name="privacy" id="form_pp" v-model="form.privacy">
            <span></span>
          </label>
        </div>
        <div>I accept the <a href="">Privacy Policy</a> of this redemption.</div>
      </div>
    </div>
   <div class="error-message" v-if="errorMessage" v-html="errorMessage"></div>
    <v-btn class="get-code"  v-on:click="submit()">Enter Draw</v-btn>
  </form>
  </div>
  <div v-else>
    <div class="header">{{thankyouSubmission.title}} </div>
    <div class="header">{{form.name}}</div>
    <div>
        {{thankyouSubmission.message}} <a href='#'>{{form.email}}</a>
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
        //login token
        token:this.$store.state.token,
        //login data
        login:this.$store.state.login
    }
  },
  computed:{
    submissionType(){

      return this.data ? this.data.campaignTypes.submissionType : null;
    },
     campaignType(){

      return this.data ? this.data.campaignTypes.mechanicType : null;
    },
    thankyousubmission(){
       return this.data ? this.data.thankyousubmission : null;
    }
  },
  methods:{
    async submit() {
      let request = null;
      let type ="default";

       this.$validator.validateAll().then( async(valid) => {
         if(valid){
           if(!this.form.terms){
             this.errorMessage="Please accept our terms and conditions";
             return false;
           }
            if(!this.form.privacy){
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
                  console.log(response)
                  this.amazonImage=response.data.filePath;

                })
                .catch((error) =>{
                    if(error){
                      this.errorMessage="Upload error please try again";
                      return false;
                    }

                });
            }
                if(this.campaignType=='instant_win'){
                  type="always"
                }
                else if(this.campaignType=='luck_draw'){
                  type="lucky"
                }
                else {
                  type="default"
                }
               request={

                          "name"  : this.form.name,
                          "email" : this.form.email

                    }
               if(this.token){
                request["userId"]=this.$store.state.login.uuid;
               }
               if(this.amazonImage){
                 request['fileurl']=this.amazonImage;
               }
               if(this.form.code){
                 request['pin']=this.form.code;
               }

      //my code for submit

            this.$store.dispatch(SUBMIT_FORM,{request,type})
            .then((response)=>{
                this.submitted=true;
            })
            .catch((error) =>{
              let upload={
                request:this.$store.state.fileUploaded,
                type:'receipts'
              }
              this.$store.state.fileUploaded && this.$store.dispatch(DELETE_FILE,upload);
              this.submitted=false
              //console.log(error.response.data);
              if(error.response){
                this.errorMessage='Oops something went wrong please try again';
              }
               if(error.response && error.response.data.status=='401'){
                  sessionStorage.clear();
                  this.$store.commit('SET_LOGIN_ACCOUNT', null);
                  location.reload();
               }
            })
         }

       });

    },
    async getAccount(){

        if(this.$store.state.login){
          this.form.name=this.$store.state.login.name;
          this.form.email=this.$store.state.login.email;
        }else{
           this.$store.state.token && await this.$store.dispatch(GET_ACCOUNT,this.$store.state.token)
        }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.form.uploadFile = files[0];
      if (!files.length)
        return;
      this.createImage(files[0]);
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
  },
  created(){
    this.getAccount();
  }

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
</style>
