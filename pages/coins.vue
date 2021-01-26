<template>
  <div id="main" class="coins">
    <div class="wrapper">
      <div class="container">
        <CoinDetail/>
      </div>

    </div>
  </div>
</template>

<script>
import CoinDetail from '@/components/CoinDetail'
export default {
  name:"coins",
  components:{
    CoinDetail
  },
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
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      /*let result = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaigns"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.data = result.data;*/
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    .coins{
        .container{
            position: absolute;
            top: 30%;
        }
    }
    @media only screen and (max-width: 767px) {

    }
  }
</style>
