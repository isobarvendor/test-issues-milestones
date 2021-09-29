<template>
<div class="registration">
    <h3>{{data.title}}</h3>
     <div class="registration-body">
    <div class="details">
        <div class="input-container">
            <v-text-field label="Name" name="name" v-model="user.name"  v-validate="'required'">   </v-text-field>
            <span class="error-message">{{ errors.first('name') }}</span>
            <v-text-field label="Email address" name="email"  v-model="user.email"  v-validate="'required|email'" >   </v-text-field>
            <span class="error-message">{{ errors.first('email') }}</span>
            <v-text-field label="Password" name="password"  :type="'password'" v-model="user.password"  v-validate="'required'" >   </v-text-field>
            <span class="error-message">{{ errors.first('password') }}</span>
            <v-text-field label="Confirm password" name="confirm password"  :type="'password'" v-model="cpassword"  v-validate="'required'" >   </v-text-field>
            <span class="error-message">{{ errors.first('confirm password') }}</span>
        </div>
        <div class="radio-container">
            <!-- <v-radio-group v-model="radioGroup">
                <v-radio></v-radio>
            </v-radio-group> -->
            <v-checkbox v-model="terms"></v-checkbox>
            <div class="radio-label"><span v-html="data.privacyRegister.description"></span></div>
        </div>
        <div class="button-container">
          <div class="error-message" v-if="errorMessage" v-html="errorMessage"></div>
          <div class="btn-area">
               <v-progress-circular
                  :width="2"
                  color="white"
                  indeterminate
                  v-if="loading"
                ></v-progress-circular>
            <a  class="button" v-on:click="register()" v-else >Register</a>
          </div>
        </div>

    </div>
    <div class="profile-icon">
            <img src="/img/icons/profile-icon.png"  v-if="!image"/>
      <div v-if="!image" class="input-area">

       <input type="file" @change="onFileChange" value="uploadReceipt">
      </div>
      <div v-else-if="image" class="input-area">
        <img :src="image" width="100%" /><BR/>
        <button @click="removeImage">Remove image</button>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import { SIGNUP, LOGIN, UPLOAD_FILE } from '@/store/action_types';
export default {
  name: "Registration",
  inject: ['$validator'],
  components: {
  },
  data() {
    return {
      terms:false,
      cpassword:null,
      user:{
        name:null,
        email:null,
        password:null,
      },
      errorMessage:null,
      image:null,
      uploadFile:null,
      amazonImage:null,
      loading:false
    };
  },
  props: {
    data: null,
  },
  computed:{
    loginInfo(){
      return this.$store.getters.getLoginAccount;
    }
  },
  methods:{
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      let FileSize = files[0].size / 1024 / 1024; // in MB
        if (FileSize > 2) {
           this.errorMessage ="Please upload file not more than 2 MB"
           return;
        }
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      let filePath = e.target.value;
      if(!allowedExtensions.exec(filePath)){
         this.errorMessage ="Please upload image file"
           return;
      }
      this.uploadFile = files[0];
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

    },
      async register(){

           this.$validator.validateAll().then(async(valid) => {

         if(this.loginInfo){
            localStorage.clear();
          }
         if(valid){
            this.loading=true;
             this.errorMessage=null;
             if(!this.terms){
               this.loading=false;
              this.errorMessage="Please accept the terms and condition"
              return false;
            }
            if(this.user.password!=this.cpassword){
              this.loading=false;
              this.errorMessage="Your password and confirm password is different"
              return false;
            }
              if(this.uploadFile){
              var formData = new FormData();
              formData.append("file", this.uploadFile);
                let upload={
                request:formData,
                type:'profile-picture'
              }

               await this.$store.dispatch(UPLOAD_FILE,upload)
               .then((response)=>{

                  this.amazonImage=response.data.url;

                })
                .catch((error) =>{
                });
            }
             if(this.amazonImage){
                 this.user.profilePicture=this.amazonImage;
               }

            this.$store.dispatch(SIGNUP,this.user)
            .then( (response)=> {
              let login = {
                email:this.user.email,
                password:this.user.password
              }

               this.$store.dispatch(LOGIN,login)
                .then((response)=>{
                    this.loading=false;
                    location.href='/account';
                })
                 .catch((error) =>{
                  this.loading=false;
                  if(error.response){
                    this.errorMessage='Something went wrong please try again';
                  }
            })
            })
            .catch((error) =>{
              this.loading=false;
              if(error.response && error.response.data.status=='400'&&error.response.data.message=="error.validation"){
                this.errorMessage='Please use another email';
              }else{
                this.errorMessage='Something went wrong please try again';
              }
            })
         }

       });
      },
      radioGroup(){

      }
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.registration{

  .profile-icon{
    position: relative;
     input{
      width: 250px;
      height: 250px;
      position: absolute;
      opacity: 0;
      top:0px;

    }
    .input-area{
      text-align: center;
        img{
                width:235px;
                height: 235px;
                border-radius: 120px;
            }
    }

  }

    .error-message{
      color:red;
    }
    h3{
        font-size: 25px;
        text-transform: none;
    }
    .registration-body{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 85%;
        .v-text-field__slot{
            border-bottom: 1px solid #585858;
        }
        .theme--light.v-label{
            color: #585858;
        }
        .theme--light.v-input input{
            color: #ffffff;
        }
        .details{
            margin-top: 40px;
            width: 50%;
        }
        .input-container{
            margin-top: 25px;
        }
        .radio-container{
            display: flex;
            align-items: center;
            .radio-label{
                font-size: 14px;
                margin-left: 10px;
                line-height: 24px;
            }
            .v-input--selection-controls__input .v-icon{
                color: #585858;
            }
        }
        .button-container{
            .btn-area{
              text-align: center;
            }
            margin-top: 40px;
            a.button{
                width: 230px;
                display: block;
            }
        }

    }
    @media only screen and (max-width: 1199px) {
        .registration-body{
            flex-direction: column-reverse;
            width: 100%;
            .details{
                width: 100%;
            }
            .profile-icon{
                margin-top: 35px;
            }
            a.button{
                margin:auto;
            }
        }
        h3{
            text-align: center;
            font-size: 22px;
        }
    }
}
</style>
