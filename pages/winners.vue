<template>
  <div v-if="dataStatus.status == 200" id="main" class="winner-detail">
    <div class="wrapper">
        <WinnerDetails :data="data.exclusivePrizes"/>
    </div>
  </div>
</template>

<script>
import WinnerDetails from '@/components/WinnerDetails'
export default {
  data(){
    return{
      dataStatus:{},
      data:null,
      campaignType: 0
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
  computed :{
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
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
@import '~assets/scss/mixins.scss';
  html, body{
    background: #BE0000;
    .winner-detail{
        padding-top:0px;
        .container{
            max-width:1280px;
            margin-right: 0px;
            padding: 0px;
        }

        a{
            &.button{ 
            text-decoration: none;
            filter:none;
            color:white;
            background: $wallet-button-gradient;
            }
            &.center{
            display:block;
            margin: 0 auto;
            }
        }
        a.button{
            width: 230px;
        }
        .nav-button{
            display: none;
        }
    }
    @media only screen and (max-width: 1199px) {
      .winner-detail{
        .header{
          .title{
            font-size: 25px;
            margin-bottom: 30px;
          }
          display: flex;
          flex-direction: column;
          .selections{
              display: flex;
              flex-direction: column-reverse;
              .v-input{
                  margin-left: 0px;
              }
          }
        }
      }
    }
  }
</style>