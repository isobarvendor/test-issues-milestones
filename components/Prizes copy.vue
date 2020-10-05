<template>
  <div class="container campaign-section">
    <div class="header">{{data.cms.title}}</div>
    <a href>{{data.cms.description}}</a>
    <div class="container">
      <swiper class="swiper prize-swiper" :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in data.listPrizes.prizeList"
          :key="'prize'+index"
          class="prize-item"
        >
          <img
            v-if="$mq == 'sm'"
           :src="item.imgUrl ?  item.imgUrl : '/img/prize-default.svg'"
          />
          <img v-else :src="item.imgUrl ?  item.imgUrl : '/img/prize-default.svg'" />

             <div class="prize-description">
              <span>{{item.name}}</span>
            </div>
        </swiper-slide>
        <div class="prize-swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div v-if="winners.luckyWinnerFile">
      <div class="header">{{winners.downloadLabel}}</div>
      <a class="button">View winner list</a>
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
  mounted(){

  }
};
</script>
