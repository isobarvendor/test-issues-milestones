<template>
  <div v-if="dataStatus.status == 200" id="main" class="wallet">
    <div class="wrapper">
      <div class="container">
        <div class="header">Your Wallet</div>
        <WalletRewards :data="listWalletExpired"/>
        <WalletTransactions :data="listWalletTransaction"/>
      </div>

    </div>
  </div>
  <div v-else-if="dataStatus.status >= 500">
    Status: {{dataStatus.status}}
    <br />
    {{dataStatus.message}}
  </div>
</template>

<script>
import WalletRewards from '@/components/WalletRewards'
import WalletTransactions from '@/components/WalletTransactions'
import { GET_LIST_WALLET } from '@/store/action_types';
export default {
  data(){
    return{
      dataStatus:{},
      data:null,
      configData: null,
      campaignType: 0,
      listWallet:[],
      listWalletExpired:[]
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
  created() {
    this.fetchData();
    this.getListWallet();
    this.getListWalletExpired();
    this.getListWalletTransaction();
  },
  methods: {
    async fetchData() {
      let result = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaigns"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.data = result.data;

      let config = await this.$axios.get('https://ayo.aircovery.com/cms-api/campaign-configurations')
      this.configData = config.data
    },
     async getListWallet(){
     /* let request= {
              "configurationId": "confIdExample123",
              "flowLabel": "queryWallet",
              "userId": this.$store.state.login ? this.$store.state.login.uuid : null
          }*/
      let request = {
        name:this.$store.state.login.name,
        email:this.$store.state.login.email
      }
      //commented first after API ready
      let payload={request,token:this.$store.state.token}
      this.$store.dispatch(GET_LIST_WALLET,payload)
            .then((response)=>{

               this.listWallet=response.data;
            })
            .catch((error) =>{
              if(error.response && error.response.data.status=='401'){
                this.errorMessage='Please enter the correct email/password';
              }
            })

      /* this.listWallet={
                "walletStatus": [
                      {
                          "currencyId": "fl2gr1joh3nces",
                          "gppUserId": "UUID|CDS region",
                          "amount": 11,
                          "lastModified": 1542884788416

                      }, {
                          "currencyId": "79q3u1oysb",
                          "gppUserId": "UUID|CDS region",
                          "amount": 31,
                          "lastModified": 1542884788416

                      }

                  ]

              }*/

     },
        async getListWalletExpired(){
      let request= {
              "configurationId": "confIdExample123",
              "flowLabel": "queryExpirationWalletByUser",
             "userId": this.$store.state.login ? this.$store.state.login.uuid : null
          }
      //commented first after API ready

      let payload={request,token:this.$store.state.token}
      this.$store.dispatch(GET_LIST_WALLET,payload)
            .then((response)=>{

               this.listWalletExpired=response.data;
            })
            .catch((error) =>{
              if(error.response && error.response.data.status=='401'){
                this.errorMessage='Please enter the correct email/password';
              }
            })

       this.listWalletExpired={
                "expirationWallet": [
                    {
                        "gpp_user_id": "UUID|CDS region",
                        "amount": 20,
                        "currency_id": "coin",
                        "currency_name": "CCA-coin",

                        "configuration_id": "exampleConfig123",
                        "last_modified": 1557764018189,
                        "valid_thru": 1355228281846,
                        "already_spent": 15,
                        "spent_amount": 0
                    },
                    {
                        "gpp_user_id": "UUID|CDS region",
                        "amount": 1,
                        "configuration_id": "exampleConfig123",
                        "currency_id": "coin",
                        "currency_name": "CCA-coin",
                        "valid_thru": 1581811199000,
                        "already_spent": 0,
                        "spent_amount": 0
                    },
                    {
                        "gpp_user_id": "UUID|CDS region",
                        "amount": 40,
                        "currency_id": "coin",
                        "currency_name": "CCA-coin",

                        "configuration_id": "exampleConfig123",
                        "last_modified": 1557764018189,
                        "valid_thru": 1345228281846,
                        "already_spent": 0,
                        "spent_amount": 0
                    }
                ]
            }

     },
     async getListWalletTransaction(){
          let request=    {
                "configurationId": "1ejw41joh4lm23",
                "flowLabel": "addTransaction",
                "userId": this.$store.state.login ? this.$store.state.login.uuid : null,
                "eventCode": "testEventCode",
                "currencyAllocations":
                    [
                        {
                            "currencyId": "fl2gr1joh3nces",
                            "amount": 30
                        },
                        {
                            "currencyId": "79q3u1oysb",
                            "amount": 0
                        }
                    ]
            }

          //commented first after API ready

                 let payload={request,token:this.$store.state.token}
                 this.$store.dispatch(GET_LIST_WALLET,payload)
                      .then((response)=>{

                        this.listWalletTransaction=response.data;
                      })
                      .catch((error) =>{
                        if(error.response && error.response.data.status=='401'){
                          this.errorMessage='Please enter the correct email/password';
                        }
                      })

          this.listWalletTransaction ={
              "transactions": [
                  {
                      "transactionInserted": true,
                      "currencyId": "fl2gr1joh3nces",
                      "walletRollingTotal": 30
                  },
                  {
                      "transactionInserted": true,
                      "currencyId": "79q3u1oysb",
                      "walletRollingTotal": 0
                  }
              ]
          }

     }
  },
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    @media only screen and (max-width: 767px) {
      .wallet{
        .header{
          font-size: 25px;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
