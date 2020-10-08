<template>
  <div id="main" class="reward-detail">
    <div class="wrapper">
        <RewardDetails />
    </div>
  </div>
</template>

<script>
import { GET_LIST_PRIZE } from '@/store/action_types';
import RewardDetails from '@/components/RewardDetails'
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
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
  computed :{},
  mounted() {
    this.getListPrize();
  },
  methods:{
    async getListPrize(){

          await  this.$store.dispatch(GET_LIST_PRIZE)
            .then((response)=>{

            })
            .catch((error) =>{
              if(error.response && error.response.data.status=='401'){
                this.errorMessage='Please enter the correct email/password';
              }
            })


    },

  },

};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
@import '~assets/scss/mixins.scss';
  html, body{
    background: $body-bg-color-wallet;
    .reward-detail{
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
      .reward-detail{
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
