<template>
  <div class="wallet-rewards" >
    <SliderHeader>{{cmsData.Wallets.RewardsTitle}}</SliderHeader>
    <div class="wallet-desktop" v-if="$mq == 'xl'">
      <div class="wallet-swiper" v-for="(item, index) in toBeShown" :key="'reward'+index">
        <div class="wallet-swiper-item">
          <img src="/img/prize-default.svg"
          />
        </div>
        <div class="description bg">
            <div class="name">{{item.currency_name}}</div>
            <div class="expiry">
              <span>365</span>
              <span>days left</span>
            </div>
          </div>
      </div>
    </div>
    <swiper class="swiper wallet-swiper" :options="swiperOption"  v-if="$mq == 'sm' || $mq == 'md' || $mq == 'lg'">
      <swiper-slide
        v-for="(item, index) in data.expirationWallet"
        :key="'reward'+index"
        class="wallet-swiper-item"
      >
        <img
          :src="item.imageMobile ? item.imageMobile.url : '/img/prize-default.svg'"
        />
        <div class="description bg">
          <div class="name">{{item.currency_name}}</div>
          <div class="expiry">
            <span>{{dayDiff(dates)}}</span>
            <span>days left</span>
          </div>
        </div>
      </swiper-slide>
      <div class="prize-swiper-pagination" slot="pagination"></div>
    </swiper>
    <a v-if="$mq == 'xl'" class="button center" @click="nextPage" :disabled="currentPage == totalPages">View all</a>
  </div>
</template>

<script>
import SliderHeader from "@/components/WalletSliderHeader";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  name: "WalletRewards",
  components: {
    SliderHeader,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          // when window width is >= 320px

          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        freeMode: true,
        pagination: {
          el: ".prize-swiper-pagination",
          clickable: true,
          bulletClass: "prize-swiper-pagination-bullet",
          bulletActiveClass: "prize-swiper-pagination-bullet-active",
        }
      },
      currentPage: 1
    };
  },
  props: {
    data: null,
    cmsData:null
  },
  computed:{
  	toBeShown() {
    	return this.data.expirationWallet.slice(0, this.currentPage * 3);
    },
    totalPages() {
    	return Math.ceil( this.data.expirationWallet.length / 3);
    }
  },
  methods:{
    nextPage(){
    	if(this.currentPage <  this.totalPages) this.currentPage++;
    },
    prevPage(){
    	this.currentPage = this.currentPage - 1 || 1;
    },
    dayDiff(dates){
      let today = new Date();
      let dates2 = new Date(dates);
      let dateDiff = today.getDate() - dates2.getDate();
      return dateDiff
    }
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.wallet-rewards{
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
            font-size:14px;
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
      .swiper.wallet-swiper{
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
</style>
