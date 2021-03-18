<template>
 <div class="prize-inner-wrapper" v-if="questions">
   <h3>Question {{questionNo}}</h3><BR/><BR/><BR/>
   <div class="prize-title">
     <h1 v-html="currentQuestion.question"></h1><BR/><BR/>
   </div>
  <div class="answer-area center-layout">
      <v-radio-group v-model="currentAnswer"  dark>
        <v-radio
           v-for="(o,index) in  currentQuestion.answers"
          :key="index"
          :label="`${o.answer}`"
          :value="o.id"
        ></v-radio>
      </v-radio-group>
   </div>

   <div class="prize-button-area center">
        <v-btn v-if="questionNo<this.questions.length" @click="nextQuestion"  >
          {{submissionText.nextQuestion}}
        </v-btn>
        <v-btn v-else @click="submit"   >
          {{submissionText.submit}}
        </v-btn>
   </div>

 </div>
</template>

<script>
import {translation} from "@/constants/index"
export default {
    name:"PrizeQuestion",
    props:{
      questions:{}
    },
    data(){
      return {
        submissionText:translation.submissionText,
        questionNo:1,
        currentAnswer:'',
        answers:[]
      }
    },
    computed:{
      currentQuestion(){
        return this.questions[this.questionNo-1];
      }
    },
    mounted(){


    },
    methods:{
      nextQuestion(){
       this.questionNo=this.questionNo+1;
      },
      submit(){
        this.$emit("submit");
      }
    }
}
</script>

<style>

.prize-button-area a{
    text-decoration: none;
}
.answer-area{
  width: 230px;
  margin: auto;
  margin-bottom: 30px;
}
.answer-area .v-label{
  padding-left: 10px !important;
  color: #fff !important;
}


</style>
