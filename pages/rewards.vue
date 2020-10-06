<template>
  <div v-if="data" id="main" class="rewards">
    <div class="wrapper">

      <div class="container">
        <div class="header"> <span class="title">Rewards Catalogue</span>
          <div class="selections">
           <!-- <v-select
              :items="recent"
              label="Most recent"
              item-text ="text"
              item-value = "value"
              class="select"
            ></v-select>
            <v-select
              :items="filterby"
              label="Filter by"
              item-text ="text"
              item-value = "value"
              class="select"
            ></v-select>
            <v-text-field
              label="Search"
              solo
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              class="search"
            ></v-text-field> -->
          </div>
        </div>
        <RewardsCatalogue :data="listPrizes"/>
      </div>

    </div>
  </div>

</template>

<script>
import RewardsCatalogue from '@/components/RewardsCatalogue';
import { GET_LIST_PRIZE } from '@/store/action_types';
import deepClone from 'deep-clone'
// import Vuetify from 'vuetify/lib';
export default {
  data(){
    return{
      dataStatus:{},
      data:null,
      configData: null,
      campaignType: 0,
      listPrizes :[],
      listPrizesData :[],
      search:null
    }
  },
  head() {
    return {
      title: "Coke Campaign Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description"
        }
      ],
      noscript: [],
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
  computed: {
      data(){
    return deepClone(this.$store.state.CMSContent)
    },
    configData(){
      return deepClone(this.$store.state.config)
    },
    recent(){
        return this.data  && this.$store.state.CMSContent.exclusivePrizes
    },
    filterby(){
        return this.data && tthis.$store.state.CMSContent.exclusivePrizes
    }
  },

  created() {
    this.getListPrize();
  },
  methods:{
    async getListPrize(){

          await  this.$store.dispatch(GET_LIST_PRIZE)
            .then((response)=>{
               this.listPrizes=deepClone(response.data);
               this.listPrizesData=deepClone(response.data);
            })
            .catch((error) =>{
              if(error.response && error.response.data.status=='401'){
                this.errorMessage='Please enter the correct email/password';
              }
            })


    },

  },
  watch:{
    search: function(val){
      if(val&&val!=''){
        this.listPrizes.prizeList=this.listPrizes.prizeList.filter((o)=>{
            let searchVal=val.toUpperCase();

            return o.name.toUpperCase().includes(searchVal) ||o.shortDescription.toUpperCase().includes(searchVal)||o.description.toUpperCase().includes(searchVal);
        })
      }
      else{

        this.listPrizes=deepClone(this.listPrizesData);
      }
    }
  }
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
@import '~assets/scss/mixins.scss';
  html, body{
    background: $body-bg-color-wallet;
    .rewards{
        padding-top:115px;

        .container{
            max-width:1280px;
            padding: $content-hpadding $content-hpadding;
            @include breakpoint(lg){
            padding: $masthead-vpadding $masthead-hpadding;
            }
        }

        .header{
            @include section-header;
            text-align:left;
            text-transform: capitalize;
            display: flex;
            font-size:28px;
            justify-content: space-between;
            align-items: center;
            .selections{
                display: flex;
                .v-input{
                    margin-left: 30px;
                    .theme--light.v-label{
                        color: #ffffff;
                        font-size: 14px;
                    }

                    color: #ffffff;
                }
                .v-input::placeholder{
                    color: #585858 !important;
                }
                .v-input.search{
                    input{
                        color: #ffffff;
                    }
                    .theme--light.v-icon{
                        color: #585858;
                        input{
                         color: #ffffff;
                        }
                    }
                    .v-input__slot{
                        border: 1px solid #585858;
                        padding:6px;
                        background: transparent;
                        border-radius: 20px;
                        .v-text-field__slot{
                            margin-left: 15px;
                        }
                    }
                    .v-input__slot:before{
                        border-color: transparent !important ;

                    }
                    .theme--light.v-label{
                        color: #ffffff;
                        font-size: 14px;
                    }
                }
                .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
                    border-color: #ffffff
                }
                .theme--light.v-icon{
                    color: #ffffff;
                }
            }
        }

        .slider-header{
            @include row;
            align-items: center;
            .title{
            display:flex;
            font-size:26px;
            font-weight: bold;
            font-family:$header-fontfamily;
            margin-right:1em;
            }
            &:after{
                content: '';
                display:inline-block;
                height:1px;
                flex:1;
                background-color:#585858;
            }
        }

        a{
            &.button{
            text-decoration: none;
            filter:none;
            color:white;
            background: $wallet-button-gradient;
            }
            &.center{
            display:block;
            margin: 0 auto;
            }
        }
        a.button{
            width: 230px;
        }

    }
    @media only screen and (max-width: 1199px) {
      .rewards{
        .header{
          .title{
            font-size: 25px;
            margin-bottom: 30px;
          }
          display: flex;
          flex-direction: column;
          .selections{
              display: flex;
              flex-direction: column-reverse;
              .v-input{
                  margin-left: 0px;
              }
          }
        }
      }
    }
  }
</style>
