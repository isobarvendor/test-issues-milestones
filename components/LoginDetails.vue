<template>
<div class="login-details">
    <div class="title-image"><img src="img/icons/coke.png" />
        <p>Sign up with us and gain access to our rewards catalogue where you can redeem prizes.</p>
    </div>
    <div class="continue" v-if="$mq == 'xl'"> 
        <p>Continue with</p>
        <div class="icons"> 
            <div v-if="line"><a href="#"><img src="img/icons/line.png" /></a></div>
            <div v-if="facebook"><a href="#"><img src="img/icons/fb.png" /></a></div>
            <div v-if="google"><a href="#"><img src="img/icons/google.png" /></a></div>
            <div v-if="email"><a href="#"><img src="img/icons/email.png" /></a></div>
        </div>
        <p> or </p>
    </div>
    <div class="login-box column center" v-if="$mq == 'sm' || $mq == 'md' || $mq == 'lg'">
      <a class="social-button fb" v-if="facebook"><i class="ic ic-fb" /><span>Continue with Facebook</span></a>
      <a class="social-button line" v-if="line"><i class="ic ic-line" /><span>Continue with LINE</span></a>
      <a class="social-button google" v-if="google"><i class="ic ic-google" /><span>Continue with Google</span></a>
      <a class="social-button email" v-if="email" v-on:click="testing()"><i class="ic ic-email" /><span>Continue with email</span></a>
  </div> 
  <transition name="fade">
    <div class="details" v-if="show">
        <div class="input-container">
            <v-text-field label="Email address">   </v-text-field>
            <v-text-field label="Password" :type="'password'">   </v-text-field>
        </div>
        <div class="button-container">
            <a  class="button">Login</a>
            <p>Forget Password</p>
            <p>Sign Up</p>
        </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: "LoginDetails",
  components: {
  },
  data() {
    return {
         show:true
    };
  },
  props: {
    data: null,
    email: {},
    facebook: {},
    google: {},
    line: {}
  },
  computed:{
  },
  methods:{
      testing(){
        return this.show = true;
     }
  },
  beforeMount() {},
  mounted(){
      if(this.$mq == 'sm' || this.$mq == 'md' || this.$mq == 'lg'){
        this.show=false;
       }
  }
};
</script>

<style lang="scss">
.login-details{
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-image{
        img{
            width: 230px;
            margin: auto;
            display: table;
            margin-bottom: 25px;
        }
        width: 50%;
        margin-bottom: 20px;
        text-align: center;
        line-height: 24px;
    }
    .continue{
        text-align: center;
        p{
            margin-bottom: 15px;
            margin-top: 15px;
        }
        .icons{
            width: 350px;
            display: flex;
            justify-content: space-evenly;
        }
    }
    .details{
        width: 50%;
    }
    .v-text-field__slot{
        border-bottom: 1px solid #585858;
    }
    .theme--light.v-label{
        color: #585858;
    }
    .theme--light.v-input input{
        color: #ffffff;
    }
    .button-container{
            margin-top: 40px;
            text-align: center; 
            a.button{
                width: 230px;
                display: block;
                margin: auto;
            }
            p{
                margin-top: 40px;
            }
        }
    
    @media only screen and (max-width: 1199px) {
        .title-image{
            width: 100%;
        }   
        .login-box{
            margin-top:25px;
            width:100%;
        }
        .details{
            width: 80%;
            margin-top: 40px;
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
        }
    }  
}
</style>
