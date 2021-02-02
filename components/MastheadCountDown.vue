<template>
  <div id="masthead" class="container" >
    <mq-layout :mq="['sm']">
      <svg
        ref="coke_masthead_sm"
        id="coke_masthead_sm"
        data-name="coke_masthead"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 360 459"
      >
        <def>
          <mask id="clipMask">
            <path
              id="coke_line"
              data-name="coke_line"
              fill="white"
              d="M0,440.7l0-59V0H360v321.8h0l0,84.9c-10.1-1.7-20.3-2.6-30.5-2.6c-36.5,0-72,12.7-111,32.1
			c-23.9,11.9-55.6,22.8-98,22.8C82.3,459,38.7,452,0,440.7z"
            />
          </mask>
        </def>
        <image
          ref="coke_masthead_sm_image"
          :href="this.imgMob"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#clipMask)"
        />
      </svg>
    </mq-layout>
    <mq-layout :mq="['md', 'lg']">
      <svg
        ref="coke_masthead_md"
        id="coke_masthead_md"
        data-name="coke_masthead"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 834 895"
      >
        <def>
          <mask id="clipMask">
            <path
              id="coke_line"
              data-name="coke_line"
              fill="white"
              d="M0,852.73,0,716.29V0H833.88V577.19H834l-.08,196.63a412.51,412.51,0,0,0-70.61-6c-84.65,0-166.8,29.44-257.07,74.38C451,869.75,377.33,895,279.15,895,190.73,895,89.63,878.72,0,852.73Z"
            />
          </mask>
        </def>
        <image
          ref="coke_masthead_md_image"
          :href="this.imgTab"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#clipMask)"

        />
      </svg>
    </mq-layout>
    <mq-layout mq="xl">
      <svg
        id="coke_masthead"
        data-name="coke_masthead"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1280 650"
      >
        <def>
          <mask id="clipMask">
            <path
              id="coke_line"
              data-name="coke_line"
              fill="red"
              d="M0,585.14.05,449.31H0V0H1279.88V192.59h.12l-.12,271.46a634.78,634.78,0,0,0-108.37-9.17c-129.91,0-256,45.19-394.54,114.14-84.84,42.23-197.86,81-348.55,81C292.72,650,137.56,625,0,585.14Z"
            />
          </mask>
        </def>
        <image
          ref="coke_masthead_image"
          :href="this.imgDesk"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#clipMask)"
        />
      </svg>
    </mq-layout>
    <div class="masthead-content">
      <h1>{{data.title}}</h1>
      <p>{{data.description}}</p>
      <vac :end-time="new Date().getTime() + 60000" @finish="finishCall">
        <span
          slot="process"
          slot-scope="{ timeObj }">{{ `Lefttime: ${timeObj.m}:${timeObj.s}` }}</span>
        <span slot="finish">Done!</span>
      </vac>
    </div>
  </div>
</template>

<script>
export default {
  name: "Masthead",
  props: {
    data: null
  },
  data() {
    return {
      imgDesk: this.data.desktopImage[0].url,
      imgTab: this.data.tabletImage[0].url,
      imgMob: this.data.mobileImage[0].url
    }
  },
  mounted() {
    // this.loadMasthead()
    // window.addEventListener('resize', this.loadMasthead)
  },
  methods: {
   finishCall(){
     window.location.reload();
     this.$store.commit('SET_CAMPAIGN_STARTED',true);
   }
  },
  mounted() {

  },
};
</script>

<style>
</style>
