<template>
  <div id="masthead-countdown">
      <vac :end-time="new Date().getTime() + 910000000" @finish="finishCall">
        <span class="coundown-text"
          slot="process"
          slot-scope="{ timeObj }">
           <v-row no-gutters class="number-area">
              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.d)" />
              </v-col>
               <v-col  cols="1">
                :
              </v-col>
              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.h)" />
              </v-col>
               <v-col  cols="1">
                :
              </v-col>
              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.m)" />
              </v-col>
            </v-row>
         </span>
      </vac>
      <v-row no-gutters>
        <v-col  cols="3">
          DAYS
        </v-col>
        <v-col  cols="1"></v-col>
        <v-col  cols="3">
          HRS
        </v-col>
        <v-col  cols="1"></v-col>
        <v-col  cols="3">
          MINS
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "MastheadCountdown",
  props: {
    data: null,
  },
  data() {
    return {
      
    }
  },
  mounted() {
    // this.loadMasthead()
    // window.addEventListener('resize', this.loadMasthead)
  },
  methods: {
   finishCall(){
     window.location.reload();
     this.$store.commit('SET_CAMPAIGN_STARTED',true);
   },
   addNumberClass(text){
     let arrayText = text.split("");
     let newtext="";
     for(let a=0;a<arrayText.length;a++ ){
       newtext+="<span class='countdown-number'>"+arrayText[a]+"</span>";
     }
     return newtext;

   }
  },
  mounted() {

  },
};
</script>

<style>
#masthead-countdown{
  width:330px;
  height:120px;
  background-image: url("/img/landing/countdown box.png");
  margin: auto;
  position: absolute;
  bottom: 60px;
  left: 0px;
  right: 0px;
  padding: 5px;
  padding-left: 20px;
  text-align: center;
}
.coundown-text{
  font-size:49px;
}
.number-area{
  margin-top: 15px;
  margin-bottom: 5px;
  padding-right: 10px;
}
.countdown-number{
  background: #303030;
  border:solid 1px #000;
  margin-left: 3px;
  padding: 2px;
   -moz-box-shadow:    inset 0 0 10px #000000;
   -webkit-box-shadow: inset 0 0 10px #000000;
   box-shadow:         inset 0 0 10px #000000;
}
</style>
