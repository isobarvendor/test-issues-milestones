<template>
    <div class="coin-detail">
        <h3> Enter Code </h3>
            <div class="input-container">
                <v-app id="inspire" style="">
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                    <v-text-field color="white"></v-text-field>
                </v-app>
            </div>
            <div class="button-container">
                <a  class="button">Collect</a>
            </div>
    </div>
</template>

<script>
export default {
  name: "CoinDetail",
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
  },
  methods:{
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.coin-detail{
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
        margin-top: 40px
    }
    @media only screen and (max-width: 1199px) {
          
    }  
}
</style>
