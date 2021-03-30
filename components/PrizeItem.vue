<template>
 <div class="prize-inner-wrapper">
      <div class="prize-background-two" v-if="themes==2">
                   <img src="/img/landing/Dots.png" width="110%"/>
               </div>
   <div class="prize-title" v-html="prize.text">

   </div>
   <div class="prize-content">
       <v-row no-gutters v-if="prize.name">
           <v-col cols="4">
                <div class="image-placeholder">
                    <img :src="prize.image" width="100%"   />
                </div>
           </v-col>
           <v-col cols="8" class="prize-desc-wrapper">
               <div class="prize-background">
                   <img src="/img/landing/prize-dot.png" width="100%"/>
               </div>
               <div class="prize-desc">
                <div class="desc-text">
                    <h1>{{prize.name}}</h1>
                    <small v-if="prize.subName">{{prize.subName}}</small>
                    <p v-if="prize.code">Code: {{prize.code}}
                    </p>
                    <div v-if="prize.code"  @click="copyVoucher" >
                       <v-row  v-if="prize.name" class="copyClipboard center-layout">
                        <v-col cols="2">
                        <img src="/img/landing/copy.svg" style="padding-left:2px"    width="30" />
                        </v-col>
                        <v-col cols="10" > Copy code </v-col>
                       </v-row>
                       <span v-if="successCopy">Copied!</span>
                     <input type="hidden" id="voucherCode" :value="prize.code"/>
                    </div>

                </div>
               </div>
           </v-col>
       </v-row>
         <v-row no-gutters v-if="!prize.name&&themes==2">
           <v-col cols="12">

                    <img :src="prize.image" width="200px" />

           </v-col>

       </v-row>
   </div>
   <div class="prize-note" v-html="prize.note" v-if="themes==1">
   </div>
   <div class="prize-note-two" v-html="prize.note" v-if="themes==2">
   </div>
   <div class="prize-button-area center">
      <audio controls v-if="playSound">
          <source :src="audio" type="audio/mpeg">
        </audio>
        <v-progress-circular
        :width="2"
        color="white"
        indeterminate
        v-if="loading"
      ></v-progress-circular>
      <div v-else style="margin-bottom:40px;"  v-for="(btn,index) in prize.button" :key="index" >
       <a v-if="btn.link&&btn.link.includes('.mp3')" :id="'prize-'+btn.id" :href="'#prize-chance'"  @click="redeemMusic(btn.link)"  >
        <v-btn  v-html="btn.text">
        </v-btn>
       </a>
       <a v-else :id="'prize-'+btn.id" :href="btn.link ?btn.link : '#prize-chance'" :target="btn.link ? '_blank' : ''" @click="submitPrize(btn.type)"  >
        <v-btn  v-html="btn.text">
        </v-btn>
       </a>
      </div>
   </div>
    <div class="prize-button-area center" id="participateAgain" v-if="prize.isPlayAgain">
          <v-btn @click="playAgain">{{submissionText.participateAgain}}</v-btn>
    </div>
 </div>
</template>

<script>
import {translation} from "@/constants/index"
export default {
    name:"PrizeItem",
    props:{
      prize:{},
      themes:null,
      loading: false,
    },
    data(){
      return {
        submissionText:translation.submissionText,
        successCopy:false,
        playSound:false,
        audio:false
      }
    },
    computed:{

    },
    mounted(){


    },
    methods:{
      copyVoucher(){
         let testingCodeToCopy = document.querySelector('#voucherCode')
          testingCodeToCopy.setAttribute('type', 'text')
          testingCodeToCopy.select()
          try {
            var successful = document.execCommand('copy');
            if(successful){
              this.successCopy=true;
            }

          } catch (err) {

          }
          testingCodeToCopy.setAttribute('type', 'hidden')
          setTimeout(() => {   this.successCopy=false; }, 2000);
          window.getSelection().removeAllRanges()
      },
      playAgain(){
        console.log('tesplay');
        this.$emit("playAgain");
      },
      redeemMusic(link){
        this.audio=link;
        this.playSound=true;
      },
      submitPrize(type){
        if(type=='submission'){
          this.$emit('submitPrize');
        }else{
          return false
        }
      }
    }
}
</script>

<style>
.prize-button-area a{
    text-decoration: none;
}
.copyClipboard{
  max-width: 160px !important;
  margin: auto;
  cursor: pointer;
}

.image-placeholder{
    min-height: 300px;
}
     @media only screen and (max-width: 600px) {

         .image-placeholder{
    min-height: 100px;
}
     }
audio{
  margin-bottom: 20px;
  max-width:300px;

}
</style>
