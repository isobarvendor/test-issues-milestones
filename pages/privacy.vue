<template>
  <div  v-if="data" id="main" class="privacy">
    <div class="wrapper">
      <div class="container">
        <PrivacySection :data="data[0].privacy"/>
      </div>

    </div>
  </div>
</template>

<script>
import PrivacySection from '@/components/PrivacySection'
export default {
  data(){
    return{
    }
  },
  head() {
    return {
      title: "Coke Campaign Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description"
        }
      ],
      noscript: [],
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
  created() {

  },
  methods: {

  },
  computed: {
    data(){
        return this.$store.getters.getCMSContent;
     }
},
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    @media only screen and (max-width: 767px) {
      .privacy{
      }
    }
  }
</style>
