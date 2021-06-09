<template>
  <v-app>
  <div v-if="data" id="main" class="winner-detail">
        <WinnerDetails :data="data ? configData.campaignPeriod : null" :howData="data ? data[0].worksSection : null" />
  </div>
  </v-app>
</template>

<script>
import WinnerDetails from '@/components/WinnerDetails'
import { GET_LIST_WINNERS } from '@/store/action_types';
import {translation} from "@/constants/index"
export default {
  name:"winners",
  components:{
    WinnerDetails
  },
  data(){
    return{
       browserTitle:translation.browserTitle,
        metaData:translation.meta,
        winners:[]
    }
  },
  head() {
    return {
      title: this.browserTitle,
      meta:this.metaData,
    };
  },
  computed :{
     data(){
        return this.$store.getters.getCMSContent;
     },

     configData(){
       return this.$store.getters.getCMSConfig;
     }
  },
  methods:{
       getListWinners(data){
          this.$store.dispatch(GET_LIST_WINNERS,data).then((res)=>{
              this.winners=res.data;
          })
    },
  },
  mounted() {
      if(!this.$store.state.token){
       location.assign("/");
     }



  }
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
@import '~assets/scss/mixins.scss';

    .winner-detail{
        padding-top:0px;

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
.coke .theme--light.v-application{
  color: #fff;
}
</style>
