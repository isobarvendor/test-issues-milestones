<template>
  <div v-if="CMSContent" id="main" class="help">
    <div class="wrapper">
      <div class="container">
           <div class="header">{{ CMSContent[0].helpSection.title}}</div>
        <FaqSection :data="CMSContent[0].helpSection" :disabled="disabled"/>
      </div>

    </div>
  </div>
</template>

<script>

import FaqSection from '@/components/FaqSection'
import deepClone from 'deep-clone'
export default {
  data(){
    return{
      data:null,
      disabled: null
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
       CMSContent(){
      return deepClone(this.$store.state.CMSContent)
     },
     configData(){
       return deepClone(this.$store.state.config)
     }
  },

};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
      .help{
        @media only screen and (max-width: 767px) {
            .header{
                font-size: 22px;
            }
        }
    }
  }
</style>
