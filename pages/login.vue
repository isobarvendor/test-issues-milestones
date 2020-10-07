<template>
  <div id="main" class="login" v-if="configData">
    <div class="close" @click="close"><img src="/img/icons/close.png"/></div>
    <div class="wrapper">
      <div class="container">
        <LoginDetails :social="dataSocial" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginDetails from '@/components/LoginDetails'
import deepClone from 'deep-clone'
export default {
  data(){
    return{

    }
  },
  head() {
    return {
      title: "Coke Campaign Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description"
        }
      ],
      noscript: [],
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
   computed: {
       CMSContent(){
        return deepClone(this.$store.state.CMSContent)
     },
     configData(){
       return deepClone(this.$store.state.config)
     },
     dataSocial(){
      let config =deepClone(this.$store.state.config);
      return  config ? {
              email: config.socialMedia.Email,
              facebook: config.socialMedia.Facebook,
              google: config.socialMedia.Google,
              line: config.socialMedia.Line,
      } : null
     }
  },
  methods: {
    close(){
        location.href="/"
    }
  },
  mounted(){

  }
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    .login{
        position: relative;
        .close{
            position: absolute;
            top: 10px;
            right:20px;
            z-index: 1;
        }
        @media only screen and (max-width: 767px) {
            .login{

            }
        }
    }
  }
</style>
