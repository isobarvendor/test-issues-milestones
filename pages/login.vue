<template>
  <div v-if="dataStatus.status == 200" id="main" class="login">
    <div class="close"><img src="/img/icons/close.png"/></div>
    <div class="wrapper">
      <div class="container">
        <LoginDetails :data="data.exclusivePrizes"/>
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
        "https://ayo.aircovery.com/cms-api/campaigns/1"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.data = result.data;
    },
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
        }
        @media only screen and (max-width: 767px) {
            .login{

            }
        }
    }
  }
</style>