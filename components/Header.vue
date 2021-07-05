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

        <a :class="[{'profile-button':true,'hide-mobile' : expand} , 'mobile-height']" id="signIn" v-if="!logged&&notCountDown"  v-scroll-to="'.mechanics'" @click="goToSignIn" href="#" style="text-decoration:none">
        <div class="profile-content" >
            <div class="">
            <template ><div v-html="siginButton"></div></template>
            <div class="profile-button-row">

                <span v-on:click="redirectTo('facebook')" class="margin-social-icon">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.04467C0 12.022 2.88867 15.3293 6.66667 16V10.222H4.66667V8H6.66667V6.222C6.66667 4.222 7.95533 3.11133 9.778 3.11133C10.3553 3.11133 10.978 3.2 11.5553 3.28867V5.33333H10.5333C9.55533 5.33333 9.33333 5.822 9.33333 6.44467V8H11.4667L11.1113 10.222H9.33333V16C13.1113 15.3293 16 12.0227 16 8.04467C16 3.62 12.4 0 8 0C3.6 0 0 3.62 0 8.04467Z" fill="white"/>
                    </svg>
                </span>
                <span v-on:click="redirectTo('google')" >
                    <svg width="20.5" height="20.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.304 5.76932C13.386 6.20865 13.4307 6.66798 13.4307 7.14732C13.4307 10.8967 10.9213 13.5626 7.13133 13.5626C6.26943 13.5629 5.41593 13.3933 4.6196 13.0636C3.82326 12.7339 3.09969 12.2505 2.49024 11.6411C1.88079 11.0316 1.39739 10.3081 1.06768 9.51172C0.737971 8.71538 0.568402 7.86188 0.568665 6.99998C0.568402 6.13809 0.737971 5.28459 1.06768 4.48825C1.39739 3.69191 1.88079 2.96834 2.49024 2.35889C3.09969 1.74944 3.82326 1.26605 4.6196 0.936335C5.41593 0.606623 6.26943 0.437054 7.13133 0.437317C8.90333 0.437317 10.384 1.08932 11.52 2.14798L9.67 3.99798V3.99332C8.98133 3.33732 8.10733 3.00065 7.13133 3.00065C4.966 3.00065 3.206 4.82998 3.206 6.99598C3.206 9.16132 4.966 10.9947 7.13133 10.9947C9.096 10.9947 10.4333 9.87132 10.708 8.32865H7.13133V5.76932H13.3047H13.304Z" fill="white"/>
                    </svg>
                </span>
            </div>
            </div>
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
                    <div class="img-text" >
                        <img src="/img/icons/winners.png"/>
                        <div>
                            <a data-nav="winners" id="winners" @click="clickNav">{{menu.winners}}</a>
                        </div>
                    </div>

                </div>
                <!--div class="tnc-container">
                    <p><a @click="clickPrivacy" v-if="CMSContent"> {{CMSContent[0].SectionMenu.Menu[5].Link}} </a></p>
                    <p><a @click="clickTerms" v-if="CMSContent"> {{ CMSContent[0].SectionMenu.Menu[6].Link}}</a></p>
                    <p v-if="logged&&CMSContent"  class="logout" @click="logout" >{{CMSContent[0].SectionMenu.Menu[7].Link}}</p>
                </div-->
                <div class="tnc-container">
                    <p><a @click="clickPrivacy" v-if="CMSContent" id="privacy">{{menu.privacy}}</a></p>
                    <p><a @click="clickTerms" v-if="CMSContent" id="tnc">{{menu.terms}}</a></p>
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
      redirectTo(source){
        location.href="/api/oauth2/authorize/"+source+"?redirect_uri=" +
        window.location.origin +
        "/settoken";
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
.profile-button-row{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin: 3px 0;
    align-items: center;
    .margin-social-icon {
        margin: 0 0.7rem 0 0;
    }
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
            right: 10px;
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
     @media only screen and (max-width: 400px) {
        .menu-container{
            right: -30px;
        }
     }
        @media only screen and (max-width: 320px) {
        .menu-container{
            right: -50px;
        }
    }
}
    @media only screen and (max-width: 700px) {
        .mobile-height {
            height: 65px;
        }
        .hide-mobile{
          display: none !important;
        }
    }
    @media only screen and (max-width: 992px) {
        .mobile-height {
            height: 65px;
        }
    }
</style>
