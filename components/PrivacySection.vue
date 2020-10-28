<template>
<div class="privacy-component">
    <div class="privacy-section">
        <div class="primary-section">
            <div class="header">
                {{data.privacyTop[0].title}}
                <p>{{data.privacyTop[0].LastUpdated}}</p>
            </div>
            <div class="desc">
                <p>{{data.privacyTop[0].description}}</p>
            </div>
        </div>
        <div class="logo">
            <img src="/img/icons/coke.png"/>
        </div>
    </div>
    <div class="secondary-section">
        <div class="secondary-component">
            <div class="sub-header">{{data.privacyContent[0].title}}</div>
            <div class="desc">
                <p v-html="data.privacyContent[0].description"></p>
            </div>
        </div>
        <v-expansion-panels
            multiple
            class="accordions"
            dark
        >
            <v-expansion-panel v-for="(item, index) in data.privacyBottom" :key="'item-'+index">
                <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <span v-html="item.description"></span>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</div>
</template>

<script>
export default {
  name: "PrivacySection",
  components: {
  },
  data() {
    return {
      currentPage: 1
    };
  },
  props: {
    data: null,
  },
  computed:{
  },
  methods:{
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.privacy-component{
    .privacy-section{
        display: flex;

        .primary-section{
            display: flex;
            padding-bottom: 50px;
            border-bottom: 1px solid #585858;
            .header{
                width: 40%;
                p{
                    font-size: 16px;
                    margin-top: 35px;
                }
            }
            .desc{
                width: 50%;
                  @media only screen and (min-width: 780px) {
                    margin-left: 50px;
                 }
                p{
                    line-height: 24px;
                }
            }
        }
         .logo{
            align-self: flex-end;
            margin-left: 35px;
        }

    }

    .secondary-section{
        .secondary-component{
            margin-top: 40px;
            display:flex;
            .sub-header{
                font-size: 25px;
                width: 26%;
            }
            .desc{
                width: 50%;
                 @media only screen and (min-width: 780px) {
                    margin-left: 50px;
                 }
                p{
                    line-height: 24px;
                }
            }
        }
        .accordions{
            margin: 40px 0px;
            width: 80%;
            .v-expansion-panel-header__icon{
                margin-left: auto;
            }
            .v-expansion-panel{
                background: transparent;
                color: #ffffff;
                border-bottom: 1px solid #585858;
            }
        }
        a{
            color: #FFC529;
        }
    }
    @media only screen and (max-width: 1199px) {
        .privacy-section{
            flex-direction: column-reverse;
            .primary-section{
                flex-direction: column;
                .header{
                    width:100%;
                    font-size: 18px;
                    margin-top:35px;
                    p{
                        margin-top:15px;
                        margin-left: 20px;
                    }
                }
                .desc{
                    margin-top:30px;
                    width: 100%;
                }
            }
            .logo{
                margin-left: 0px;
                align-self: center;
            }
        }
        .secondary-section{
            .secondary-component{
                .sub-header{
                    font-size: 18px;
                }
                flex-direction: column;
                .desc{
                    margin-left: 0px;
                    width: 100%;
                    margin-top: 30px;
                }
            }
            .accordions{
                width: 100%;
            }
        }
    }
}
</style>
