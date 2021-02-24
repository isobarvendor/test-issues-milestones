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
                 <div class="tagline" v-html="howData.title"></div>
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
              {{periodDescription}}
          </div>

           <v-row no-gutters   >
               <v-col
                  cols="12"
                  md="4"
                  sm="12"
                   v-for="(item, idx) in howData.slides" :key="'steps'+idx"
                >
                    <v-row no-gutters  class="center-layout" >
                      <v-col
                          cols="5"
                          md="12"
                          sm="5"
                          class="participate-image-container"
                        >
                          <img v-if="$mq == 'sm'&&item.mobileImage.length>0" :src="item.mobileImage[0].url" class="participate-image" />
                          <img v-else-if="item.desktopImage.length>0&&$mq !== 'sm'" :src="item.desktopImage[0].url" class="participate-image" />
                          <img v-else :src="'/img/landing/drink.png'" />
                        </v-col>

                        <v-col
                          cols="7"
                          md="12"
                          sm="7"
                          class="participate-text-container"
                        >
                         <span v-html="item.description" />

                        </v-col>
                  </v-row>

                </v-col>

          </v-row>
            <div v-if="loginInfo" v-html="howData.description" class="description"></div>

      </v-col>
    </v-row>



  </div>
</template>

<script>
import moment from "moment";
import {translation} from "@/constants/index"
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
      periodDescription:translation.periodDescription
    };
  },
  computed:{
    startdate (){
        return this.data && moment(this.data.fromDate).format("Do MMMM YYYY")
    },
    enddate (){
      return this.data && moment(this.data.toDate).format("Do MMMM YYYY");
    },
    loginInfo(){
       return this.$store.state.login;
    }


  }
  ,
  props: {
    data: null,
    howData:{}
  },
  beforeMount() {

  }
};
</script>

<style>
.campaign-period-section .description{
  text-align: center;
}
</style>
