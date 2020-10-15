<template>
<div class="tnc-component" v-if="!data">
    <div class="tnc-section" >
        <div class="primary-section">
            <div class="header">Terms & Conditions
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
                <div class="links">
                    <p><a href="#">Header 1</a></p>
                    <p><a href="#">Header 2</a></p>
                    <p><a href="#">Header 3</a></p>
                    <p><a href="#">Header 4</a></p>
                    <p><a href="#">Header 5</a></p>
                    <p><a href="#">Header 6</a></p>
                </div>
            </div>
        </div>
        <div class="logo">
            <img src="/img/icons/coke.png"/>
        </div>
    </div>
    <div class="secondary-section">
        <div class="secondary-component">
            <div class="sub-header">Header 1</div>
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
    </div>
    <div class="secondary-section">
        <div class="secondary-component">
            <div class="sub-header">Header 2</div>
            <div class="desc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque scelerisque laoreet sem a tempor.
                    Vivamus rhoncus nibh id sagittis vulputate. Nulla sit amet lectus erat. Sed luctus,
                    massa dictum sagittis consectetur, diam lorem placerat nibh, quis suscipit diam lorem at libero.
                    Aliquam erat volutpat. Etiam ante nisi, consequat aliquam est vitae, pulvinar euismod neque. Nunc ultricies
                    egestas odio, nec congue augue fermentum nec. Mauris ac quam quis justo varius faucibus.
                </p>
            </div>
        </div>
    </div>
</div>
<div class="tnc-component" v-else>
    <div class="tnc-section" >
        <div class="primary-section">
            <div class="header">{{tnc.TncTop[0].Title}}
                <p> {{tnc.TncTop[0].LastUpdate}}</p>
            </div>
            <div class="desc">
                <p>{{tnc.TncTop[0].Description}}
                </p>
                <div class="links">
                    <p v-for="(item,index) in tnc.TncBottom"><a href="#">{{item.Title}}</a></p>
                </div>
            </div>
        </div>
        <div class="logo">
            <img src="/img/icons/coke.png"/>
        </div>
    </div>
    <div class="secondary-section" v-for="(item,index) in tnc.TncBottom">
        <div class="secondary-component">
            <div class="sub-header">{{item.Title}}</div>
            <div class="desc">
                <p>{{item.Description}}
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "TncSection",
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
    tnc(){
      return this.data
    }
  },
  methods:{
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.tnc-component{
    .tnc-section{
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
                .links{
                    margin-top: 40px;
                    p{
                        margin-bottom: 10px;
                    }
                }
            }
        }
         .logo{
            align-self: flex-end;
            margin-left: 35px;
        }

    }

    .secondary-section{
        width: 78%;
        .secondary-component{
            margin-top: 40px;
            display:flex;
            padding-bottom: 40px;
            border-bottom: 1px solid #585858;
            .sub-header{
                font-size: 25px;
                width: 34%;
            }
            .desc{
                width: 50%;
                margin-left: 50px;
                p{
                    line-height: 24px;
                }
            }
        }
    }
    @media only screen and (max-width: 1199px) {
        .tnc-section{
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
            width: 100%;
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
        }
    }
}
</style>
