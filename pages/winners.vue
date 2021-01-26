<template>
  <div v-if="data" id="main" class="winner-detail">
    <div class="wrapper">
        <WinnerDetails :data="data ? data[0].luckyWinner : null" :winners="winners" />
    </div>
  </div>
</template>

<script>
import WinnerDetails from '@/components/WinnerDetails'
import { GET_LIST_WINNERS } from '@/store/action_types';
export default {
  name:"winners",
  components:{
    WinnerDetails
  },
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
  computed :{
     data(){
        return this.$store.getters.getCMSContent;
     },
     winners(){
       return this.$store.getters.getListWinners;
     },
     configData(){
       return this.$store.getters.getCMSConfig;
     }
  },
  methods:{
      async getListWinners(){
          await  this.$store.dispatch(GET_LIST_WINNERS);
    },
  },
  mounted() {
    this.getListWinners();
  }
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
@import '~assets/scss/mixins.scss';

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

</style>
