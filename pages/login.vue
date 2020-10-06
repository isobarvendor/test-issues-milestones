<template>
  <div id="main" class="login">
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
      dataStatus:{},
      dataSocial:{},
      data:null,
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
       let config= deepClone(this.$store.state.CMSContent)
          this.dataSocial =config ? {
              email: config.data[0].socialMedia.Email,
              facebook: config.data[0].socialMedia.Facebook,
              google: config.data[0].socialMedia.Google,
              line: config.data[0].socialMedia.Line,
      } : null;
        return config;
     },
     configData(){
       return deepClone(this.$store.state.config)
     }
  },
  methods: {
    close(){
        location.href="/"
    }
  },
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
