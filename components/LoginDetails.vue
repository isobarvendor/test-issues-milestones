<template>
  <div class="login-details">
    <div class="title-image">
      <img src="img/icons/coke.png" />
      <p>
        {{data.Title}}
      </p>
    </div>
    <div class="continue" v-if="$mq == 'xl'">
      <p>{{data.SubTitle}}</p>
      <div class="icons">
        <div v-on:click="redirectTo('line')" v-if="social.line">
          <span><img src="img/icons/line.png" /></span>
        </div>
        <div v-on:click="redirectTo('facebook')" v-if="social.facebook">
          <span><img src="img/icons/fb.png" /></span>
        </div>
        <div v-on:click="redirectTo('google')" v-if="social.google">
          <span><img src="img/icons/google.png" /></span>
        </div>
        <!--<div v-on:click="redirectTo('email')" v-if="social.email">
          <span><img src="img/icons/email.png" /></span>
        </div>-->
      </div>
      <p>or</p>
    </div>
    <div
      class="login-box column center"
      v-if="$mq == 'sm' || $mq == 'md' || $mq == 'lg'"
    >
      <a class="social-button fb" v-on:click="redirectTo('facebook')"
        ><i class="ic ic-fb" /><span>Continue with Facebook</span></a
      >
      <a class="social-button line" v-on:click="redirectTo('line')"
        ><i class="ic ic-line" /><span>Continue with LINE</span></a
      >
      <a class="social-button google" v-on:click="redirectTo('google')"
        ><i class="ic ic-google" /><span>Continue with Google</span></a
      >
    </div>
    <transition name="fade">
      <div class="details">
        <div class="input-container">
          <v-text-field
            label="Email address"
            v-validate="'required|email'"
            name="email"
            v-model="login.email"
          ></v-text-field>
          <span class="error-message">{{ errors.first("email") }}</span>
          <v-text-field
            label="Password"
            v-validate="'required'"
            name="password"
            :type="'password'"
            v-model="login.password"
          ></v-text-field>
          <span class="error-message">{{ errors.first("password") }}</span>
        </div>
        <div class="button-container">
          <div
            class="error-message"
            v-if="errorMessage"
            v-html="errorMessage"
          ></div>
          <div class="btn-area">
               <v-progress-circular
                  :width="2"
                  color="white"
                  indeterminate
                  v-if="loading"
                ></v-progress-circular>
              <a class="button" v-on:click="userLogin()" v-else>Login</a>
          </div>
         <!-- <p>Forget Password</p>-->
          <p v-on:click="userSignUp()">Sign Up</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { LOGIN } from "@/store/action_types";
export default {
  name: "LoginDetails",
  inject: ["$validator"],
  components: {},
  data() {
    return {
      show: true,
      login: {
        email: "",
        password: "",
      },
      errorMessage: null,
      loading:false
    };
  },
  props: {
    data: null,
    social: null,
  },
  computed: {},
  methods: {
    testing() {
      return (this.show = true);
    },
    redirectTo(source) {
      location.href =
        "/api/oauth2/authorize/" +
        source +
        "?redirect_uri=" +
        window.location.origin +
        "/settoken";
    },
    close(){
        location.href="/"
    },
    async userLogin() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.loading =true;
          this.errorMessage = null;
          this.$store
            .dispatch(LOGIN, this.login)
            .then((response) => {
              this.loading=false;
              location.href="/"
            })
            .catch((error) => {
              this.loading=false;
              if (error.response && error.response.data.status == "401") {
                this.errorMessage = "Please enter the correct email/password";
              }
            });
        }
      });
    },
    userSignUp() {
      location.href="/register";
    },
  },
  beforeMount() {},
  mounted() {
    if (this.$mq == "sm" || this.$mq == "md" || this.$mq == "lg") {
      this.show = false;
    }
  },
};
</script>

<style lang="scss">
.login-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  .error-message {
    color: red;
  }
  .btn-area{
    text-align: center;
  }
  .title-image {
    img {
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
  .continue {
    text-align: center;
    p {
      margin-bottom: 15px;
      margin-top: 15px;
    }
    .icons {
      width: 350px;
      display: flex;
      justify-content: space-evenly;
    }
  }
  .details {
    width: 50%;
  }
  .v-text-field__slot {
    border-bottom: 1px solid #585858;
  }
  .theme--light.v-label {
    color: #585858;
  }
  .theme--light.v-input input {
    color: #ffffff;
  }
  .button-container {
    margin-top: 40px;
    text-align: center;
    a.button {
      width: 230px;
      display: block;
      margin: auto;
    }
    p {
      margin-top: 40px;
    }
  }

  @media only screen and (max-width: 1199px) {
    .title-image {
      width: 100%;
    }
    .login-box {
      margin-top: 25px;
      width: 100%;
    }
    .details {
      width: 80%;
      margin-top: 40px;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
}
</style>
