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

export default {
  name:"myrewards",
  components:{
    MyRewardItem
  },
  data(){
    return{
        rewards:[

        ]
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
  props: {

  },
  mounted(){
    this.getMyPrize();
  },

  methods:{
    getMyPrize(){
     /* let prize = [{ "prizeId": "4064541k75yopnc",

            "voucher": "testVoucher12",

            "name": "League of Legends RP",

            "shortDescription": "<p>100 Riot Point hediye kazandın!</p>",

            "redeemDescription": "<p>Test-Kapak altındaki kodu Daha Daha’ya girerek League of Legends kodunu al, almış olduğun kodu League of Legends oyununda gir, hediyeni kazan! League of Legends 100RP hediyesi, Türkiye server’larında geçerlidir ve bir günde en fazla 3 kod girilebilmektedir.</p>",

            "redemptionLink": "https://www.dahadaha.com",

            "imgUrl": "/img/landing/week 1 prize.png",

            "barcodeType": 0,

            "voucherStatus": "claimed",

            "prizeName": "League of Legends RP",

            "description": "<p>League of Legends 100RP hediye kodunu hemen kullanabilirsin!</p>",

            "claimTimestamp": 1584015897380,

            "expiryDate": 1584264846000
    }]*/

          this.$store.dispatch(GET_MY_PRIZE)
          .then((response)=>{

             // console.log(response);

            this.rewards = _.map(response.data.vouchers,(o,index)=>{
                return {
                  id:index,
                  title:o.name,
                  date:moment(o.claimTimestamp).format('DD/MM/YYYY - H:mm'),
                  link:o.redeemDescription,
                  image:o.imgUrl,
                  code:o.voucher,
                  audio:null
                }
            })
         })
       .catch((error) =>{
         localStorage.clear();
         sessionStorage.clear();
         location.assign("/")
      })

    }

  },
  computed: {

  },

}
</script>
<style scoped>



</style>
