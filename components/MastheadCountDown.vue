<template>
  <div id="masthead-countdown">
      <vac :end-time="endDate" @finish="finishCall" class="center">
        <span class="coundown-text"
          slot="process"
          slot-scope="{ timeObj }">
           <v-row no-gutters class="number-area">
              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.d)" /><span class="dot">:</span>
              </v-col>

              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.h)" /><span class="dot">:</span>
              </v-col>

              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.m)" /><span class="dot">:</span>
              </v-col>

              <v-col  cols="3">
                <span v-html="addNumberClass(timeObj.s)" />
              </v-col>
            </v-row>
         </span>
          <span class="coundown-text"
          slot="finish"
          >
           <v-row no-gutters class="number-area">
              <v-col  cols="3">
                <span v-html="addNumberClass('0')" /><span class="dot">:</span>
              </v-col>

              <v-col  cols="3">
                <span v-html="addNumberClass('00')" /><span class="dot">:</span>
              </v-col>

              <v-col  cols="3">
                <span v-html="addNumberClass('00  ')" /><span class="dot">:</span>
              </v-col>

              <v-col  cols="3">
                <span v-html="addNumberClass('00  ')" />
              </v-col>
            </v-row>
         </span>
      </vac>
      <v-row no-gutters>
        <v-col  cols="3">
          DAYS
        </v-col>

        <v-col  cols="3">
          HRS
        </v-col>

        <v-col  cols="3">
          MINS
        </v-col>
         <v-col  cols="3">
          SCCS
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
  computed:{
    endDate(){
      return this.data ?  new Date(this.data).getTime() : new Date().getTime() + 36000 ;
    }
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
       if(arrayText.length<2){
        newtext+="<span class='countdown-number'>0</span>";
       }
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
  width:365px;
  height:135px;
  background-image: url("/img/landing/countdown box.png");
  background-repeat: no-repeat;
  margin: auto;
  position: absolute;
  bottom: 60px;
  left: 0px;
  right: 0px;
  padding: 0px;
  padding-left: 0px;
  text-align: center;
}
.coundown-text{
  font-size:43px;
}
.number-area{
  margin-top: 15px !important;
  margin-bottom: 15px !important;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;


}
.countdown-number{
  background: #303030;
  border:solid 1px #000;
  margin-left: 3px;
  padding: 2px;
   -moz-box-shadow:    inset 0 0 10px #000000;
   -webkit-box-shadow: inset 0 0 10px #000000;
   box-shadow:         inset 0 0 10px #000000;
     max-width: 30px;

}
.dot{
  padding-left: 2px;
  padding-right: 2px;
}
</style>
