<template>
  <div class="container campaign-section">
    <div class="header">Exclusive PRIZES</div>
    <a href>Lucky Draw Terms & Conditions</a>
      <swiper class="swiper coke-swiper container" :options="swiperOption">
        <swiper-slide v-for="(item, index) in list" :key="'prize'+index" class="prize-item">
          <img src="/img/prize_dummy.png" />
          <div class="prize-description">Premier League Experience Live In England</div>
        </swiper-slide>
        <div class="coke-swiper-pagination" slot="pagination"></div>
      </swiper>
    <div class="header">Could you be a lucky winner?</div>
    <a class="button">View winner list</a>
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
      list: [0, 1, 2, 3, 4, 5, 6],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".coke-swiper-pagination",
          clickable: true,
          bulletClass:'coke-swiper-pagination-bullet',
          bulletActiveClass:'coke-swiper-pagination-bullet-active'
        }
      }
    };
  }
};
</script>

<style>
</style>