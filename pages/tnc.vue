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
export default {
  name:"Tnc",
  components:{
    TncSection
  },
  data(){
    return{
      dataStatus:{},

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
