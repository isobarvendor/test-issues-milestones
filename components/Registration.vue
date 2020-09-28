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
            <a  class="button" v-on:click="register()" >Register</a>
        </div>

    </div>
    <div class="profile-icon">
            <img src="/img/icons/profile-icon.png"/>
        </div>
    </div>
</div>
</template>

<script>
import { SIGNUP, LOGIN } from '@/store/action_types';
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
        password:null
      },
      errorMessage:null
    };
  },
  props: {
    data: null,
  },
  computed:{
  },
  methods:{
      register(){
           this.$validator.validateAll().then((valid) => {
         if(valid){
             this.errorMessage=null;
             if(!this.terms){
              this.errorMessage="Please accept the terms and condition"
              return false;
            }
            if(this.user.password!=this.cpassword){
              this.errorMessage="Your password and confirm password is different"
              return false;
            }
            this.$store.dispatch(SIGNUP,this.user)
            .then( (response)=> {
              let login = {
                email:this.user.email,
                password:this.user.password
              }
               this.$store.dispatch(LOGIN,login)
                .then((response)=>{
                    this.$router.push('/account');
                })
            })
            .catch((error) =>{
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
