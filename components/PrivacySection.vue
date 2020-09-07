<template>
<div class="privacy-component">
    <div class="privacy-section">
        <div class="primary-section">  
            <div class="header">Privacy Policy
                <p> last updated: 30 July 2020</p>
            </div>
            <div class="desc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Pellentesque scelerisque laoreet sem a tempor. 
                    Vivamus rhoncus nibh id sagittis vulputate. Nulla sit amet lectus erat. Sed luctus, 
                    massa dictum sagittis consectetur, diam lorem placerat nibh, quis suscipit diam lorem at libero. 
                    Aliquam erat volutpat. Etiam ante nisi, consequat aliquam est vitae, pulvinar euismod neque. Nunc ultricies 
                    egestas odio, nec congue augue fermentum nec. Mauris ac quam quis justo varius faucibus. 
                    Phasellus laoreet ac dui vitae maximus. Nunc id maximus nisl.
                </p>
            </div>
        </div>
        <div class="logo">
            <img src="/img/icons/coke.png"/>
        </div>
    </div>
    <div class="secondary-section">
        <div class="secondary-component">
            <div class="sub-header">Principles</div>
            <div class="desc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Pellentesque scelerisque laoreet sem a tempor. 
                    Vivamus rhoncus nibh id sagittis vulputate. Nulla sit amet lectus erat. Sed luctus, 
                    massa dictum sagittis consectetur, diam lorem placerat nibh, quis suscipit diam lorem at libero. 
                    Aliquam erat volutpat. Etiam ante nisi, consequat aliquam est vitae, pulvinar euismod neque. Nunc ultricies 
                    egestas odio, nec congue augue fermentum nec. Mauris ac quam quis justo varius faucibus. 
                    Phasellus laoreet ac dui vitae maximus. Nunc id maximus nisl. <a href="mailto:coke@sg.com"> coke@sg.com</a>
                </p>
            </div>
        </div>
         <v-expansion-panels
        v-model="panel"
        :disabled="disabled"
        multiple
        class="accordions"
        dark
      >
        <v-expansion-panel>
          <v-expansion-panel-header> Information we collect</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
          </v-expansion-panel-content>
        </v-expansion-panel>
  
        <v-expansion-panel>
          <v-expansion-panel-header>information we collect</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
          </v-expansion-panel-content>
        </v-expansion-panel>
  
        <v-expansion-panel>
          <v-expansion-panel-header> Information we collect</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
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
                margin-left: 50px;
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
