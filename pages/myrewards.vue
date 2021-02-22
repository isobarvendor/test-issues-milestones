<template>
  <div  id="main" class="container myrewards black-red-border">
    <div class="wrapper">
            <div class="background-image">
                <img src="/img/landing/back-dots.png" width="100%" />
            </div>
            <div class="title">
                <h1>YOUR REWARDS</h1>
            </div>
            <div class="rewards-area">
                <div v-for="item in rewards" :key="item.id">
                    <MyRewardItem :reward="item" />
                </div>
            </div>

      </div>
  </div>
</template>


<script >
import MyRewardItem from '../components/MyRewardItem'
import * as _ from 'lodash';
import moment from "moment";
import {  GET_MY_PRIZE} from '@/store/action_types';
import {translation} from "@/constants/index"
export default {
  name:"myrewards",
  components:{
    MyRewardItem
  },
  data(){
    return{
        rewards:[

        ],
        browserTitle:translation.browserTitle,
        metaData:translation.meta

    }
  },
  head() {
    return {
      title: this.browserTitle,
      meta:this.metaData,
    };
  },
  props: {

  },
  mounted(){
    this.getMyPrize();
  },

  methods:{
     getMyPrize(){
      if(this.configData){

            let attempt=_.uniqBy(_.filter(this.configData.attempts,(o)=>{
                return o.campaignType=='InstantWin';
            }), function (e) {
              return e.NPGS[0].configID;
            });
            let array=[];
            for(let a=0;a<attempt.length;a++){
                this.$store.dispatch(GET_MY_PRIZE,attempt[a].NPGS[0].configID)
                  .then((response)=>{

                    let res = _.map(response.data.vouchers,(o,index)=>{
                        return {
                          id:index,
                          title:o.name,
                          date:moment(o.claimTimestamp).format('DD/MM/YYYY - H:mm'),
                          link:o.redeemDescription,
                          image:o.imgUrl,
                          code:o.voucher,
                          audio:o.prizeName.includes(".") ? o.prizeName : null
                        }
                    });
                   this.rewards=[...this.rewards,...[...array, ...res]];
                })
              .catch((error) =>{
                  localStorage.clear();
                  this.$store.commit('SET_TOKEN', null);
                  this.$store.commit('SET_LOGIN_ACCOUNT', null);
                  location.assign("/")
                })

            }
          }
    }
  },
  computed: {
    configData(){
       return this.$store.getters.getCMSConfig;
     },
  },

}
</script>
<style scoped>



</style>
