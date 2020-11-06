<template>
  <div class="winner-details">
      <div class="image-fluid">
        <img :src="this.data.image[0].url" v-if="this.data.image.length>0" />
    </div>
    <div class="close-icon" @click="close">
           <img src="/img/icons/close.png"/>
      </div>
     <div class="winner-body">
         <div class="title">
          <h3>WINNER LIST</h3>
         </div>
         <div class="first-box box" @click="winnerLists[0].pdfFile ?  openPDF(winnerLists[0].pdfFile.url ) : false">
             <div class="week">
                {{winnerLists[0].title}}
              </div>
              <div class="date">
                {{ formatDate(winnerLists[0].fromDate)}} -  {{formatDate(winnerLists[0].toDate)}}
              </div>
         </div>
         <div class="two-container"   v-for="(item, index) in winnerLists"
          :key="'winner'+index" v-if="index!=0&&winnerLists.length-1 != index" >
             <div class="second-box box" @click="winnerLists[index].pdfFile ?  openPDF(winnerLists[index].pdfFile.url ) : false" >
                 <div class="week">
                {{winnerLists[index].title}}
              </div>
              <div class="date">
                {{ formatDate(winnerLists[index].fromDate)}} -  {{formatDate(winnerLists[index].toDate)}}
              </div>
             </div>
             <div class="second-box box" v-if="winnerLists.length-1 != index" @click="winnerLists[index].pdfFile ?  openPDF(winnerLists[index].pdfFile.url ) : false">
                 <div class="week">
                {{winnerLists[index+1].title}}
              </div>
              <div class="date">
                {{ formatDate(winnerLists[index+1].fromDate)}} -  {{formatDate(winnerLists[index+1].toDate)}}
              </div>
             </div>
         </div>
        <a v-if="$mq == 'sm' || $mq == 'md'" class="button rewards-bottom"  @click="close"> Back to promotion</a>
    </div>

  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "RewardDetails",
  components: {
  },
  data() {
    return {
    };
  },
  props: {
    data: null,
  },
  computed:{
    winnerLists(){
      return this.data.luckyWinnerSection
    }
  },
  methods:{
    formatDate(date){
      return  moment(date).format("DD/MM/YYYY")
    },
    close(){
        location.href="/"
    },
    openPDF(link){
      window.open(
        link,
        '_blank'
      );
    }
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.winner-details{
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
    @media only screen and (max-width: 1199px) {
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
