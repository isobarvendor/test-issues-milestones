<template>
 <div class="prize-inner-wrapper" v-if="questions">
   <!--h3>Question {{questionNo}}</h3--><BR/><BR/><BR/>
   <div class="prize-title">
     <h1 v-html="currentQuestion.question"></h1><BR/><BR/>
   </div>
  <div class="answer-area center-layout">
      <v-radio-group v-model="currentAnswer" v-validate="'required'" name="answer"  dark>
        <v-radio
           v-for="(o,index) in  currentQuestion.answers"
          :key="index"
          :label="`${o.answer}`"
          :value="o.answer"
        ></v-radio>
      </v-radio-group>
   </div>
    <div class="error-message">{{ errors.first('answer') }}</div>
     <div style="padding:20px" class="prize-button-area center"  v-if="loading">
      <v-progress-circular
        :width="2"
        color="white"
        indeterminate

      ></v-progress-circular>
      </div>
   <div class="prize-button-area center" v-else>
        <!--v-btn v-if="questionNo<this.questions.length" @click="nextQuestion"  >
          {{submissionText.nextQuestion}}
        </v-btn-->
        <v-btn @click="submit" id="submitQuestion"   >
          {{submissionText.submit}}
        </v-btn>
   </div>


 </div>
</template>

<script>
import {translation} from "@/constants/index"
export default {
    name:"PrizeQuestion",
    inject: ['$validator'],
    props:{
      questions:{},
      loading:false
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
        return this.questions[0];
      }
    },
    mounted(){


    },
    methods:{
      nextQuestion(){
       this.questionNo=this.questionNo+1;
      },
      submit(){
        this.$validator.validateAll().then( async(valid) => {
            if(valid){
              let data={
                question:this.currentQuestion.question,
                answer:this.currentAnswer
              }
            this.$emit("submit",data);
            }
       });
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
.error-message{
  color:red;
  padding-bottom: 30px;
}


</style>
