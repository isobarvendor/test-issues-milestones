<template>
  <div class="container masthead" id="masthead">
      <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in carousell"
        :key="'prize' + index"
        
      >
        <div class="carousell-image">
          <img :src="item.img ? item.img : '/img/landing/week 1 prize.png'" />
          <!-- <div class="prize-description">
            <h3 v-html="item.shortDescription"></h3>
            {{ item.name }}
          </div> -->
        </div>
        <div class="prize-swiper-pagination" slot="pagination"></div>
      </swiper-slide>
    </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import MastheadCountDown from "../components/MastheadCountDown";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
       swiperOption: {
        /* slidesPerView: 2,
        spaceBetween: 10,
        autoplay: {
          delay: 5000
        },
        breakpoints: {
          // when window width is >= 320px
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }, */
        freeMode: true,
        pagination: {
          el: ".prize-swiper-pagination",
          clickable: true,
          bulletClass: "prize-swiper-pagination-bullet",
          bulletActiveClass: "prize-swiper-pagination-bullet-active"
        }
      }, 
      carousell: [{ img: "/develop/Carousell-image.png" }, { img: "/develop/Carousell-image.png" }]
    };
  }
};
</script>

<style>
#masthead {
  padding: 20px;
}
@media only screen and (max-width: 600px) {
  #masthead {
    padding: 10px;
  }
}
@media only screen and (max-width: 1099px) {
  #masthead {
    padding: 10px;
  }
}

.masthead{
    background-image: url('/develop/masthead-border.png');
    background-size: cover;
    /* background-attachment: fixed; */
    /* width: 1280px;
    height: 736.44px */
}

.swiper{
    /* margin: 1cm; */
    
}

.carousell-image {
    height: 100%;
    width: 100%;
    
    
}

.carousell-image img{
  height: 100%;
  width: 100%;

}
</style>
