<template>
  <div id="masthead" class="container">
    <div
      v-if="isImage(videoDesk) || (isImage(videoMob) && $vuetify.breakpoint.xs)"
    >
      <img
        :src="videoMob"
        alt=""
        v-if="$vuetify.breakpoint.xs"
        style="width:100%;"
      />
      <img :src="imgDesk" alt="" v-else style="width:100%;" />
    </div>
    <video-background
      v-else
      :src="videoDesk"
      :poster="imgDesk"
      :sources="[
        { src: videoDesk, res: 1100, autoplay: true },
        { src: videoTab, res: 900, autoplay: true },
        { src: videoMob, res: 638, autoplay: true }
      ]"
      :class="['videoBackground']"
      style="height: 100vh; "
      ref="videobackground"
      :muted="muted"
    >
      <div class="masthead-content">
        <h1>{{ data.title }}</h1>
        <p>{{ data.description }}</p>
      </div>
      <!-- <div class="poster-mobile">
        <img :src="mobileImageUrl" alt="" />
      </div> -->
      <div :class="['mutedIcon', this.showMuteIcon]" @click="play">
        <img
          :src="'/img/icons/' + (this.muted ? 'muted.png' : 'unmuted.png')"
        />
      </div>
    </video-background>
    <MastheadCountDown v-if="isCountDown" :data="data.endDate" />
  </div>
</template>

<script>
import MastheadCountDown from "../components/MastheadCountDown";
export default {
  name: "MastheadVideo",
  props: {
    data: null,
    isCountDown: null
  },
  components: {
    MastheadCountDown
  },
  data() {
    return {
      imgDesk: this.data.homepage.mastheadSection.desktopImage[0].url,
      videoDesk: this.data.homepage.mastheadSection.video.url,
      videoTab: this.data.homepage.mastheadSection.video.url,
      videoMob:
        this.data.homepage.mastheadSection.mobileImage.length > 0
          ? this.data.homepage.mastheadSection.mobileImage[0].url
          : this.data.homepage.mastheadSection.video.url,
      muted: true,
      showMuteIcon: "",
      mobileImageUrl: this.data.homepage.mastheadSection.mobileImage[0].url
    };
  },
  mounted() {
    let video =
      this.data.homepage.mastheadSection.mobileImage.length > 0
        ? this.data.homepage.mastheadSection.mobileImage[0].url
        : "";
    if (video.includes(".mp4")) {
      this.showMuteIcon = "";
      this.videoBackgroundClass = "videoBackground";
    } else {
      this.showMuteIcon = "hideMuteIcon";
      this.videoBackgroundClass = ".video-background-none";
    }
  },
  computed: {
    getVideoMob() {
      // let video =
      //   this.data.homepage.mastheadSection.mobileImage.length > 0
      //     ? this.data.homepage.mastheadSection.mobileImage[0].url
      //     : "";
      // if (video.includes(".mp4")) {
      //   this.showMuteIcon = "";
      // } else {
      //   this.showMuteIcon = "hideMuteIcon";
      // }
    }
  },
  methods: {
    isImage(img) {
      if (img.includes("png") || img.includes("jpg")) {
        return true;
      } else {
        return false;
      }
    },

    play() {
      this.muted = !this.muted;
    }
  }
};
</script>

<style>
#masthead {
  background: #de0a1c;
  padding: 20px;
}
.mutedIcon {
  position: absolute;
  bottom: 50px;
  left: 50px;
  cursor: pointer;
}
.poster-mobile {
  display: none;
}
@media only screen and (max-width: 600px) {
  .videoBackground {
    max-height: 400px !important;
    width: 100% !important;

    /* background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%; */
  }
  .video-background-none {
    display: none;
  }
  #masthead {
    padding: 10px;
  }
  .mutedIcon {
    bottom: 5px;
    left: 5px;
  }
  .hideMuteIcon {
    display: none;
  }
  .poster-mobile {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    /* right: 0; */
    /* bottom: 0; */

    /* padding: 5px; */
    /* max-height: 500px; */
    /* width: 100%;
    height: 100%; */

    background: black;
  }
  .poster-mobile img {
    width: 100%;
    display: block;
    /* height: auto; */
    object-fit: scale-down;
  }
}
@media only screen and (max-width: 1099px) {
  .videoBackground {
    max-height: 500px;
    width: 100%;
    height: 100%;
  }
  #masthead {
    padding: 10px;
  }
}
@media only screen and (min-width: 1100px) {
  .videoBackground {
    max-height: 600px;
  }
}
</style>
