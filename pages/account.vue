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
import { GET_ACCOUNT } from '@/store/action_types';
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
  methods:{
    async getAccount(){
       await this.$store.dispatch(GET_ACCOUNT,this.$store.state.token)
    },

  },
    mounted(){
    if(!this.$store.state.token){
      this.$router.push('/login');
    }
     this.getAccount();
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
