<template>
  <div  class="congratulations">
    <div class="wrapper">
      <div class="container">
        <Congrats />
      </div>

    </div>
  </div>
</template>

<script>
import Congrats from '@/components/Congrats'
import { GET_LIST_WALLET} from '@/store/action_types';
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
  methods: {
     getListWallet(){
          this.$store.dispatch(GET_LIST_WALLET)
                .then((response)=>{
                })
                .catch((error) =>{
                  if(error.response && error.response.data.status=='401'){
                    localStorage.clear();
                  }
                })


     }
  },
  mounted(){
     this.getListWallet();
  }
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    .congratulations{
        .container{
            position: absolute;
            top: 30%;
        }
    }
    @media only screen and (max-width: 767px) {

    }
  }

</style>
