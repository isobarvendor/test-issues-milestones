<template>
  <div class="container prize">
    <div class=" hidden-sm-and-down" style="padding-bottom: 1cm;">
      <div class="header-title">
        <p>ของรางวัล</p>
      </div>
      <div class="prize-content ">
        <div class=" " v-for="(item, index) in prizes" :key="index">
          <div id="header">
            <p>{{ item.header }}</p>
          </div>
          <div class="bigger-box" :style="item.image">
          </div>
            <div class="text-box">
              <div id="text">
                <h3 class="text-title">
                  <strong>{{ item.title }}</strong>
                </h3>
                <div v-if="item.number" id="number">
                  <h4>{{ item.number }} {{ total }}</h4>
                </div>
                <div v-if="item.subtitle" class="text-subtitle">
                  <h4>{{ item.subtitle }}</h4>
                </div>
                <div v-if="item.text">
                  <h4>{{ item.text }}</h4>
                </div>
              </div>
            </div>
          
          <div v-if="item.header !== translation.chance">
            <v-dialog v-model="item.dialog" width="1500">
              <template v-slot:activator="{ on }">
                <button class="button" id="open_popup" v-on="on">
                  <strong>{{ view }}</strong>
                </button>
              </template>

              <v-card class="card">
                <div class="button-close">
                  <img
                    @click="item.dialog = false"
                    src="/img/icons/close.png"
                    alt=""
                  />
                </div>
                <div class="header">
                  <p style="color: whiter;">WIN ANY OF THESE ROV SKINS</p>
                </div>
                <div class="images">
                  <div v-if="$vuetify.breakpoint.xs">
                    <div
                      v-for="(item, index) in final_images(1)"
                      :key="index"
                      class="image-row"
                    >
                      <div
                        v-for="(item2, index2) in item"
                        :key="index2"
                        class="image"
                      >
                        <img :src="item2.img" />
                        <div class="image-text">
                          <p style="color: black;">{{ item2.name }}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                  <div class="hidden-sm-and-down">
                    <div
                      v-for="(item, index) in final_images(4)"
                      :key="index"
                      class="image-row"
                    >
                      <div
                        v-for="(item2, index2) in item"
                        :key="index2"
                        class="image"
                      >
                        <img :src="item2.img" />
                        <div class="image-text">
                          <p style="color: black;">{{ item2.name }}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                  <div v-if="$vuetify.breakpoint.sm">
                    <div
                      v-for="(item, index) in final_images(2)"
                      :key="index"
                      class="image-row"
                    >
                      <div
                        v-for="(item2, index2) in item"
                        :key="index2"
                        class="image"
                      >
                        <img :src="item2.img" alt="" />
                        <div class="image-text">
                          <p style="color: black;">{{ item2.name }}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
      <div class="disclaimer">
        *เพื่อแลก ROV Item ตั้งแต่วันที่ 1 กันยายน 2564 ถึง 30 พฤศจิกายน 2564
        หรือจนกว่าจำนวนของรางวัล ROV Box จะหมดลง
      </div>
    </div>
    <div class="hidden-md-and-up">
      <div style="">
        <div class="header-title-mobile">
          <p>ของรางวัล</p>
        </div>
        <div
          class="individual-prize-mobile"
          v-for="(item, index) in prizes"
          :key="index"
        >
          <div id="header">
            <p>{{ item.header }}</p>
          </div>
          <div class="bigger-box-mobile" :style="item.image">
          </div>
            <div class="text-box-mobile">
              <div id="text-mobile">
                <h3 class="text-title-mobile">
                  <strong>{{ item.title }}</strong>
                </h3>
                <div v-if="item.number" id="number-mobile">
                  <h4>{{ item.number }} {{ total }}</h4>
                </div>
                <div v-if="item.subtitle" class="text-subtitle-mobile">
                  <h4>{{ item.subtitle }}</h4>
                </div>
                <div v-if="item.text">
                  <h4>{{ item.text }}</h4>
                </div>
              </div>
            </div>
          
          
          <div v-if="item.header !== translation.chance">
            <v-dialog v-model="item.dialog" width="1500">
              <template v-slot:activator="{ on }">
                <button class="button-mobile" id="open_popup" v-on="on">
                  <strong>{{ view }}</strong>
                </button>
              </template>

              <v-card class="card">
                <div class="button-close">
                  <img
                    @click="item.dialog = false"
                    src="/img/icons/close.png"
                    alt=""
                  />
                </div>
                <div class="header">
                  <p style="color: whiter;">
                    แลกได้ทันที ROV ไอเทมเหล่านี้อาจเป็นของคุณ!
                  </p>
                </div>
                <div class="images">
                  <div v-if="$vuetify.breakpoint.xs">
                    <div
                      v-for="(item, index) in final_images(1)"
                      :key="index"
                      class="image-row"
                    >
                      <div
                        v-for="(item2, index2) in item"
                        :key="index2"
                        class="image"
                      >
                        <img :src="item2.img" />
                        <div class="image-text">
                          <p style="color: black;">{{ item2.name }}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                  <div class="hidden-sm-and-down">
                    <div
                      v-for="(item, index) in final_images(4)"
                      :key="index"
                      class="image-row"
                    >
                      <div
                        v-for="(item2, index2) in item"
                        :key="index2"
                        class="image"
                      >
                        <img :src="item2.img" />
                        <div class="image-text">
                          <p style="color: black;">{{ item2.name }}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                  <div v-if="$vuetify.breakpoint.sm">
                    <div
                      v-for="(item, index) in final_images(2)"
                      :key="index"
                      class="image-row"
                    >
                      <div
                        v-for="(item2, index2) in item"
                        :key="index2"
                        class="image"
                      >
                        <img :src="item2.img" alt="" />
                        <div class="image-text">
                          <p style="color: black;">{{ item2.name }}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </v-card>
            </v-dialog>
            <div class="disclaimer">
              *เพื่อแลก ROV Item ตั้งแต่วันที่ 1 กันยายน 2564 ถึง 30 พฤศจิกายน
              2564 หรือจนกว่าจำนวนของรางวัล ROV Box จะหมดลง
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import * as _ from "lodash";
import { translation } from "@/constants/index";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    data: null,
    total: null
  },
  data() {
    return {
      view: translation.prizes.view,
      translation: translation.prizes,
      prizes: [
        {
          header: translation.prizes.instantWin,
          title: "FANTA x ROV Box* จำนวนจำกัดทั้งสิ้น 1.5 ล้านรางวัล",
          number: "ไอเทมคงเหลือ ",
          subtitle: null,
          image: "background-image: url('/develop/rov-background.png')",
          text: null,
          dialog: false
        },
        {
          header: translation.prizes.chance,
          title: translation.prizes.iphone,
          number: null,
          subtitle: translation.prizes.iphone_desc,
          image: "background-image: url('/develop/iphone-background.png')",
          text: "รวมจำนวนทั้งสิ้น 180 รางวัล",
          dialog: false
        }
      ],
      dialog: false,
      images: [
        {
          img: "/develop/popup-1.png",
          title: "Some information about the ROV Skins",
          name: "Celurean Princess Sinestrea",
          cost: "THB 692.25",
          amount: "Available amount: 8,400"
        },
        {
          img: "/develop/popup-2.png",
          title: "Some information about the ROV Skins",
          name: "Home Runner Astrid",
          cost: "THB 692.25",
          amount: "Available amount: 6,400"
        },
        {
          img: "/develop/popup-3.png",
          title: "Some information about the ROV Skins",
          name: "Sweet Dreams Ishar",
          cost: "THB 263.25",
          amount: "Available amount: 35,500"
        },
        {
          img: "/develop/popup-4.png",
          title: "Some information about the ROV Skins",
          name: "Viper Airi",
          cost: "THB 263.25",
          amount: "Available amount: 35,000"
        },
        {
          img: "/develop/popup-5.png",
          title: "Some information about the ROV Skins",
          name: "Arcana Fragments x250",
          cost: "THB 12",
          amount: "Available amount: 329,750"
        },
        {
          img: "/develop/popup-6.png",
          title: "Some information about the ROV Skins",
          name: "Gem x50",
          cost: "THB 7.5",
          amount: "Available amount: 594,750"
        },
        {
          img: "/develop/popup-7.png",
          title: "Some information about the ROV Skins",
          name: "Normal Scroll x10",
          cost: "THB 10",
          amount: "Available amount: 490,200"
        }
      ]
    };
  },
  methods: {
    final_images(num) {
      return _.chunk(this.images, num);
    }
  }
  /* created(){
    let total = 0;
      this.data.forEach(ele => {
        total += ele.amountAvailable
    });
    this.prizes[0].number = total;
    console.log(this.prizes)
  }, */
};
</script>

<style lang="scss" scoped>
.prize {
  background-image: url("/develop/background-prizes.png");
  background-size: 100% 100%;
}

.prize-content {
  width: 80%;
  height: 73%;
  margin-top: 8%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-evenly;
}

.individual-prize-mobile {
  width: 100%;
  padding-top: 10%;
  text-align: center;
  align-items: center;
  height: 100%;
  margin-bottom: 2%;
}

.bigger-box-mobile {
  margin: 0 1cm;
  /* width: 80%;
  height: 70%; */
  width: 303.58px;
  height: 300.13px;
  margin: auto;
  background-size: 100% 100%;
}

.header-title {
  height: 10%;
  text-align: center;
  margin: 2% auto auto auto;
  position: relative;
  p {
    font-family: "SiamSquare";
    font-size: 50px;
    position: relative;
    top: 55%;
    background-image: url("/develop/background-prizes-title.png");
    background-size: 100% 100%;
    max-width: 500px;
    margin: auto;
    height: 90px;
    padding-top: 10px;
  }
}

.header-title-mobile {
  height: 10%;
  text-align: center;
  margin-top: 18%;
  p {
    font-family: "SiamSquare";
    font-size: 250%;
    background-image: url("/develop/background-prizes-title.png");
    background-size: 100% 100%;
    height: 100px;
    padding: 0.5cm;
    margin: auto;
  }
}

#header {
  font-family: "SiamSquare";
  text-align: center;
  p {
    font-size: 20px;
  }
}

.bigger-box {
  margin: 0 1cm;
  /* width: 80%;
  height: 70%; */
  width: 303.58px;
  height: 300.13px;
  margin: auto;
  background-size: 100% 100%;
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
  margin: 5% auto auto auto;
  padding-top: 5%;
  img {
    /* height: 276.74px;
    width: 276.74px; */
    height: 100%;
    width: 100%;
  }
}

.disclaimer {
  text-align: center;
  color: white;
  margin-top: 16px;
}

.text-box {
  width: 300px;
  height: 105px;
  margin: auto;
  color: white;
  text-align: center;
  background-color: darkblue;
  vertical-align: middle;
}

.text-box-mobile{
  width: 300px;
  height: 105px;
  margin: auto;
  color: white;
  text-align: center;
  background-color: darkblue;
  vertical-align: middle;
}

#text{
  width: 95%;
  margin: auto;
  padding-top: 0.1cm;
}

#text-mobile{
  width: 95%;
  margin: auto;
  padding-top: 0.1cm;
}

.text-title {
  height: 50%;
  /* margin-bottom: 5%; */
  margin-top: 3%;
  font-size: 100%;
  width: 100%;
  margin: 3% auto auto auto;
}

.text-title-mobile {
  height: 50%;
  /* margin-bottom: 5%; */
  margin-top: 3%;
  font-size: 60%;
  width: 100%;
  margin: 4% auto auto auto;
  font-size: 16px;
}

#number {
  background: #f27c00;
  height: 50%;
  padding: 2% 0;
  font-size: 100%;
}

#number-mobile {
  background: #f27c00;
  height: 50%;
  padding: 2% 0;
  font-size: 14px;
}

.text-subtitle {
  font-size: 100%;
}

.text-subtitle-mobile {
  font-size: 14px;
}

.button {
  background-color: #73aa17;
  color: white;
  font-size: 100%;
  width: 300px;
  border-radius: 5px;
  margin: 5% 1cm 0 1cm;
  text-align: center;
  height: 4vh;
  font-family: "Avenir";
  box-shadow: 3px 3px 5px #707070;
}

.button-mobile {
  background-color: #73aa17;
  color: white;
  font-size: 100%;
  width: 80%;
  border-radius: 5px;
  margin: 5% 1cm 0 1cm;
  text-align: center;
  height: 4vh;
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
  padding-top: 3.5rem;
  background-image: url("/develop/banner-popup.png");
  background-position: 50% 0%;
  background-size: 700px 200px;
  margin-bottom: 0;
  font-size: 200%;
}

.image-row {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto;
  img {
    width: 228px;
    height: 261px;
  }
  div {
    font-size: 16px;
    text-align: center;
    margin-top: 2%;
    margin-bottom: 6%;
    p {
      width: 100%;
      margin: auto;
    }
  }
}

.image {
  width: 300px;
  height: 261px;
  img {
    padding: 0 5%;
  }
}
@media screen and (max-width: 1050px) {
  .image img {
    padding: 0 12%;
  }
}

@media screen and (max-width: 960px) {
  .image-row div {
    margin-bottom: 12%;
  }
  .header {
    /* text-align: center; */
    background-position: 50% 0%;
    background-size: 500px 200px;
    margin-bottom: 0;
    p {
      font-size: 2.9vw;
    }
  }
  .card .button-close {
    position: absolute;
    right: 5%;
    top: 3%;
  }
}

@media screen and (max-width: 900px) {
  .text-title {
    font-size: 90%;
  }
  #number {
    font-size: 90%;
  }
  .text-subtitle {
    font-size: 90%;
  }
  .button {
    font-size: 90%;
  }
  .image-row div {
    margin-bottom: 15%;
  }
}

@media screen and (max-width: 750px) {
  .card .button-close {
    position: absolute;
    right: 4%;
    top: 2%;
  }
  .header {
    /* text-align: center; */
    background-size: 400px 200px;
    p {
      font-size: 2.9vw;
    }
  }
  .image-row div {
    margin-bottom: 20%;
  }
}

@media screen and (max-width: 640px) {
  .text-title {
    font-size: 70%;
  }
  #number {
    font-size: 70%;
  }
  .text-subtitle {
    font-size: 70%;
  }
  .button {
    font-size: 70%;
  }

  .card .button-close {
    position: absolute;
    right: 3%;
    top: 2.5%;
  }
  .header {
    /* text-align: center; */
    /* margin-top: 2rem; */
    background-size: 380px 200px;
    p {
      font-size: 3.5vw;
    }
  }
  .image-row div {
    margin-bottom: 25%;
  }
}

@media screen and (max-width: 500px) {
  .prize-content {
    margin-left: 5%;
  }

  .text-title {
    font-size: 60%;
  }
  #number {
    font-size: 60%;
  }
  .text-subtitle {
    font-size: 60%;
  }
  .button {
    font-size: 60%;
  }

  .card {
    padding-top: 2rem;
  }

  .card .button-close {
    position: absolute;
    right: 4%;
    top: 1.4%;
  }
  .images {
    padding-top: 1cm;
  }
  .header {
    /* text-align: center; */
    background-size: 200px 100px;
    padding: 1.5rem 1rem 0 1rem;
    margin-right: 2rem;

    p {
      width: 60%;
      text-align: center;
      font-size: 3.5vw;
    }
  }
  .image-row div {
    margin-bottom: 35%;
  }

  .header-title-mobile {
    p {
      padding-top: 0.5cm;
    }
  }
}

@media screen and (max-width: 450px) {
  .header-title {
    margin-top: 0;
    p {
      font-size: 5vw;
    }
  }

  .prize-content {
    margin-left: 3%;
  }

  .text-title {
    font-size: 50%;
  }
  #number {
    font-size: 50%;
  }
  .text-subtitle {
    font-size: 50%;
  }
  .button {
    font-size: 50%;
    height: 2vh;
  }
}

/* @media screen and (max-width: 768px) {
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
} */
</style>
