<template>
  <div class="container campaign-period-section redbox-withwhiteborder ">
    <v-row no-gutters>
      
      <v-col
        cols="12"
        sm="12"
        md="4"
      >
 
          <v-row no-gutters class="logo-title">
               <v-col
                  cols="4"
                  md="12"
                  sm="4"
                >
                  <img src="/img/landing/COKE STUDIO.png" class="logo"  />
                </v-col>

                <v-col
                  cols="8"
                  md="12"
                  sm="8"
                  class="participate-text-container"
                >
                 <div class="tagline">TURN UP YOUR RYTHM</div> 
                </v-col>
          </v-row>
      
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
        class="desc-container"
      >
          <div class="periode-container">
            <p>{{this.data.Title}}</p>
            <p class="campaign-period" v-html="startdate+' – '+enddate"></p>
          </div>
          <div class="period-desc-container">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
          </div>
           <v-row no-gutters >
               <v-col
                  cols="12"
                  md="4"
                  sm="12"
                >
                    <v-row no-gutters  class="center-layout" >
                      <v-col
                          cols="5"
                          md="12"
                          sm="5"
                          class="participate-image-container"
                        >
                          <img src="/img/landing/drink.png" class="participate-image"  />
                        </v-col>

                        <v-col
                          cols="7"
                          md="12"
                          sm="7"
                          class="participate-text-container"
                        >
                        <h1>Drink</h1>
                        <p>Buy a Coca-Cola product and drink it!</p> 
                        </v-col>
                  </v-row>
      
                </v-col>
                 <v-col
                  cols="12"
                  md="4"
                  sm="12"
                >
                    <v-row no-gutters class="center-layout">
                      <v-col
                          cols="5"
                          md="12"
                          sm="5"
                          class="participate-image-container"
                        >
                          <img src="/img/landing/scan.png" class="participate-image"   />
                        </v-col>

                        <v-col
                          cols="7"
                          md="12"
                          sm="7"
                          class="participate-text-container"
                        >
                          <h1>Scan</h1>
                          <p>Scan the QR code on the pack</p> 
                        </v-col>
                  </v-row>
      
                </v-col>
                 <v-col
                  cols="12"
                  md="4"
                  sm="12"
                >
                    <v-row no-gutters class="center-layout" >
                      <v-col
                          cols="5"
                          md="12"
                          sm="5"
                          class="participate-image-container"
                        >
                          <img src="/img/landing/listen.png" class="participate-image"   />
                        </v-col>

                        <v-col
                          cols="7"
                          md="12"
                          sm="7"
                          class="participate-text-container"
                        >
                          <h1>Listen</h1>
                          <p>Enter the unique code from your pack in the form bellow, and win Joox VIP and other prizes</p> 
                        </v-col>
                  </v-row>
      
                </v-col>

                
          </v-row>
         
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
import moment from "moment";
moment.locale('en', {
    ordinal: num => {
        const b = num % 10;
        const output = (~~(num % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                    (b === 3) ? 'rd' : 'th';
        return num + '<sup>' + output + '</sup>';
    },
});

export default {
   name: "CampaignPeriod",
  data() {
    return {

    };
  },
  computed:{
    startdate (){
        return this.data && moment(this.data.fromDate).format("Do MMMM YYYY")
    },
    enddate (){
      return this.data && moment(this.data.toDate).format("Do MMMM YYYY");
    }
  }
  ,
  props: {
    data: null
  },
  beforeMount() {

  }
};
</script>

<style>

</style>
