<template>
    <div>
  <div   class="container prize-chance black-red-border">
    <div class="wrapper">
        <PrizeItem :prize="prize[0]" :themes="1" />
      </div>
  </div>
  <div   class="container prize-chance black-red-border">
    <div class="wrapper">
        <PrizeItem :prize="prize[1]" :themes="1" />
      </div>
  </div>
  <div   class="container prize-chance black-red-border">
    <div class="wrapper">
        <PrizeItem :prize="prize[2]" :themes="1" />
      </div>
  </div>
  <div   class="container prize-chance black-red-border">
    <div class="wrapper">
        <PrizeItem :prize="prize[3]" :themes="1" />
      </div>
  </div>
  <div class="container prize-chance black-background joox-section"  >
      <div class="background-image-joox">
      <img src="/img/landing/back-dots.png" />
    </div>
    <div class="desc-joox">
        <h1>Listen to our specially curated <BR/>Coca-Cola & Joox playlist.</h1>
        <p>This will open a new browser to joox</p>
        <div class="joox-listen">
            <v-btn >Listen now</v-btn>
        </div>
    </div>
  </div>
  <div   class="container prize-chance black-background">
    <div class="wrapper">
        <PrizeItem :prize="prize[4]" :themes="2" />
      </div>
  </div>
  <Footer v-if="CMSContent" :data="CMSContent[0].footer"  />
    </div>
</template>


<script >
import PrizeItem from '../components/PrizeItem'



export default {
  name:"prizeitem",
  components:{
    PrizeItem
  },
  data(){
    return{
        prize:[
           {
            text : "<h2>You have entered the Entry Code from Coca-Cola 300ml PET bottle and Coca Cola 235 ml can, you will have 2 lucky draw opportunities</h2>"
            ,name:null
            ,note:null
            ,image:null
            ,havejoox:false
            ,button:[{
                text:"Start redeeming"
            }],
            code:null,
            subName:null
           },
             {
                 text : "<h2>Congratulations!<BR/> You just won</h2><h1> Prize 1 of 2</h1>",
                 name : "EXCLUSIVE COKE STUDIO T-SHIRT, RED",
                 image:"/img/landing/week 1 prize.png",
                 note : "Please call 1900 5555 584 (VND 1500/min, from 9:00 to 17:00, weekdays) to recieve redeem instruction. <BR/> Prize must be redeemed by Jul 20,21"
                ,button:[{
                    text:"Redeem Next Prize"
                }]
                ,havejoox:false,
                code:null,
                subName:null
             },
            {
                 text : "<h2>Congratulations!<BR/> You just won</h2><h1> Prize 1 of 2</h1>"
                 ,image:"/img/landing/week 1 prize.png"
                 ,note : "Activate ZaloPay voucher with the code above"
                ,name : "ZALO PAY VOUCHERS"
                    ,button:[{
                        text:"Activate Zalo Pay <BR/> Vouchers Now"
                    }]
                    ,havejoox:false,
                code:"C6Dkv76",
                subName:"woth VND 2000,000"
           },
            {
                 text : "<h2>Congratulations!<BR/> You just won</h2><h1> Prize 1 of 2<h1>"
                 ,image:"/img/landing/week 1 prize.png"
                 ,note : "Please access the link below to enjoy/listen"
                ,name : "ACCESS TO EXCLUSIVE MP3 TRACK BY DUA LIPA"
                    ,button:[{
                        text:"Redeem Song"
                    }]
                    ,havejoox:true,
                    code:null,
                subName:null
           },
             {
                 text : "<h2>Song added to library</h2>"
                 ,image:"/img/landing/week 1 prize.png"
                 ,name : null
                 ,note : "Come back and listen to the song by going to your wallet"
                    ,button:[{
                        text:"Redeem Next Prize"
                    }]
                    ,havejoox:false,
                    code:null,
                subName:null
           }


        ]
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
  props: {

  },
  mounted(){
  
  },

  methods:{
 


  },
  computed: {
    CMSContent(){
            return this.$store.getters.getCMSContent;
        }
  },

}
</script>
<style scoped>
 .prize-chance.joox-section{
     padding-top: 80px;
     text-align: center;
    min-height: 380px !important;
 }
.prize-chance .background-image-joox{
    position: absolute;
    top:0px;

    z-index: 0;
}
.prize-chance .background-image-joox img{
    width:100%;
}
.desc-joox{
    z-index: 1;
}
.joox-listen{
    padding-top: 50px;
}
.joox-listen .v-btn:not(.v-btn--round).v-size--default{
    padding:30px;
    font-weight: bold;
}
    
</style>