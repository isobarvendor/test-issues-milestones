<template>
 <div class="prize-inner-wrapper" :id="prize.prizeType">
      <div class="prize-background-two" v-if="themes==2">
                   <img src="/img/landing/Dots.png" width="110%"/>
               </div>
   <div class="prize-title" v-html="prize.text">

   </div>
   <div :class="prize.luckyDraw ? 'prize-content prize-lucky-draw' : 'prize-content'">
       <v-row no-gutters v-if="prize.name">
           <v-col :cols="prize.luckyDraw ? '5': '4'">
                <div class="image-placeholder">
                    <img :src="prize.image" width="100%"   />
                </div>
           </v-col>
           <v-col :cols="prize.luckyDraw ? '7': '8'" class="prize-desc-wrapper">
               <div class="prize-background">
                   <img src="/img/landing/prize-dot.png" width="100%"/>
               </div>
               <div class="prize-desc">
                <div class="desc-text">
                    <h1 v-html="prize.name"></h1>
                    <small v-if="prize.subName">{{prize.subName}}</small>
                    <p v-if="prize.code">Code: {{prize.code}}</p>
                    <div v-if="prize.code"  @click="copyVoucher" >
                       <v-row  v-if="prize.name" class="copyClipboard center-layout">
                        <v-col cols="2">
                        <img src="/img/landing/copy.svg" style="padding-left:2px"    width="30" />
                        </v-col>
                        <v-col cols="10" >Copy to clipboard</v-col>
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
       <a :href="btn.link" target="_blank" :id="btn.id"  v-for="(btn,index) in prize.button" :key="index" >
        <v-btn  v-html="btn.text">
        </v-btn>
       </a>
   </div>
    <div class="prize-button-area center"  style="margin-top:40px;">
          <v-btn @click="playAgain" :id="'Participate_Again_'+prize.prizeType">{{submissionText.participateAgain}}</v-btn>
    </div>
 </div>
</template>

<script>
import {translation} from "@/constants/index"
export default {
    name:"PrizeItem",
    props:{
      prize:{},
      themes:null
    },
    data(){
      return {
        submissionText:translation.submissionText,
        successCopy:false
      }
    },
    computed:{

    },
    mounted(){


    },
    methods:{
        copyVoucher(){
       //  console.log('tes')
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
      }
    }
}
</script>

<style>
.prize-button-area a{
    text-decoration: none;
}
.prize-chance .wrapper .prize-inner-wrapper .prize-content.prize-lucky-draw .prize-desc-wrapper .prize-desc .desc-text
{
  font-size: 15px !important;
  margin: 0px !important;
}
.prize-chance .wrapper .prize-inner-wrapper .prize-content.prize-lucky-draw .prize-desc-wrapper .prize-desc
{
  max-width: 400px;
}
.prize-chance .wrapper .prize-inner-wrapper .prize-content.prize-lucky-draw .image-placeholder{
  padding-top: 5px;
}

.image-placeholder{
    min-height: 300px;
}
.copyClipboard{
  max-width: 280px;
  margin: auto;
  cursor: pointer;
}

     @media only screen and (max-width: 600px) {

         .image-placeholder{
    min-height: 100px;
}
     }

</style>
