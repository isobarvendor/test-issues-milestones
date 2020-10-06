<template>
  <div id="main" class="account">
    <div class="wrapper">
      <div class="container">
        <AccountDetail />
      </div>

    </div>
  </div>
</template>

<script>

import AccountDetail from '@/components/AccountDetail'

export default {
  data(){
    return{
      dataStatus:{},
      data:null,
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

};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    @media only screen and (max-width: 767px) {
      .account{
      }
    }
  }
</style>
