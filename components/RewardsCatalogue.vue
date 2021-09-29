<template>
  <div class="rewards-catalogue">
    <div class="wallet-desktop" >
      <div class="wallet-swiper" v-for="(item, index) in data.prizeList" :key="'reward'+index"  >
        <div class="wallet-swiper-item" @click="goDetail(index)">
          <img :src="item.imgUrl"
          />
        </div>
        <div class="description bg">
            <div class="name">{{item.name}}</div>
            <div :class="[{'desc-area':canRedeem(item.prizeCost)}]"  >
              <div :class="[{expiry:true,'left':canRedeem(item.prizeCost)}]"    :key="'cost'+index" v-if="item.prizeCost">
                <span>{{item.prizeCost[0].amount}}</span>
                <span>Coins</span>
              </div>
              <div class="btn-area">
                <a class="button rewards-right" @click="redeemPrize(item.prizeId)" v-if="canRedeem(item.prizeCost)" >Redeem now</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {REDEEM_PRIZE} from '@/store/action_types';
export default {
  name: "RewardsCatalogue",
  components: {
  },
  data() {
    return {
      currentPage: 1
    };
  },
  props: {
    data: null,
  },
  computed:{
       listWallet(){
           return this.$store.state.listWallet;
        },
  	toBeShown() {
    	return this.data.exclusivePrizes.slice(0, this.currentPage * 3);
    },
    totalPages() {
    	return Math.ceil( this.data.exclusivePrizes.length / 3);
    }
  },
  methods:{
    nextPage(){
    	if(this.currentPage <  this.totalPages) this.currentPage++;
    },
    prevPage(){
    	this.currentPage = this.currentPage - 1 || 1;
    },
    goDetail(rewardID){
       location.href= 'rewardsDetail/'+rewardID;
    },
      redeemPrize(prizeId){
      let request = {"prizeId":prizeId};
      this.$store.commit('SET_REDEEM_PRIZE',null);
      this.$store.dispatch(REDEEM_PRIZE,request).then((response)=>{
         this.errorMessage=null;
         location.href="/congratulations";
       }).catch(error=>{
         if(error.response && error.response.data.status=="401"){
           localStorage.clear();
         }else{
            this.errorMessage="Sorry you can not redeem this prize";
         }
       })
    },
    canRedeem(prizeCost){
      if(prizeCost){
          if(this.listWallet){
             return this.listWallet.walletStatus[0].amount >= prizeCost[0].amount
          }
      }
      return false;
    }
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.rewards-catalogue{
    margin-bottom: 40px;
    .desc-area{
      display: flex;
      padding-top: 20px;
    }
    .btn-area{

        justify-content: flex-end;
        flex:1;
        .button{
          max-width: 190px;
          padding-top: 15px;
        }
    }
    .wallet-desktop{
      display: flex;
      flex-wrap: wrap;
      .wallet-swiper{
        margin: 30px 20px;
        width: 29%;
      }
      .description{
        padding: 20px;
        border-radius: 0px 0px 20px 20px;

        .name:after{
          content: '';
          display: block;
          margin: .5em 0;
          height: 1px;
          background: #585858;

        }
        .expiry{
          display: flex;

          justify-content: flex-end;
          &.left{
            flex:1;
            justify-content: flex-start;
          }
          span{
            font-size:12px;
          }
          span:first-child{
            margin-right: 0.5em;
            font-weight: bold;
            font-size: 26px;
          }
        }
      }
    }
    .prize-swiper-pagination > * + *:before{
      background: #585858
    }
    .prize-swiper-pagination .prize-swiper-pagination-bullet{
      background: #585858
    }
    .prize-swiper-pagination .prize-swiper-pagination-bullet-active{
      background: #ffffff
    }
    @media only screen and (min-width: 1300px) {
        .btn-area{
          flex:0.8;
        }

    }
    @media only screen and (max-width: 1199px) {

    .wallet-desktop{
      .wallet-swiper{
          width: 43%;
          margin: 30px 10px;
        .description{
          padding: 1em 10px;
          .name{
            font-size: 14px;
          }
          .expiry{
            justify-content: flex-start;
            span:first-child{
              font-size: 14px;
            }
          }
        }
        .desc-area{
             padding: 20px 10px;
          }

      }
    }
    }
       @media only screen and (max-width: 750px) {
           .btn-area{
          flex:1.2;
        }
       }
      @media only screen and (max-width: 650px) {
           .btn-area{
          flex:1;
        }
         .wallet-desktop{
      .wallet-swiper{
          width: 100%;
          margin-bottom: 0px;
          .desc-area{
             padding: 20px 10px;
          }
      }
         }

      }

}
</style>
