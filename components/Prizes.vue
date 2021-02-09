<template>
  <div class="container campaign-section prize-section" v-if="data">
    <div class="background-image">
      <img src="/img/landing/back-dots.png" />
    </div>
    <div class="joox-container" v-if="prize&&prize.status">

        <div class="header">{{prize.title}}</div>
        <p>{{prize.subTitle}}</p>
        <div class="joox-image">
          <img src="/img/landing/joox image.png" />
        </div>


    </div>

    <div class="header">{{data.title}}</div>
    <!--div v-html="data.description"></div-->
    <div class="container prize-swiper-container">
      <swiper class="swiper prize-swiper" :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in data.exclusizePrizesSection"
          :key="'prize'+index"
          class="prize-item"
        >
          <div class="this-week-prize" v-if="index==0"><p>THIS WEEK'S PRIZE</p></div>
          <img
            v-if="$mq == 'sm'"
            :src="item.image ? item.image[0].url : '/img/prize-default.svg'"
          />
          <img v-else :src="item.image? item.image[0].url : '/img/prize-default.svg'" />
          <div class="prize-description">
            <h3>Week {{index+1}}</h3>
            {{item.title}}
            
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
            slidesPerView: 3,
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
    prize:null
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
