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
    ref="videobackground"
    :muted="muted"


>
      <div class="masthead-content">
      <h1>{{data.title}}</h1>
      <p>{{data.description}}</p>

    </div>
    <MastheadCountDown v-if="isCountDown" :data="data.endDate" />
    <div class="mutedIcon" @click="play" ><img :src="'/img/icons/'+ (this.muted ? 'muted.png' :'unmuted.png')" /></div>
</video-background>

  </div>
</template>

<script>
import MastheadCountDown from '../components/MastheadCountDown'
export default {
  name: "MastheadVideo",
  props: {
    data: null,
    isCountDown:null,

  },
   components:{
    MastheadCountDown
  },
  data() {
    return {
      imgDesk: this.data.homepage.mastheadSection.desktopImage[0].url,
      imgTab: this.data.homepage.mastheadSection.tabletImage.length>0 ? this.data.homepage.mastheadSection.tabletImage[0].url : this.data.homepage.mastheadSection.desktopImage[0].url,
      imgMob: this.data.homepage.mastheadSection.mobileImage.length>0 ? this.data.homepage.mastheadSection.mobileImage[0].url : this.data.homepage.mastheadSection.desktopImage[0].url,
      videoDesk: this.data.homepage.mastheadSection.video.url,
      videoTab:  this.data.homepage.mastheadSection.video.url,
      videoMob:  this.data.homepage.mastheadSection.video.url,
      muted:true
    }
  },
  mounted() {

  },
  methods: {
    play(){
      this.muted=!this.muted;
    }
  },

};
</script>

<style>
 #masthead{
      background:#de0a1c;
      padding: 20px;
    }
    .mutedIcon{
      position: absolute;
      bottom: 50px;
      left: 50px;
      cursor: pointer;
    }
  @media only screen and (max-width: 600px) {
    .videoBackground{
      max-height: 400px !important;
    }
     #masthead{
      padding: 10px;
    }
    .mutedIcon{

      bottom: 5px;
      left: 5px;

    }
  }
    @media only screen and (max-width: 1099px) {
    .videoBackground{
      max-height: 500px;
    }
     #masthead{
      padding: 10px;
    }
  }
      @media only screen and (min-width: 1100px) {
    .videoBackground{
      max-height: 600px;
    }

  }
</style>
