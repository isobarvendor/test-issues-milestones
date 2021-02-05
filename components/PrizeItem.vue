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
                <img :src="prize.image" width="100%" />
           </v-col>
           <v-col cols="8" class="prize-desc-wrapper">
               <div class="prize-background">
                   <img src="/img/landing/prize-dot.png" width="100%"/>
               </div>
               <div class="prize-desc">
                <div class="desc-text">
                    <h1>{{prize.name}}</h1>
                    <small v-if="prize.subName">{{prize.subName}}</small>
                    <p v-if="prize.code">Code: {{prize.code}}</p>
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
       <v-btn v-for="(btn,index) in prize.button" :key="index" v-html="btn.text"> 
            
       </v-btn>
   </div>
 </div>
</template>

<script>
export default {
    name:"PrizeItem",
    props:{
      prize:{},
      themes:null
    },
    data(){
      return {
      }
    },
    computed:{
      
    },
    mounted(){


    }
}
</script>

<style>

</style>
