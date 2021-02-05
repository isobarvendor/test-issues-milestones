<template>
  <div id="masthead-countdown">
      <vac :end-time="new Date().getTime() + 20000000" @finish="finishCall">
        <span class="coundown-text"
          slot="process"
          slot-scope="{ timeObj }">
           <v-row no-gutters>
              <v-col  cols="3">
                {{ `${timeObj.d}` }}
              </v-col>
               <v-col  cols="1">
                :
              </v-col>
              <v-col  cols="4">
                {{ `${timeObj.h}` }}
              </v-col>
               <v-col  cols="1">
                :
              </v-col>
              <v-col  cols="3">
                {{ `${timeObj.m}` }}
              </v-col>
            </v-row>
         </span>
      </vac>
      <v-row no-gutters>
        <v-col  cols="3">
          DAYS
        </v-col>
        <v-col  cols="1"></v-col>
        <v-col  cols="4">
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
   }
  },
  mounted() {

  },
};
</script>

<style>
#masthead-countdown{
  width:300px;
  height:109px;
  background-image: url("/img/landing/countdown box.png");
  margin: auto;
  position: absolute;
  bottom: 60px;
  left: 0px;
  right: 0px;
  padding: 5px;
  text-align: center;
}
.coundown-text{
  font-size:52px;
}
</style>
