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
import {translation} from "@/constants/index"
export default {
  name:"privacy",
  components:{
    PrivacySection
  },
  data(){
    return{
      browserTitle:translation.browserTitle,
      metaData:translation.meta
    }
  },
  head() {
    return {
      title: this.browserTitle,
      meta:this.metaData,
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
