<template>
  <div class="reward-details" v-if="data">
      <div class="back-icon">
         <img  @click="back()" v-if="$mq == 'xl'" src="/img/icons/back.png" />
           <img v-if="$mq == 'sm' || $mq == 'md' || $mq == 'lg'" src="/img/icons/close.png"/>
      </div>
     <div class="reward-body" >
         <div class="title">
          <h3>{{data.name}}</h3>
         </div>
         <p v-html="data.description"></p>
         <div class="redeem-expiry">
             <h4>Expiry Date</h4>
             <p v-html="data.shortDescription"></p>
         </div>
         <div class="redeem-expiry">
             <h4>How To  Redeem</h4>
             <p v-html="data.redeemDescription"></p>
         </div>
         <div class="error-message" v-if="errorMessage" v-html="errorMessage"></div>
         <div class="success-message" v-if="successMessage" v-html="successMessage"></div>
         <a class="button rewards-bottom" @click="redeemPrize(data.prizeId)"> Redeem ({{data.amountAvailable}} coins)</a>

    </div>
    <div class="image-fluid">
        <img :src="data.imgUrl"/>
        <a v-if="$mq == 'sm' || $mq == 'md'" class="button center mobile" @click="redeemPrize(data.prizeId)"> Redeem ({{data.amountAvailable}}  coins)</a>
    </div>

  </div>
</template>

<script>
import {REDEEM_PRIZE} from '@/store/action_types';
export default {
  name: "RewardDetails",
  components: {
  },
   props: {
    data: null,
  },
  data() {
    return {
      errorMessage:null,
      successMessage:null
    };
  },

  computed:{
  },
  methods:{
    back(){
      this.$router.replace('/rewards');
    },
    redeemPrize(prizeId){
      let request = {"prizeId":prizeId};
      this.$store.dispatch(REDEEM_PRIZE,request).then((response)=>{
         this.errorMessage=null;
         this.successMessage="Congratulations you already redeemed this prize";
       }).catch(error=>{
         if(error.response && error.response.data.status=="401"){
           localStorage.clear();
         }else{
            this.errorMessage="Sorry you can not redeem this prize";
         }
       })
    }

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
    .error-message{
      color:red;
      margin-top: 30px;
    }
    .success-message{
      color:green;
      margin-top: 30px;
    }
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
