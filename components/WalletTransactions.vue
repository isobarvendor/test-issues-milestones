<template>
  <div class="wallet-coins">
    <SliderHeader>Coin Transactions</SliderHeader>
    <div class="wallet-desktop">
      <div class="wallet-swiper" v-for="(item, index) in toBeShown" :key="'reward'+index">
        <div class="description bg">
            <div class="name">05 Nov 2019</div>
            <div class="collected">
              <span>Manchester United</span>
              <span class="negative">-50 points</span>
            </div>
            <div class="collected">
              <span>Coins Collected</span>
              <span class="positive">+10 points</span>
            </div>
          </div>
      </div>
    </div>
    <a class="button center" @click="nextPage" :disabled="currentPage == totalPages">View all</a>
  </div>
</template>

<script>
import SliderHeader from "@/components/WalletSliderHeader";
export default {
  name: "WalletTransactions",
  components: {
    SliderHeader
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
    }
  },
  beforeMount() {},
};
</script>
<style lang="scss">
  .wallet-coins{
    margin-bottom: 40px;
    .wallet-desktop{
      display: flex;
      flex-wrap: wrap;
      .wallet-swiper{
        margin: 30px 20px;
        width: 29%;
        .bg{
          background: linear-gradient(0deg, black 0%, #282828 100%);
          min-height: 140px;
        }
      }
      .description{
        padding: 20px;
        border-radius: 20px 20px 20px 20px;
        font-size: 14px;
        .name{
          font-size: 14px;
          color: #585858;
        }
        .name:after{
          content: '';
          display: block;
          margin: .5em 0;
          height: 1px;
          background: #585858;

        }
        .collected{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .negative{
            color: #DB1F27;
          }
          .positive{
            color: #FFC529;
          }
        }
      }
    }
    @media only screen and (max-width: 1199px) {
      .wallet-desktop{
        .wallet-swiper{
          width: 100%; 
          .bg{
            background: none;
            min-height: 140px;
            padding: 10px;
          }   
        }
      }  
    }
  }
</style>