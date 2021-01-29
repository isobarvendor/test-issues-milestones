<template>
  <div class="winner-details">
      <div class="image-fluid">
        <img :src="this.data.image[0].url" v-if="this.data.image" />
    </div>
    <div class="close-icon" @click="close">
           <img src="/img/icons/close.png"/>
      </div>
     <div class="winner-body" v-if="!showWinnerDetail">
         <div class="title">
          <h3>WINNER LIST</h3>
         </div>
         <div class="first-box box"  @click="showWinners(winnerLists[0].week)">
             <div class="week">
               Week {{winnerLists[0].week}}
              </div>
              <div class="date">
                {{ winnerLists[0].fromDate}} -  {{winnerLists[0].toDate}}
              </div>
         </div>
         <div class="two-container"   v-for="(item, index) in winnerListsSecond"
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
        <a v-if="$mq == 'sm' || $mq == 'md'" class="button rewards-bottom"  @click="close"> Back to promotion</a>
    </div>
    <div class="winner-body" v-else>
         <div class="title">
          <h3>Week {{winnerWeek}} Winners <small>({{ winnerWeekDetail[0].fromDate}} -  {{winnerWeekDetail[0].toDate}})</small></h3>
         </div>
          <v-container class="week-winner ">
            <v-row class="mb-6" >
              <v-col sm="1" >
                <strong>No.</strong>
              </v-col>
              <v-col  sm="4" >
                <strong>Name</strong>
              </v-col>
              <v-col  sm="4" >
                <strong>Email</strong>
              </v-col>
            </v-row>
            <v-row class="mb-6" v-for="(item, index) in winnerWeekDetail"  :key="'winnerDetail'+index" >
              <v-col  sm="1" >
                {{index+1}}.
              </v-col>
              <v-col  sm="4" >
                {{item.name}}
              </v-col>
              <v-col  sm="4" >
                {{maskEmail(item.email)}}
              </v-col>
            </v-row>


          </v-container>
      </div>

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
      winnerWeek:null
    };
  },
  props: {
    data: null,
    winners: null,
  },
  computed:{
    winnerLists(){
      return _.uniqBy(_.filter(_.orderBy(this.winners, ['week'], ['desc']), (o)=>{ return o.week!=0&&o.fromDate!=""&&o.toDate!="" }),'week');
    },
    winnerListsSecond(){
      let secondRow=deepClone(this.winnerLists);
      let secondRowResult=secondRow.splice(1, secondRow.length-1);
     //
      return _.chunk(secondRowResult, 2);
    },
    winnerWeekDetail(){
      return _.filter(this.winners,(o)=>{ return o.week == this.winnerWeek});
    }

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
        top: 5%;
        right: 5%;
        z-index: 1;
    }
    .winner-body{
        display: flex;
        flex-direction: column;
        width: 55%;
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
          background: #B10017;
          border: 1px solid #DB1F27;
          border-radius: 20px;
          background: #B10017;
          padding-top: 20px;
          padding-left: 15px;
          padding-bottom: 20px;
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
                width: 45%;
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
</style>
