<template>
  <div v-if="dataStatus.status == 200" id="main" class="login">
    <div class="close" @click="close"><img src="/img/icons/close.png"/></div>
    <div class="wrapper">
      <div class="container">
        <LoginDetails :social="dataSocial" />
      </div>
    </div>
  </div>
  
  <div v-else-if="dataStatus.status >= 500">
    Status: {{dataStatus.status}} 
    <br />
    {{dataStatus.message}}
  </div>
</template>

<script>
import LoginDetails from '@/components/LoginDetails'
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
      script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],
      css: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let result = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaigns"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.data = result.data;

      let config = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaign-configurations"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.dataSocial = { 
        email: config.data[0].socialMedia.Email, 
        facebook: config.data[0].socialMedia.Facebook,
        google: config.data[0].socialMedia.Google,
        line: config.data[0].socialMedia.Line,
      };
    },
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