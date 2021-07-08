<template>
  <div id="masthead" class="container">
    <video-background
      :src="videoDesk"
      :poster="imgDesk"
      :sources="[
        { src: videoDesk, res: 1100, autoplay: true },
        { src: videoTab, res: 900, autoplay: true },
        { src: videoMob, res: 638, autoplay: true }
      ]"
      class="videoBackground"
      style="height: 100vh;"
      ref="videobackground"
      :muted="muted"
    >
      <!-- <div class="masthead-content">
      <h1>{{data.title}}</h1>
      <p>{{data.description}}</p>

    </div> -->
      <div class="mutedIcon" @click="play">
        <img
          :src="'/img/icons/' + (this.muted ? 'muted.png' : 'unmuted.png')"
        />
      </div>
    </video-background>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    data: null,
    isCountDown: null
  },

  data() {
    return {
      imgDesk:
        "https://elasticbeanstalk-prod-appcontent-016219.s3.ap-southeast-1.amazonaws.com/medium_Hero_Banner_min_08b3f77b72_1_d5576ec2e5.png",
      videoDesk:
        "https://elasticbeanstalk-prod-appcontent-016341.s3.ap-southeast-1.amazonaws.com/CC_UPLIFT_Indonesia_TVC_15_Titled_Master_1280x688_b36f3a1040.mp4",
      videoTab:
        "https://elasticbeanstalk-prod-appcontent-016341.s3.ap-southeast-1.amazonaws.com/CC_UPLIFT_Indonesia_TVC_15_Titled_Master_1280x688_b36f3a1040.mp4",
      videoMob:
        "https://elasticbeanstalk-prod-appcontent-016341.s3.ap-southeast-1.amazonaws.com/CC_UPLIFT_Indonesia_TVC_15_Titled_Master_450x427_4d9d4f2c46.mp4",
      muted: true
    };
  },
  mounted() {},
  methods: {
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
@media only screen and (max-width: 600px) {
  .videoBackground {
    max-height: 400px !important;
  }
  #masthead {
    padding: 10px;
  }
  .mutedIcon {
    bottom: 5px;
    left: 5px;
  }
}
@media only screen and (max-width: 1099px) {
  .videoBackground {
    max-height: 500px;
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
