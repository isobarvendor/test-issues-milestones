<template>
  <div class="container masthead" id="masthead">
    <div class="swiper">
      <swiper :options="swiperOption" class="swiper-container">
        <swiper-slide>
          <video-background
              :src="videoDesk"
              :poster="videoMob"
              :sources="[
                  {src: videoDesk, res: 1100, autoplay: true},
                  {src: videoTab, res: 900, autoplay: true},
                  {src: videoMob, res: 638, autoplay: true}
              ]"
              class="videoBackground"
              style="height: 150vh;"
              ref="videobackground"
              :muted="muted"


          >
                <div class="masthead-content">
                <h1>{{data.title}}</h1>
                <p>{{data.description}}</p>

              </div>
              <MastheadCountDown v-if="isCountDown" :data="data.endDate" class="countdown"/>
              <div class="mutedIcon" @click="play" ><img :src="'/img/icons/'+ (this.muted ? 'muted.png' :'unmuted.png')" /></div>
          </video-background>
          
        </swiper-slide>
        <swiper-slide>
          <div class="carousell-image" @click="redirect">
            <img id='image' class="hidden-sm-and-up" :src="videoMob ? videoMob : '/img/landing/week 1 prize.png'" />
            <img id='image' class="hidden-xs-only" :src="imgDesk ? imgDesk : '/img/landing/week 1 prize.png'" />
            <!-- <div class="prize-description">
            <h3 v-html="item.shortDescription"></h3>
            {{ item.name }}
          </div> -->
          </div>
          
        </swiper-slide>
        <div class="prize-swiper-pagination pagination" slot="pagination"></div>
      </swiper>
    </div>
    <img id="arrow" src="/develop/masthead-arrow.png" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import MastheadCountDown from "../components/MastheadCountDown";
export default {
  props: {
    data: null,
    /* isCountDown: null, */
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      isCountDown: false,
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
      imgDesk: this.data.homepage.mastheadSection.desktopImage[0].url,
      videoDesk: this.data.homepage.mastheadSection.video.url,
      videoTab:  this.data.homepage.mastheadSection.video.url,
      videoMob:  this.data.homepage.mastheadSection.mobileImage.length>0 ? this.data.homepage.mastheadSection.mobileImage[0].url : this.data.homepage.mastheadSection.video.url,
      muted:true
    };
  },
  methods:{
    play(){
      this.muted=!this.muted;
    },
    redirect(){
      const link = this.data.homepage.mastheadSection.description
      window.open(link);
    }
  }
};
</script>

<style>
.swiper-container{
  position: relative;
  max-height: 600px;
}

.videoBackground{
  position:relative;
}

.countdown{
  position: absolute;
  top: -50%;
}

.pagination{
  position: absolute;
  bottom: 0;
  right: 46%;
  z-index: 99;
  
}
.pagination span{
  position: absolute;
  z-index: 99;
  
}
#masthead{
      /* background:#de0a1c; */
      /* padding: 20px; */
    }
    .mutedIcon{
      position: absolute;
      bottom: 50px;
      left: 50px;
      cursor: pointer;
    }
  

.masthead {
  background-image: url("/develop/masthead-border.png");
  background-size: 100% 100%;
  position: relative;
  /* background-attachment: fixed; */
  /* width: 1280px;
    height: 736.44px */
}

.masthead #arrow{
  position: absolute;
  z-index: 99;
  bottom: 6.3%;
  right: 45%;
  height: 15px;
  width: 9px;
}

.prize-swiper {
  /* margin: 1cm; */
  /* position: relative; */
}

.prize-swiper-pagination{
  /* position: absolute;
  bottom: 10%;
  left: 50%; */
  padding-bottom: 20px;
}

.carousell-image {
  height: 100%;
  width: 100%;
  margin-bottom: -0.5cm;
}

#image{
  width: 100%;
  height: 100%;
}

   
      @media only screen and (min-width: 1200px) {
    .videoBackground{
      max-height: 650px;
    }
    .carousell-image{
      height: 650px;
    }
    .masthead #arrow{
      bottom: 6.5%;
      right: 45%;
      
    }

  }
  @media only screen and (max-width: 1150px) {
    
    .carousell-image{
      height: 600px;
    }
     /* #masthead{
      padding: 10px;
    } */
    
  }

   @media only screen and (max-width: 1099px) {
    .videoBackground{
      max-height: 600px;
    }
    .carousell-image{
      max-height: 500px;
    }
     /* #masthead{
      padding: 10px;
    } */
    .masthead #arrow{
      bottom: 7%;
      right: 44%;
      
    }
  }

  @media only screen and (max-width: 800px) {
    .videoBackground{
      max-height: 400px !important;
    }
    .carousell-image{
      height: 400px;
    }
    .masthead #arrow{
      bottom: 7%;
      right: 43%;
      
    }
  }

  @media only screen and (max-width: 600px) {
    .videoBackground{
      max-height: 400px !important;
    }
    .carousell-image{
      max-height: 400px;
    }
     /* #masthead{
      padding: 10px;
    } */
    .mutedIcon{

      bottom: 5px;
      left: 5px;

    }
    .masthead #arrow{
      bottom: 9%;
      right: 40%;
      
    }
  }

  @media only screen and (max-width: 575px) {
    .videoBackground{
      max-height: 800px !important;
    }
    .masthead #arrow{
      bottom: 10%;
      right: 35%;
      
    }
    
  }

  @media only screen and (max-width: 450px) {
    .masthead #arrow{
      bottom: 17%;
      right: 35%;
      
    }
    .videoBackground{
      max-height: 180px !important;
    }
    
  }

</style>
