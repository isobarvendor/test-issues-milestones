<template>
  <div class="container campaign-section prize-section">
    <div class="background-image">
      <img src="/img/landing/back-dots.png" />
    </div>
    <div class="joox-container"  v-for="(item, index) in prize" v-if="prize.length>0 &&item.status">

        <div class="header" v-html="item.title"></div>
        <p v-html="item.subTitle"></p>
        <div class="joox-image">
          <img :src="item.imageUpload ? item.imageUpload.url : '/img/landing/joox image.png'" />
        </div>


    </div>
    <div v-if="exclusivePrizes" class="all-prize-area">
    <div class="header">{{data.title}}</div>
    <!--div v-html="data.description"></div-->
    <div class="container prize-swiper-container">
      <swiper class="swiper prize-swiper" :options="swiperOption">
        <swiper-slide
           v-for="(item, index) in ngpsPrize"
          :key="'prize'+index"
          class="prize-item"
        >
          <div class="prize-item-content">
            <img :src="item.imgUrl ? item.imgUrl : '/img/landing/week 1 prize.png'" />
            <div class="prize-description">
              <h3 v-html="item.shortDescription"></h3>
              {{item.name}}
            </div>
          </div>
        </swiper-slide>
        <div class="prize-swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--div v-if="winners && winners.luckyWinnerSection" class="winners-section">
      <div class="header">{{winners.title}}</div>
      <a class="button" href="/winners">{{winners.ButtonTitle}}</a>
    </div-->
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
   name: "Prizes",
  components: {
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
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
        freeMode: true,
        pagination: {
          el: ".prize-swiper-pagination",
          clickable: true,
          bulletClass: "prize-swiper-pagination-bullet",
          bulletActiveClass: "prize-swiper-pagination-bullet-active",
        },
      },
    };
  },
  props: {
    data: null,
    winners: null,
    prize:null,
    ngpsPrize:{},
    exclusivePrizes:null
  },
  beforeMount() {},
};
</script>
<style scoped lang="scss">
.campaign-section{
.winners-section{
  .button{
    color: #333333;
    background: #ffffff;
    font-size: 14px;
    width: 370px;
    margin:auto;
    display: table;
    margin-top: 35px;
    padding: 20px 90px;
  }
}
@media only screen and (max-width: 1199px) {
  .winners-section{
    .button{
      width:315px;
    }
  }
}
}
</style>
