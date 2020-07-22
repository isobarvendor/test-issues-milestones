<template>
  <div class="container campaign-section">
    <div class="header">{{data.title}}</div>
    <a href>{{data.description}}</a>
    <swiper class="swiper coke-swiper container" :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in data.exclusivePrizes"
        :key="'prize'+index"
        class="prize-item"
      >
        <img :src="item.image.url" />
        <div class="prize-description">{{item.text}}</div>
      </swiper-slide>
      <div class="coke-swiper-pagination" slot="pagination"></div>
    </swiper>
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
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          // when window width is >= 320px
          768: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          992:{
            slidesPerView: 4,
            spaceBetween: 30
          }
        },
        freeMode: true,
        pagination: {
          el: ".coke-swiper-pagination",
          clickable: true,
          bulletClass: "coke-swiper-pagination-bullet",
          bulletActiveClass: "coke-swiper-pagination-bullet-active"
        }
      }
    };
  },
  props: {
    data: null,
    winners: null
  },
  beforeMount() {}
};
</script>

<style>
</style>