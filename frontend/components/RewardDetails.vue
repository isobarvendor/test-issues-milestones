<template>
  <div class="reward-details">
      <div class="back-icon">
           <img v-if="$mq == 'xl'" src="/img/icons/back.png"/>
           <img v-if="$mq == 'sm' || $mq == 'md' || $mq == 'lg'" src="/img/icons/close.png"/>
      </div>
     <div class="reward-body">
         <div class="title"> 
          <h3>Manchester United 19/20 Official Jersey</h3>
         </div>
         <p>Get checked out with the latest jersey design for Manchester United FC</p>
         <div class="redeem-expiry"> 
             <h4>Expiry Date</h4>
             <p>31 December 2020</p>
         </div>
         <div class="redeem-expiry"> 
             <h4>How To  Redeem</h4>
             <p>Head down to an Adidas outlet near you to collect your official jersey.</p>
         </div>
         <a class="button rewards-bottom"> Redeem (50 coins)</a>
    </div>
    <div class="image-fluid"> 
        <img src="/img/rewards/full-jersey.png"/>
        <a v-if="$mq == 'sm' || $mq == 'md'" class="button center mobile"> Redeem (50 coins)</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RewardDetails",
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
.reward-details{
    display: flex;
    flex-direction: row;
    width: 100%;
    .back-icon{
        display: flex;
        align-self: flex-start;
        margin: 120px 0;
        width:25%;
        justify-content: flex-end;
    }    
    .reward-body{
        display: flex;
        flex-direction: column;
        width: 70%;
        margin: 120px 0px;
        padding: 0px 15px;
        .title{
            font-size: 30px;   
            margin-bottom: 40px;
        }
        .redeem-expiry{
            margin-top: 60px;
            border-bottom: 1px solid #585858;
            width: 70%;
            h4{
                font-size: 25px;
                margin-bottom: 30px;
            }
            p{
                padding-bottom: 30px
            }
        }
    }
    .image-fluid{
        img{
            height: 100vh;
        }
    }
    a.button.rewards-bottom{
        margin-top: 30px;
    }
    @media only screen and (max-width: 1199px) {
        flex-direction: column-reverse;
        width: 100%;
        position: relative;
        p{
            line-height: 24px;
        }
        .reward-body{
            width:100%;
            margin-top: 45px;
            margin-bottom: 0px;
            .title{
                font-size: 20px;   
                margin-bottom: 20px;
            }
            .redeem-expiry{
                margin-top: 40px;
                border-bottom: 1px solid #585858;
                width: 100%;
                h4{
                    font-size: 20px;
                    margin-bottom: 20px;
                }
                p{
                    padding-bottom: 20px;
                    line-height: 24px;
                }
            }
        }
        .image-fluid{
            img{
                height: auto;
                width: 100%;
            }
        }
        a.button.rewards-bottom{
            margin:auto;
            margin-top:40px;
        }
        a.button.rewards-bottom{
            margin:auto;
            margin-top:40px;
        }
        a.button.mobile{
            margin:auto;
            margin-top:-80px;
            position: relative;
            z-index: 10;
        }
        .back-icon{
            position: absolute;
            top: 0px;
            right:0px;
            margin-top: 10px;
        }
    }
}
</style>
