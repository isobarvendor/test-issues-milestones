<template>
  <client-only>
    <div class="congrats" v-if="redeemPrize">

        <h3> Congratulations! </h3>
            <div class="input-container">
                <img :src="redeemPrize.imgUrl" />
            </div>
            <div class="desc">
                <p>Reward has been successfully redeemed<br/>and added to your wallet!</p>
            </div>
            <div class="button-container">
                <a  class="button" href="#" onclick="window.history.back()">back to reward list</a>
            </div>
    </div>
</client-only>
</template>

<script>
export default {
  name: "Congrats",
  components: {
  },
  data() {
    return {
    };
  },
  props: {
    data: null,
  },
  computed:{
     redeemPrize(){
      return this.$store.state.redeemPrize ? this.$store.state.redeemPrize.redeemedPrize : null;
    }
  },
  methods:{
  },
  beforeMount() {},
  mounted(){
    if(!this.$store.state.redeemPrize){
      location.href="/";
    }
  },
  beforeDestroy(){
    //this.$store.commit('SET_REDEEM_PRIZE',null);
  }
};
</script>

<style lang="scss">
.congrats{
    display: flex;
    align-items: center;
    flex-direction: column;
    .theme--light.v-application{
        background: none !important;
    }
    .v-application--wrap{
        min-height:auto !important;
        display: flex;
        flex-direction: row;
    }
    .v-application .primary--text{
        caret-color: #ffffff !important;
    }
    .theme--light.v-input{
        width: 25px;
        margin-right: 15px;
        &:last-child{
            margin-right: 0px;
        }

    }

    .theme--light.v-input input{
        color: white;
        text-align: center;
    }
    .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
        border-color: #585858;
    }
    .mdi:before, .mdi-set{
        color: white;
    }
    .input-container{
        margin-top: 30px;
        max-width: 250px;
        justify-content: center;
        align-items: center;
        display:flex;
        .value{
            font-size: 50px;
            span{
                font-size: 13px;
                display: block;
            }
        }
        img{
          width: 100%;
        }
    }
    .desc{
        p{
            margin-top: 30px;
            text-align: center;
            &.code{
                color: #585858;
                font-size: 14px;
            }
        }

    }
    @media only screen and (max-width: 1199px) {

    }
}
</style>
