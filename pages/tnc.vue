<template>
  <div v-if="data" id="main" class="tnc">
    <div class="wrapper">
      <div class="container">
        <TncSection :data="data[0].Tnc"/>
      </div>

    </div>
  </div>

</template>

<script>
import TncSection from '@/components/TncSection'
import {translation} from "@/constants/index"
export default {
  name:"Tnc",
  components:{
    TncSection
  },
  data(){
    return{
      dataStatus:{},
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
      .tnc{
      }
    }
  }
</style>
