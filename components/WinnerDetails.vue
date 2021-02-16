<template>
  <div class="winner-details container redbox-withwhiteborder">
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
                 <div class="tagline">{{howData.title}}</div>
                 <BR/>
                 <BR/>

                </v-col>
          </v-row>
          <v-row no-gutters class="logo-title">
                    <h1>WINNER LIST</h1><BR/><BR/><BR/>
                    <h2 v-if="!showWinnerDetail">WEEKLY & MONTHLY <BR/> LUCKY DRAW PRIZES</h2>
                    <h2 v-else>WEEK {{winnerWeek}} LUCKY DRAW</h2>
            </v-row>

      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
        class="desc-container"
      >
              <div class="close-icon" @click="close">
           <img src="/img/icons/close.png"/>
      </div>
     <div class="winner-body" v-if="!showWinnerDetail">
         <div class="first-box box"  @click="weekly=!weekly">
             <div class="week">
                Weekly winners
              </div>
              <div class="date">
                  10 Jan-23 Jan
              </div>
              <div class="button-carousel">
                  <span v-if="!weekly">+</span>
                  <span v-else>-</span>
              </div>
         </div>
        <transition name="slide">
          <div v-if="weekly" >
         <div class="two-container weekly"   v-for="(item, index) in winnerListsSecond"
          :key="'winner'+index"   >
             <div class="second-box box"  v-for="(item2, index2) in item"  :key="'winners'+index2"   @click="showWinners(item2.week)" >
                 <div class="week">
               Week {{item2.week}}
              </div>
              <div class="date">
                {{ item2.fromDate}} -  {{item2.toDate}}
              </div>
             </div>
         </div>
          </div>
        </transition>
         <div class="next-draw">
           <h2>NEXT DRAW ON 7TH MARCH</h2>
         </div>
            <div class="first-box box"   @click="monthly=!monthly">
            <v-row no-gutters>
              <v-col cols="6" >
                <div class="week">
                    Monthly winners
                  </div>
                  <div class="date">
                      10 Jan-23 Jan
                  </div>
              </v-col>
              <v-col cols="6" >
                  <h3>ANNOUNCE ON <BR/> 31TH MARCH 2021</h3>
              </v-col>
            </v-row>
            <div class="button-carousel">
                  <span v-if="!monthly">+</span>
                  <span v-else>-</span>
              </div>
         </div>
         <transition name="slide">
          <div v-if="monthly" >
          <div class="two-container monthly"   v-for="(item, index) in winnerListsSecond"
            :key="'winner'+index"   >
              <div class="second-box box"  v-for="(item2, index2) in item"  :key="'winners'+index2"   @click="showWinners(item2.week)" >
                  <div class="week">
                Week {{item2.week}}
                </div>
                <div class="date">
                  {{ item2.fromDate}} -  {{item2.toDate}}
                </div>
              </div>
          </div>
        </div>
         </transition>
        <!--a v-if="$mq == 'sm' || $mq == 'md'" class="button rewards-bottom"  @click="close"> Back to promotion</a-->
    </div>
    <div class="winner-body" v-else>

          <div class="first-box box"  @click="weekly=!weekly">
                  <div class="week">
                Week {{winnerWeek}}
                </div>
                <div class="date">
                  {{ winnerWeekDetail[0].fromDate}} -  {{winnerWeekDetail[0].toDate}}
                </div>
         </div>

         <div class="two-container weekly"   v-for="(item, index) in winnerWeekDetailChunk"
          :key="'winner'+index"   >
             <div class="second-box box"  v-for="(item2, index2) in item"  :key="'winners'+index2"   @click="showWinners(item2.week)" >
               <p>{{item2.name}}<BR/>
               {{item2.email}}
               </p>

             </div>
         </div>
          </div>

      </v-col>
    </v-row>



  </div>
</template>

<script>
import moment from "moment";
import * as _ from 'lodash';
import deepClone from 'deep-clone'
export default {
  name: "RewardDetails",
  components: {
  },
  data() {
    return {
      showWinnerDetail:false,
      winnerWeek:null,
      weekly:false,
      monthly:false

    };
  },
  props: {
    data: null,
    winners: null,
    howData:null
  },
  computed:{
    winnerLists(){
      return _.uniqBy(_.filter(_.orderBy(this.winners, ['week'], ['desc']), (o)=>{ return o.week!=0&&o.fromDate!=""&&o.toDate!="" }),'week');
    },
    winnerListsSecond(){
      let secondRow=deepClone(this.winnerLists);
      let secondRowResult=secondRow.splice(0, secondRow.length);
     //
      return _.chunk(secondRowResult, 2);
    },
    winnerWeekDetail(){
      return _.filter(this.winners,(o)=>{ return o.week == this.winnerWeek});
    },
    winnerWeekDetailChunk(){
      let secondRow=deepClone(this.winnerWeekDetail);
      let secondRowResult=secondRow;
     //
      return _.chunk(secondRowResult, 2);
    },

  },
  methods:{
    replace_String(string, numberofchar,chartoreplace) {

     return string.substring(0, numberofchar).split("").map(ele => ele = chartoreplace).join("").concat(string.substring(numberofchar, string.length))

    },
    formatDate(date){
      return  moment(date).format("DD/MM/YYYY")
    },
    close(){
       if(this.showWinnerDetail){
         window.location.assign("/winners");
       }else{
         window.location.assign("/");
       }
    },
    openPDF(link){
      window.open(
        link,
        '_blank'
      );
    },
    showWinners(week){
      this.showWinnerDetail=true;
      this.winnerWeek=week;
    },
    maskEmail(email){
      return this.replace_String(email,5,"*");
    }
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.winner-details{
  .next-draw{
    text-align: center;
    padding: 30px;
  }
    h3{
      small{
        font-size: 16px;
      }
    }
    .row > .col, .row > [class*=col-] {
          padding: 10px;
    }
    display: flex;
    flex-direction: row;
    width: 100%;
    .close-icon{
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1;
    }
    .winner-body{
        display: flex;
        flex-direction: column;
        margin: 120px 50px;
        padding: 0px 15px;
        .title{
            font-size: 30px;
            margin-bottom: 40px;
        }
        .redeem-expiry{
            margin-top: 60px;
            width: 70%;
            h4{
                font-size: 25px;
                margin-bottom: 30px;
            }
            p{
                padding-bottom: 30px
            }
        }
        .box{
          border: 1px solid #DB1F27;

          border: 1px solid #DB1F27;
          border-radius: 5px;

          padding-top: 20px;
          padding-left: 15px;
          padding-bottom: 20px;
          position: relative;
        }
         .week{

                font-weight:bold;
                text-transform: uppercase;
         }
        .first-box{
            width: 100%;
            .week{
                margin-bottom: 5px;
            }
            .date{
                font-size: 20px;
            }
        }
        .two-container{
            display: flex;
            margin-top: 25px;
            justify-content: space-between;
            .second-box{
                width: 49%;
                .week{
                margin-bottom: 5px;
            }
                .date{
                    font-size: 20px;
                }
            }
        }

    }
    .image-fluid{
        img{
            height: 100vh;
        }
    }
    a.button.rewards-bottom{
        margin-top: 30px;
    }
    .container.week-winner{
      padding-left: 50px;
      padding-top: 30px;
    }
    @media only screen and (max-width: 1199px) {
        .container.week-winner{
          padding-left: 0px;
          padding-top: 20px;
        }
        .col-sm-1.col{
          width: 20px !important;
          flex-grow: 0.2 !important;
        }
        flex-direction: column;
        width: 100%;
        position: relative;
        p{
            line-height: 24px;
        }
        .winner-body{
            width:100%;
            margin-top: 45px;
            margin-bottom: 0px;
            margin: 50px 0px;
            .title{
                font-size: 20px;
                margin-bottom: 20px;
            }
            .redeem-expiry{
                margin-top: 40px;
                border-bottom: 1px solid #585858;
                width: 100%;
                h4{
                    font-size: 20px;
                    margin-bottom: 20px;
                }
                p{
                    padding-bottom: 20px;
                    line-height: 24px;
                }
            }
            .two-container{
                flex-direction: column;
                margin-top: 0px;
                .second-box{
                    margin-top: 25px;
                    width: 100%;
                }
            }
        }
        .image-fluid{
            img{
                height: auto;
                width: 100%;
            }
        }
        a.button.rewards-bottom{
            margin:auto;
            margin-top:40px;
        }
        a.button.mobile{
            margin:auto;
            margin-top:-80px;
            position: relative;
            z-index: 10;
        }
        .close-icon{
            position: absolute;
            top: 0px;
            right:0px;
            margin-top: 10px;
        }
    }
}

.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
.button-carousel{
  font-size:30px;
  position: absolute;
  top:30%;
  right: 30px;
}
</style>
