<template>
  <div v-if="data" id="main" class="winner-detail">
    <div class="wrapper">
         <v-row no-gutters>

      <v-col
        cols="12"
        sm="12"
        md="4"
      >

          <v-row no-gutters class="logo-title">
               <v-col
                  cols="4"
                  md="12"
                  sm="4"
                >

                  <img src="/img/landing/COKE STUDIO.png" class="logo"  />
                </v-col>

                <v-col
                  cols="8"
                  md="12"
                  sm="8"
                  class="participate-text-container"
                >
                 <div class="tagline">{{howData.title}}</div>
                </v-col>
          </v-row>

      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
        class="desc-container"
      >

      </v-col>
    </v-row>
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
