<template>
  <div class="login-box column center">
      <p>Sign in or register a Coca-Cola account to enter the draw</p>
      <a class="social-button fb" v-if="facebook"  @click="facebookLogin"><i class="ic ic-fb" /><span>Continue with Facebook</span></a>
      <a class="social-button line" v-if="line" ><i class="ic ic-line" /><span>Continue with LINE</span></a>
      <a class="social-button google" v-if="google" @click="googleLogin"><i class="ic ic-google" /><span>Continue with Google</span></a>
      <a class="social-button email" v-if="email"><i class="ic ic-email" /><span>Continue with email</span></a>
  </div>    
</template>

<script>
export default {
    name:"Login",
    props: {
      data: null,
      email: Boolean,
      facebook: Boolean,
      google: Boolean,
      line: Boolean
    },
    methods: {
      loginUser(loginInfo){
          this.$auth.loginWith('facebook')
      },
      async googleLogin(){
        await this.$auth.loginWith('google').catch(e => {
          this.$toast.show('Error', {icon: "fingerprint"});
        })
      },
      async facebookLogin(){
        await this.$auth.loginWith('facebook').catch(e => {
          this.$toast.show('Error', {icon: "fingerprint"});
        })
      },
      async login() {
        try {
          this.$toast.show('Logging in...', {icon: "fingerprint"});
          await this.$auth.loginWith('local', {
            data: {
              "email": this.email,
              "password": this.password
            }
          }).catch(e => {
            this.$toast.error('Failed Logging In', {icon: "error_outline"});
          });
          if (this.$auth.loggedIn) {
            this.$toast.success('Successfully Logged In', {icon: "done"});
          }
        } catch (e) {        
            this.$toast.error('Username or Password wrong', {icon: "error"});
        }
      }
    },
    computed: {

    },
    mounted() {

    },
}
</script>

<style>

</style>