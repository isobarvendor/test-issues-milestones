<template>
    <div class="congrats">
        <h3> Congratulations! </h3>
            <div class="input-container">
                <div class="value"> 
                    5 <span>coins</span>
                </div>
            </div>
            <div class="desc">
                <p>have been added to your wallet</p>
                <p class="code">Enter another code </p>
            </div>
            <div class="button-container">
                <a  class="button">Close</a>
            </div>
    </div>
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
  },
  methods:{
  },
  beforeMount() {},
  mounted(){

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
        width: 160px;
        height: 160px;
        border-radius: 80px;
        background: #FFC529;
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
