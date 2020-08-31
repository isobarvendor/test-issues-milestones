<template>
  <div>
    <SliderHeader>Rewards</SliderHeader>
    <swiper class="swiper wallet-swiper" :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in data.exclusivePrizes"
        :key="'reward'+index"
        class="wallet-swiper-item"
      >
        <img
          v-if="$mq == 'sm'"
          :src="item.imageMobile ? item.imageMobile.url : '/img/prize-default.svg'"
        />
        <img v-else :src="item.imageDesktop ? item.imageDesktop.url : '/img/prize-default.svg'" />

        <div class="description bg">
          <div class="name">{{item.text}}</div>
          <div class="expiry">
            <span>365</span>
            <span>days left</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <a class="button center" href="#">View All</a>
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
      },
    };
  },
  props: {
    data: null,
  },
  beforeMount() {},
};
</script>
