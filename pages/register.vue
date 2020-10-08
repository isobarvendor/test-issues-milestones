<template>
  <div v-if="data" id="main" class="register">
    <div class="wrapper">
      <div class="container">
        <Registration :data="data[0].signUp"/>
      </div>

    </div>
  </div>
</template>

<script>
import Registration from '@/components/Registration'
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
      .register{
      }
    }
  }
</style>
