<template>
  <div class="container campaign-section" v-if="data">
    <div class="header">{{data.title}}</div>
    <div v-html="data.description"></div>
    <div class="container">
      <swiper class="swiper prize-swiper" :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in data.exclusizePrizesSection"
          :key="'prize'+index"
          class="prize-item"
        >
          <img
            v-if="$mq == 'sm'"
            :src="item.image ? item.image[0].url : '/img/prize-default.svg'"
          />
          <img v-else :src="item.image? item.image[0].url : '/img/prize-default.svg'" />
          <div class="prize-description">{{item.title}}</div>
        </swiper-slide>
        <div class="prize-swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div v-if="winners.luckyWinnerSection" class="winners-section">
      <div class="header">{{winners.title}}</div>
      <a class="button" href="/winners">{{winners.ButtonTitle}}</a>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
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
        },
      },
    };
  },
  props: {
    data: null,
    winners: null,
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
