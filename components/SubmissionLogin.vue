<template>
  <div class="login-box column center">
      <p class="text-center">Sign in or register a Coca-Cola <br>account to enter the draw</p>
      <a class="social-button fb"  v-on:click="redirectTo('facebook')" v-if="social.facebook"><i class="ic ic-fb" /><span>Continue with Facebook</span></a>
      <a class="social-button line"  v-on:click="redirectTo('line')" v-if="social.line" ><i class="ic ic-line" /><span>Continue with LINE</span></a>
      <a class="social-button google"  v-on:click="redirectTo('google')" v-if="social.google"><i class="ic ic-google" /><span>Continue with Google</span></a>
      <a class="social-button email" href="/login" v-if="social.email"><i class="ic ic-email" /><span>Continue with email</span></a>
     <div v-if="errorMessage" class="error">
      {{errorMessage}}
  </div>
  </div>

</template>

<script>
export default {
    name:"Login",
    props: {
      data: null,
      social: null
    },
    methods: {
      redirectTo(source){
        location.href="/api/oauth2/authorize/"+source+"?redirect_uri=" +
        window.location.origin +
        "/settoken";
      }
    },
    computed: {
      errorMessage(){
        return this.$store.state.errorLogin;
      }
    },
    mounted() {


    },
}
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
  .error{
    color:red;
    margin-top: 30px;
  }
</style>
