<template>
  <div class="container masthead" >
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
              class="videoBackgroundFanta"
              style="height: 150vh;"
              ref="videobackground"
              :muted="muted"
              v-if="!isImage(videoDesk)||!isImage(videoMob)"

          >
                <div class="masthead-content">
                <h1>{{data.title}}</h1>
                <p>{{data.description}}</p>

              </div>
              <MastheadCountDown v-if="isCountDown" :data="data.endDate" class="countdown"/>
              <div class="mutedIcon" @click="play" ><img :src="'/img/icons/'+ (this.muted ? 'muted.png' :'unmuted.png')" /></div>
          </video-background>
          <div class="carousell-image" v-if="isImage(videoDesk) && !$vuetify.breakpoint.xs">
            <MastheadCountDown v-if="isCountDown&&isImage(videoDesk)&& !$vuetify.breakpoint.xs" :data="data.endDate" class="countdown"/>
            <img id="image" :src="videoDesk" >
          </div>
          <div  v-if="isImage(videoMob) && $vuetify.breakpoint.xs">
            <MastheadCountDown v-if="isCountDown&&isImage(videoDesk)&& $vuetify.breakpoint.xs" :data="data.endDate" class="countdown"/>
            <img id="image" :src="videoMob" style="width:100% !important" >
          </div>

        </swiper-slide>
        <!--swiper-slide>
          <div class="carousell-image" @click="redirect">
            <img id='image' class="hidden-sm-and-up" :src="imgMob ? imgMob : '/img/landing/week 1 prize.png'" />
            <img id='image' class="hidden-xs-only" :src="imgDesk ? imgDesk : '/img/landing/week 1 prize.png'" />

          </div>

        </swiper-slide-->
        <!--div class="prize-swiper-pagination pagination" slot="pagination"></div-->

      </swiper>
    </div>
  <div class="swiper-button-area">
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import MastheadCountDown from "../components/MastheadCountDown";
export default {
  props: {
    data: null,
    isCountDown: null,
  },
  components: {
    Swiper,
    SwiperSlide
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
           autoplay: {
          delay: 5000
        },
         navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        freeMode: true,
        pagination: {
          el: ".prize-swiper-pagination",
          clickable: true,
          bulletClass: "prize-swiper-pagination-bullet",
          bulletActiveClass: "prize-swiper-pagination-bullet-active",

        }
      },
      imgDesk: this.data.homepage.mastheadSection.desktopImage[0].url,
      imgMob: this.data.homepage.mastheadSection.mobileImage[0].url,
      videoDesk: this.data.homepage.mastheadSection.video.url,
      videoTab:  this.data.homepage.mastheadSection.video.url,
      videoMob:  this.data.homepage.mastheadSection.tabletImage.length>0 ? this.data.homepage.mastheadSection.tabletImage[0].url : this.data.homepage.mastheadSection.video.url,
      muted:true,
      image: false
    };
  },
  methods:{
    play(){
      this.muted=!this.muted;
    },
    redirect(){
      const link = this.data.homepage.mastheadSection.description
      window.open(link);
    },
    isImage(img){
      if(img.includes("png") || img.includes("jpg")){
        return true
      } else {
        return false
      }
    },
    /* mounted(){
      if (this.videoDesk.includes("png") || this.videoDesk.includes("jpg")){
        this.image = true;

      }
      console.log(this.videoDesk)
      console.log(this.image)
    } */
  }
};
</script>

<style>
.swiper-container{
  position: relative;
  max-height: 1000px;
}

.videoBackgroundFanta{
  position:relative;
}

.countdown{
  position: absolute;
  top: 80%;
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
      padding: 0;
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
.swiper-button-area{
  width: 280px;
  margin: auto;
  position: relative;
  top: -35px;
}

.swiper-button-prev, .swiper-button-next{
  z-index: 9999;
  color: #fff !important;
  top:90% !important;
  width: 100px !important;
}
.swiper-button-prev:after, .swiper-button-next:after
{
  font-size: 25px;
}
.swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled{
  opacity: 0 !important;
}
.carousell-image {
  height: 100%;
  width: 100%;
  max-height: 600px;
  /* margin-bottom: -0.5cm; */
}

.carousell-image img{
  height: 100%;
  width: 100%
}


      @media only screen and (min-width: 1200px) {
    .videoBackgroundFanta{
      max-height: 650px;
    }
    .carousell-image{
      height: 600px;
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
    .videoBackgroundFanta{
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
    .videoBackgroundFanta{
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
    .videoBackgroundFanta{
      max-height: 600px;
    }
    .carousell-image{
      max-height: 450px;
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
    .videoBackgroundFanta{
      max-height: 400px !important;
      z-index: -1;
    }
    .masthead #arrow{
      bottom: 10%;
      right: 35%;

    }
    .countdown{
      top: 50%;
    }

  }

  @media only screen and (max-width: 450px) {
    .masthead #arrow{
      bottom: 17%;
      right: 35%;

    }
    


  }

</style>
