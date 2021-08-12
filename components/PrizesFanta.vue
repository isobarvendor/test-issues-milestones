<template>
  <div class="container prize" style="">
    <div class="header-title">
        <p>PRIZES</p>
      </div>
    <div class="prize-content">
      <div class="prize-swiper-container container">
        <swiper class="swiper prize-swiper" :options="swiperOption">
          <swiper-slide
            v-for="(item, index) in prizes"
            :key="'prize' + index"
            class="prize-item"
          >
            <div class="prize-item-content">
              <img
                :src="
                  item.image ? item.image : '/img/landing/week 1 prize.png'
                "
              />
              <div class="prize-description">
                <div class="prize-title"><strong>{{ item.title }}</strong></div>
                <div v-if="item.number" id="number">
                    <h4>{{ item.number }}</h4>
                </div>
                <div v-if="item.subtitle" class="prize-subtitle">
                    <h4 >{{ item.subtitle }}</h4>
                </div>
              </div>
            </div>
            <div>
                <v-dialog
                    v-model="item.dialog"
                    width="1500"
                    >
                    <template v-slot:activator="{ on }">
                        
                        <button class="button" 
                        v-on="on"><strong>View more</strong></button>
                    </template>

                    <v-card class="card">
                        
                        <div class='button-close'>
                            <img @click="item.dialog = false" src="/img/icons/close.png" alt="">
                        </div>
                        <div class="header">
                            <p style="color: whiter;">WIN ANY OF THESE ROV SKINS</p>
                        </div>
                        <div class="images">
                            <div class="hidden-sm-and-down">
                                <div v-for="(item, index) in final_images(4)" :key="index" class="image-row" >
                                    <div v-for="(item2, index2) in item" :key="index2" class="image">
                                        <img src="/develop/popup.png">
                                        <div>
                                            <p style="color: black;">{{ item2.title }}</p>
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div class="hidden-md-and-up">
                                <div v-for="(item, index) in final_images(2)" :key="index" class="image-row" >
                                    <div v-for="(item2, index2) in item" :key="index2" class="image">
                                        <img src="/develop/popup.png" alt="">
                                        <div>
                                            <p style="color: black;">{{ item2.title }}</p>
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                        </div>
                        

                        
                        
                        
                    </v-card>
                </v-dialog>
                
            </div>
          </swiper-slide>
          <div class="prize-swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- <div v-for="(item,index) in prizes" :key="index">
                    <div id="header">
                        <p>{{ item.header }}</p>
                    </div>
                    <div class="bigger-box">
                        <div class="image-box">
                            <img :src="item.image"/>
                        </div>
                        <div class="text-box">
                            <div id='text'>
                                <h3><strong>{{ item.title }}</strong></h3>
                                <div v-if="item.number" id="number">
                                    <h4>{{ item.number }}</h4>
                                </div>
                                <div v-if="item.subtitle">
                                    <h4 >{{ item.subtitle }}</h4>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <v-dialog
                            v-model="item.dialog"
                            width="1500"
                            >
                            <template v-slot:activator="{ on }">
                                
                                <button class="button" 
                                v-on="on"><strong>View more</strong></button>
                            </template>

                            <v-card class="card">
                                
                                <div class='button-close'>
                                    <img @click="item.dialog = false" src="/img/icons/close.png" alt="">
                                </div>
                                <div class="header">
                                    <p style="color: whiter;">WIN ANY OF THESE ROV SKINS</p>
                                </div>
                                <div class="images">
                                    <div class="hidden-sm-and-down">
                                        <div v-for="(item, index) in final_images(4)" :key="index" class="image-row" >
                                            <div v-for="(item2, index2) in item" :key="index2" class="image">
                                                <img src="/develop/popup.png">
                                                <div>
                                                    <p style="color: black;">{{ item2.title }}</p>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                    <div class="hidden-md-and-up">
                                        <div v-for="(item, index) in final_images(2)" :key="index" class="image-row" >
                                            <div v-for="(item2, index2) in item" :key="index2" class="image">
                                                <img src="/develop/popup.png" alt="">
                                                <div>
                                                    <p style="color: black;">{{ item2.title }}</p>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                                

                                
                                
                                
                            </v-card>
                        </v-dialog>
                        
                    </div>
                </div>
                
         -->
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import * as _ from "lodash";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      prizes: [
        {
          header: "INSTANT WIN",
          title: "1.5 Million Fanta x ROV Boxes",
          number: "1,234,567 remaining",
          subtitle: null,
          image: "/develop/fanta-prize.png",
          dialog: false
        },
        {
          header: "CHANCE TO WIN WEEKLY",
          title: "iPhone 12, 128GB",
          number: null,
          subtitle: "15 Prizes giveaway weekly",
          image: "/develop/fanta-prize.png",
          dialog: false
        }
      ],
      dialog: false,
      images: [
        { img: "/img/ROV.jpeg", title: "Some information about the ROV Skins" },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        },
        {
          img: "/develop/popup.png",
          title: "Some information about the ROV Skins"
        }
      ],
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
         autoplay: {
          delay: 5000,
        },
        breakpoints: {
          // when window width is >= 320px
          370: {
              slidesPerView: 1,
              spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 50,
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
  methods: {
    final_images(num) {
      return _.chunk(this.images, num);
    }
  }
};
</script>

<style lang="scss" scoped>
.prize {
  background-image: url("/develop/background-prizes.png");
  background-size: 100% 100%;
}

.prize-content {
  width: 80%;
  height: 83%;
  margin: auto;
}

.header-title {
  height: 10%;
  text-align: center;
  margin: auto;
  position: relative;
  p {
    font-family: "Hackney";
    font-size: 3vw;
    position: relative;
    top: 70%;
  }
}

#header {
  font-family: "Hackney";
}

.bigger-box {
  background-color: darkblue;
  margin: 0 1cm;
  width: 80%;
  height: 100%;
}
.prizes {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50%;
  margin-top: 5%;
}

.image-box {
  width: 90%;
  height: 70%;
  margin: auto;
}

.prize-description{
    height: 80%;
    text-align: center;
    color: white;
}

.prize-title{
    height: 50%;
    margin-bottom: 10%;
    margin-top: 5%;
}

#number{
    background: #F27C00;
    padding: 5% 0;
}

.prize-subtitle{
    padding: 5% 0;
}

.button {
  background-color: #73aa17;
  color: white;
  font-size: 14px;
  width: 100%;
  border-radius: 5px;
  margin-top: 5%;
  text-align: center;
  height: 1cm;
  font-family: "Avenir";
  box-shadow: 3px 3px 5px #707070;
}

.card {
  position: relative;
  background-color: #f0e7db;
  opacity: 0.93;
}

.card .button-close {
  position: absolute;
  right: 5%;
  top: 5%;
}

.images {
  padding-top: 2cm;
}

.header {
  /* text-align: center; */
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  background-image: url("/develop/banner-popup.png");
  background-position: 50% 0%;
  background-size: 700px 200px;
  margin-bottom: 0;
}

.image-row {
  display: flex;
  justify-content: center;
  width: 60%;
  margin: auto;
  img {
    width: 228px;
    height: 261px;
  }
  div {
    font-size: 16px;
    text-align: center;
    margin-top: -1cm;
    margin-bottom: 1.5cm;
    p {
      width: 170px;
      margin: auto;
    }
  }
}

.image {
  width: 228px;
  height: 261px;
}

@media screen and (max-width: 768px) {
    .header-title{
        p{
            font-size: 8vw;
        }
    }

    .prize-item-content{
        img{
            height: 80%;
        }
    }

    .prize-title{
        font-size: 150%
    }   
    .prize-subtitle{
        font-size: 150%
    }

    #number{
        font-size: 150%
    }
}
</style>
