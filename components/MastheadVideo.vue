<template>
  <div id="masthead" class="container" >

 <video-background
    :src="videoDesk"
    :poster="imgDesk"
    :sources="[
        {src: videoDesk, res: 1100, autoplay: true},
        {src: videoTab, res: 900, autoplay: true},
        {src: videoMob, res: 638, autoplay: true}
    ]"
    class="videoBackground"
    style="height: 100vh;"
    overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)"
>
      <div class="masthead-content">
      <h1>{{data.title}} testing</h1>
      <p>{{data.description}} hello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hello</p>
    <vac :end-time="new Date().getTime() + 60000" @finish="finishCall">
    <span
      slot="process"
      slot-scope="{ timeObj }">{{ `Lefttime: ${timeObj.m}:${timeObj.s}` }}</span>
    <span slot="finish">Done!</span>
  </vac>
    </div>
</video-background>

  </div>
</template>

<script>
export default {
  name: "MastheadVideo",
  props: {
    data: null
  },
  data() {
    return {
      imgDesk: this.data.desktopImage[0].url,
      imgTab: this.data.tabletImage[0].url,
      imgMob: this.data.mobileImage[0].url,
      videoDesk: "/img/background.mp4",
      videoTab:  "/img/background.mp4",
      videoMob:  "/img/background.mp4",
    }
  },
  mounted() {

  },
  methods: {
    finishCall(){
      alert('tes')
    }
  },
  mounted() {

  },
};
</script>

<style>
  @media only screen and (max-width: 600px) {
    .videoBackground{
      max-height: 400px !important;
    }
  }
    @media only screen and (max-width: 1099px) {
    .videoBackground{
      max-height: 500px;
    }
  }
      @media only screen and (min-width: 1100px) {
    .videoBackground{
      max-height: 600px;
    }
  }
</style>
