<template>
  <div id="main" class="login" v-if="configData">
    <div class="close" @click="close"><img src="/img/icons/close.png"/></div>
    <div class="wrapper">
      <div class="container">
        <LoginDetails :social="dataSocial" :data="CMSContent[0].Login" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginDetails from '@/components/LoginDetails'
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
     configData(){
       return this.$store.getters.getCMSConfig;
     },
     CMSContent(){
       return this.$store.getters.getCMSContent;
     },
     dataSocial(){
      let config = this.$store.getters.getCMSConfig;
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
