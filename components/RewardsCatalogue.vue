<template>
  <div class="rewards-catalogue">
    <div class="wallet-desktop" >
      <div class="wallet-swiper" v-for="(item, index) in data.prizeList" :key="'reward'+index"  @click="goDetail(index)">
        <div class="wallet-swiper-item">
          <img :src="item.imgUrl"
          />
        </div>
        <div class="description bg">
            <div class="name">{{item.name}}</div>
            <div class="expiry" :key="'cost'+index">
              <span>{{item.amountAvailable}}</span>
              <span>Coins</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$router.push({ path: 'rewardsDetail/'+rewardID})
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

      }
    }
    }

}
</style>
