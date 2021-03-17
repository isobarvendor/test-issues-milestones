<template>
  <header>
    <client-only>
    <!--a class="profile-button" :class="[{'invisible':!showProfile}]" v-if="!logged">
        <img class="profile-image" :src="logged.imageUrl" v-if="logged&& logged.imageUrl">
        <img class="profile-image" src="/img/dummy_profile.jpg" v-else-if="logged&&contentClass=='coke'">
        <img class="profile-image" src="/img/profile-sprite.png" v-else-if="logged&&contentClass=='sprite'">
        <img class="profile-image" src="/img/profile-fanta.png" v-else-if="logged&&contentClass=='fanta'">
        <div :class="{'profile-content' : config&&config.Wallet ? config.Wallet.Wallet : true }" @click="loginRoute">
            <template v-if="!logged"><div >SIGN IN <BR/><small>to win prizes</small></div></template>
            <template v-else-if="config ? config.Wallet.Wallet&&logged : logged">
                <div class="column center">
                    <div class="user-coins">{{listWallet ? listWallet.walletStatus[0].amount : 0 }}</div>
                    <div>coins</div>
                </div>

            </template>
        </div>
    </a-->

        <a :class="[{'profile-button':true,'hide-mobile' : expand}]" id="signIn" v-if="!logged&&notCountDown"  v-scroll-to="'.mechanics'" @click="goToSignIn" href="#" style="text-decoration:none">
        <div class="profile-content" >
            <template ><div v-html="siginButton"></div></template>
        </div>
    </a>
    <div></div>
    <div class="nav-container">

        <a class="nav-button" @click="toggleMenu" v-if="showMenu">
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </a>
        <v-expand-transition>
            <v-card v-show="expand" class="mx-auto" v-if="CMSContent && CMSContent[0].SectionMenu&& CMSContent[0].SectionMenu.Menu">
            <div class="menu-container">
                <div class="wallet-desktop" >
                    <div class="wallet-swiper"  >
                        <div class="wallet-swiper-item">
                        <img :src="CMSContent[0].SectionMenu.Image.length>0 ? CMSContent[0].SectionMenu.Image[0].url:'/img/landing/banner_mobile.png'" />
                        </div>
                        <div class="description bg">
                            <div class="name">{{CMSContent[0].SectionMenu.Description}}</div>
                        </div>
                    </div>

                </div>

                <div class="body-options" >
                      <!--div class="language-container"> <a href='#' :class="{ active : isEnglish}" @click="changeLanguage('en')">English</a> | <a :class="{ active : isIndo }" href='#' @click="changeLanguage('id')">Indonesia</a>
        </div-->
                    <!--div class="img-text">
                        <img src="/img/icons/home-icon.png"  />
                        <div>
                            <a href="/">{{CMSContent[0].SectionMenu.Menu[0].Link}}</a>
                        </div>
                    </div>
                    <div class="img-text" v-if="config&&config.Reward ? config.Reward.Reward : true">
                        <img src="/img/icons/reward.png"  />
                        <div>
                            <a data-nav="rewards" @click="clickNav">{{CMSContent[0].SectionMenu.Menu[1].Link}}</a>
                        </div>
                    </div>
                    <div class="img-text" v-if="config&&config.Wallet ? config.Wallet.Wallet&&logged : logged">
                        <img src="/img/icons/wallet.png"/>
                        <div>
                            <a data-nav="wallet" @click="clickNav">{{CMSContent[0].SectionMenu.Menu[2].Link}}</a>
                        </div>
                    </div>
                    <div class="img-text" v-if="logged">
                        <img src="/img/icons/account.png"/>
                        <div>
                            <a data-nav="account" @click="clickNav">{{CMSContent[0].SectionMenu.Menu[3].Link}}</a>
                        </div>
                    </div>
                    <div class="img-text">
                        <img src="/img/icons/help.png"/>
                        <div>
                            <a data-nav="help" @click="clickNav">{{CMSContent[0].SectionMenu.Menu[4].Link}}</a>
                        </div>
                    </div-->
                    <div class="img-text">
                        <img src="/img/icons/home-icon.png"  />
                        <div>
                            <a href="/" id="home">{{menu.home}}</a>
                        </div>
                    </div>
                       <div class="img-text" v-if="logged">
                        <img src="/img/icons/wallet.png"/>
                        <div>
                            <a data-nav="myrewards" id="myReward" @click="clickNav">{{menu.myRewards}}</a>
                        </div>
                    </div>

                </div>
                <!--div class="tnc-container">
                    <p><a @click="clickPrivacy" v-if="CMSContent"> {{CMSContent[0].SectionMenu.Menu[5].Link}} </a></p>
                    <p><a @click="clickTerms" v-if="CMSContent"> {{ CMSContent[0].SectionMenu.Menu[6].Link}}</a></p>
                    <p v-if="logged&&CMSContent"  class="logout" @click="logout" >{{CMSContent[0].SectionMenu.Menu[7].Link}}</p>
                </div-->
                <div class="tnc-container">
                    <!--p><a @click="clickPrivacy" v-if="CMSContent" id="privacy">{{menu.privacy}}</a></p>
                    <p><a @click="clickTerms" v-if="CMSContent" id="tnc">{{menu.terms}}</a></p-->
                    <p v-if="logged&&CMSContent"  class="logout" id="logout" @click="logout" >{{menu.logout}}</p>
                </div>

            </div>
        </v-card>
        </v-expand-transition>

    </div>
    </client-only>


  </header>
</template>

<script>
import {translation} from "@/constants/index"
export default {
    data(){
        return{
            isDark:false,
            isReward:false,
            expand: false,
            config:this.$store.getters.getCMSConfig,
            notCountDown:this.$store.state.isCampaignStarted,
            siginButton:translation.signInButton,
            menu:translation.menu
        }
    },
    watch:{
        $route(n,o){

        }
    },
    computed:{

        /*showProfile(){
            if(this.$route.name =='register'||this.$route.name =='login'||(this.$store.getters.getCMSConfig && this.$store.getters.getCMSConfig.campaignTypes.authentication !='register')){
                return false
            }
            else{
                return true;
            }
        },*/
        showMenu(){
            if(this.$route.name =='register'||this.$route.name =='rewardDetail'||this.$route.name =='login'||this.$route.name =='winners'){
                return false
            }
            else{
                return true;
            }
        },
        logged(){
           return this.$store.getters.getLoginAccount
        },
         CMSContent(){
           return this.$store.getters.getCMSContent
        },
         isEnglish(){
           return this.$store.state.language=="en";
        },
         isIndo(){
           return this.$store.state.language=="id";
        },
         listWallet(){
           return this.$store.state.listWallet;
        },
         contentClass(){
            let cmsContent=this.$store.getters.getCMSContent;
              if(cmsContent && cmsContent[0].Theme){
                if(cmsContent[0].Theme.Theme=='Coke'){
                  return "coke"
                }else if(cmsContent[0].Theme.Theme=='Spirit'){
                  return "sprite"
                }else if(cmsContent[0].Theme.Theme=='Fanta'){
                  return "fanta"
                }
              }
              return "coke"
          },

    },
    methods:{
      goToSignIn(){
        this.$store.commit('SET_GO_TO_SIGNIN',true);
        this.$router.push('/');

      },
        toggleMenu(e){
            e.stopPropagation();
            e.target.classList.toggle('active');
            this.expand = !this.expand;
            this.$emit('toggleMenu',this.expand);
        },

        clickNav(e){
            let el = e.target.getAttribute('data-nav');
            if(el){
                //$nuxt.$router.push('/'+el)
                location.href="/" + el
                }
            this.toggleMenu(e)
        },
        clickPrivacy(e){
            location.href='/privacy';
            this.toggleMenu(e)
        },
        clickTerms(e){
            location.href='/tnc';
            this.toggleMenu(e)
        },
        loginRoute(){
            if(!this.logged){
              location.href='/login';
            }else{
              location.href='/wallet';
            }

        },
        logout(){
          localStorage.clear();
          this.expand = !this.expand;
          location.href="/";

        },
        changeLanguage(language){
          this.$store.commit('SET_LANGUAGE',language);
          location.reload();
        },

    },
    mounted(){
        this.isDark = this.$route.name!="index"
    }
};
</script>

<style lang="scss">
.profile-button{
    &.invisible{
        opacity:0;
    }
 position: fixed;
background-color: #b10017;
 text-align: center;
}
.nav-container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    z-index: 1;
    a{
      text-decoration: none;
      &.active{
        text-decoration: underline;
      }
    }
    .language-container{
      padding-left: 25%;
      padding-bottom: 30px;
    }
    .nav-button{
        z-index:12;
    }
    .menu-container{
        width: 400px;
        height: auto;
        background: #282828;
        position: absolute;
        top:-120px;
        box-shadow: 0 0 0 1px black;
        border-radius: 20px;
        right: -50px;
        padding-bottom: 40px;
        color: #ffffff;
        box-shadow: -7px 4px 12px -1px rgba(0,0,0,0.75);
        border-radius: 0px 0px 0px 20px !important;
          z-index: 11;
        .wallet-swiper{
            margin: 0px 0px;
            width: 80%;
            margin:auto;
            .description{
                padding: 15px;
                border-radius: 0px 0px 20px 20px;
            }
        }
        .body-options{
            width: 80%;
            margin: auto;
            margin-top: 25px;
            margin-bottom: 30px;
            .img-text{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                img{
                    margin-right: 10px;
                }
            }
        }
        .tnc-container{
            width: 80%;
            margin: auto;
            margin-top: 20px;
            p{
                color: #585858;
                margin-bottom: 15px;
                text-align: center;
                text-decoration: underline;
                &.logout{
                    color: #ffffff ;
                    margin-top:40px;
                    cursor: pointer;
                }
            }
        }

    }
    @media only screen and (max-width: 700px) {
        .menu-container{
            right: -20px;
            top: -150px;
            margin-top: 20px;
            padding-top:150px;
            height: 100%;
            min-height: 900px;
            .wallet-swiper{
                width: 305px;
                .wallet-swiper-item img{
                    height: 290px !important;
                    width: 305px;
                }
            }
        }
    }
        @media only screen and (max-width: 700px) {
        .menu-container{
            right: -50px;
        }
    }
}
    @media only screen and (max-width: 700px) {
        .hide-mobile{
          display: none !important;
        }
    }
</style>
