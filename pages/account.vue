<template>
  <div id="main" class="account">
    <client-only>
    <div class="wrapper"  v-if="loginAccount&&CMSContent" >
      <div class="container">
        <AccountDetail :data="loginAccount" :cmsData="CMSContent[0]"/>
      </div>
    </div>
    </client-only>
  </div>
</template>

<script>

import AccountDetail from '@/components/AccountDetail'
import { GET_ACCOUNT,GET_LIST_WALLET } from '@/store/action_types';
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
    async getListWallet(){

         await this.$store.dispatch(GET_LIST_WALLET)
                .then((response)=>{
                })
                .catch((error) =>{
                  if(error.response && error.response.data.status=='401'){
                    this.errorMessage='Please enter the correct email/password';
                  }
                })


     }
  },
  computed:{
    loginAccount(){
      return this.$store.getters.getLoginAccount;
    },
     CMSContent(){
      return this.$store.getters.getCMSContent;
    },
      campaignType(){
      return this.$store.getters.getCMSConfig ? this.$store.getters.getCMSConfig.campaignTypes.mechanicType : null;
    },
  },
    mounted(){
    if(!this.$store.state.token){
      this.$router.push('/login');
    }
     this.getAccount();
     this.campaignType=='collect_to_redeem' && this.getListWallet();
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
