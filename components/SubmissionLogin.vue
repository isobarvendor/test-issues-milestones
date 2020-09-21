<template>
  <div class="login-box column center">
      <p>Sign in or register a Coca-Cola account to enter the draw</p>
      <a class="social-button fb" v-if="social.facebook"  @click="facebookLogin"><i class="ic ic-fb" /><span>Continue with Facebook</span></a>
      <a class="social-button line" v-if="social.line" ><i class="ic ic-line" /><span>Continue with LINE</span></a>
      <a class="social-button google" v-if="social.google" @click="googleLogin"><i class="ic ic-google" /><span>Continue with Google</span></a>
      <a class="social-button email" v-if="social.email"><i class="ic ic-email" /><span>Continue with email</span></a>
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
      
    },
    computed: {

    },
    mounted() {

    },
}
</script>

<style>

</style>