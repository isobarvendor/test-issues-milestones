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

      <a
        :class="[
          { 'profile-button': true, 'hide-mobile': expand },
          'mobile-height'
        ]"
        id="signIn"
        v-if="!logged && notCountDown"
        v-scroll-to="'.mechanics'"
        @click="goToSignIn"
        href="#"
        style="text-decoration:none"
      >
        <div class="profile-content">
          <div class="">
            <template><div v-html="siginButton"></div></template>
            <div class="profile-button-row">
              <span
                v-on:click="redirectTo('facebook')"
                class="margin-social-icon"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M9.99126 24.0492L10.05 24.0597V24V15.333V15.283H10H7.05V12.05H10H10.05V12V9.333C10.05 7.8441 10.5294 6.69154 11.3429 5.91108C12.1567 5.1303 13.3101 4.717 14.667 4.717C15.5146 4.717 16.4288 4.8451 17.283 4.97592V7.95H15.8C15.059 7.95 14.5923 8.13517 14.3125 8.45003C14.0337 8.76377 13.95 9.19572 13.95 9.667V12V12.05H14H17.1414L16.6244 15.283H14H13.95V15.333V24V24.0597L14.0087 24.0492C19.6991 23.0391 24.05 18.0588 24.05 12.067C24.05 5.40265 18.6279 -0.05 12 -0.05C5.37212 -0.05 -0.05 5.40265 -0.05 12.067C-0.05 18.0578 4.30091 23.0391 9.99126 24.0492Z"
                      fill="#4267B2"
                      stroke="#4267B2"
                      stroke-width="0.1"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span v-on:click="redirectTo('google')">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8055 8.0415H19V8H10V12H15.6515C14.827 14.3285 12.6115 16 10 16C6.6865 16 4 13.3135 4 10C4 6.6865 6.6865 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M1.15302 5.3455L4.43851 7.755C5.32751 5.554 7.48052 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C6.15902 0 2.82802 2.1685 1.15302 5.3455Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M10 20C12.583 20 14.93 19.0115 16.7045 17.404L13.6095 14.785C12.5718 15.5742 11.3037 16.001 10 16C7.399 16 5.1905 14.3415 4.3585 12.027L1.0975 14.5395C2.7525 17.778 6.1135 20 10 20Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M19.8055 8.0415H19V8H10V12H15.6515C15.2571 13.1082 14.5467 14.0766 13.608 14.7855L13.6095 14.7845L16.7045 17.4035C16.4855 17.6025 20 15 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
                    fill="#1976D2"
                  />
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
          <v-card
            v-show="expand"
            class="mx-auto"
            v-if="
              CMSContent &&
                CMSContent[0].SectionMenu &&
                CMSContent[0].SectionMenu.Menu
            "
          >
            <div class="menu-container">
              <div class="wallet-desktop">
                <div class="wallet-swiper">
                  <div class="wallet-swiper-item">
                    <img
                      :src="
                        CMSContent[0].SectionMenu.Image.length > 0
                          ? CMSContent[0].SectionMenu.Image[0].url
                          : '/img/landing/banner_mobile.png'
                      "
                    />
                  </div>
                  <div class="description bg">
                    <div class="name">
                      {{ CMSContent[0].SectionMenu.Description }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="body-options">
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
                  <img src="/img/icons/home-icon.png" />
                  <div>
                    <a href="/" id="home">{{ menu.home }}</a>
                  </div>
                </div>
                <div class="img-text" v-if="logged">
                  <img src="/img/icons/wallet.png" />
                  <div>
                    <a data-nav="myrewards" id="myReward" @click="clickNav">{{
                      menu.myRewards
                    }}</a>
                  </div>
                </div>
                <div class="img-text">
                  <img src="/img/icons/winners.png" />
                  <div>
                    <a data-nav="winners" id="winners" @click="clickNav">{{
                      menu.winners
                    }}</a>
                  </div>
                </div>
              </div>
              <!--div class="tnc-container">
                    <p><a @click="clickPrivacy" v-if="CMSContent"> {{CMSContent[0].SectionMenu.Menu[5].Link}} </a></p>
                    <p><a @click="clickTerms" v-if="CMSContent"> {{ CMSContent[0].SectionMenu.Menu[6].Link}}</a></p>
                    <p v-if="logged&&CMSContent"  class="logout" @click="logout" >{{CMSContent[0].SectionMenu.Menu[7].Link}}</p>
                </div-->
              <div class="tnc-container">
                <p>
                  <a @click="clickPrivacy" v-if="CMSContent" id="privacy">{{
                    menu.privacy
                  }}</a>
                </p>
                <p>
                  <a @click="clickTerms" v-if="CMSContent" id="tnc">{{
                    menu.terms
                  }}</a>
                </p>
                <p
                  v-if="logged && CMSContent"
                  class="logout"
                  id="logout"
                  @click="logout"
                >
                  {{ menu.logout }}
                </p>
              </div>
            </div>
          </v-card>
        </v-expand-transition>
      </div>
    </client-only>
  </header>
</template>

<script>
import { translation } from "@/constants/index";
export default {
  data() {
    return {
      isDark: false,
      isReward: false,
      expand: false,
      config: this.$store.getters.getCMSConfig,
      notCountDown: this.$store.state.isCampaignStarted,
      siginButton: translation.signInButton,
      menu: translation.menu
    };
  },
  watch: {
    $route(n, o) {}
  },
  computed: {
    /*showProfile(){
            if(this.$route.name =='register'||this.$route.name =='login'||(this.$store.getters.getCMSConfig && this.$store.getters.getCMSConfig.campaignTypes.authentication !='register')){
                return false
            }
            else{
                return true;
            }
        },*/
    showMenu() {
      if (
        this.$route.name == "register" ||
        this.$route.name == "rewardDetail" ||
        this.$route.name == "login" ||
        this.$route.name == "winners"
      ) {
        return false;
      } else {
        return true;
      }
    },
    logged() {
      return this.$store.getters.getLoginAccount;
    },
    CMSContent() {
      return this.$store.getters.getCMSContent;
    },
    isEnglish() {
      return this.$store.state.language == "en";
    },
    isIndo() {
      return this.$store.state.language == "id";
    },
    listWallet() {
      return this.$store.state.listWallet;
    },
    contentClass() {
      let cmsContent = this.$store.getters.getCMSContent;
      if (cmsContent && cmsContent[0].Theme) {
        if (cmsContent[0].Theme.Theme == "Coke") {
          return "coke";
        } else if (cmsContent[0].Theme.Theme == "Spirit") {
          return "sprite";
        } else if (cmsContent[0].Theme.Theme == "Fanta") {
          return "fanta";
        }
      }
      return "coke";
    }
  },
  methods: {
    goToSignIn() {
      this.$store.commit("SET_GO_TO_SIGNIN", true);
      this.$router.push("/");
    },
    redirectTo(source) {
      location.href =
        "/api/oauth2/authorize/" +
        source +
        "?redirect_uri=" +
        window.location.origin +
        "/settoken";
    },
    toggleMenu(e) {
      e.stopPropagation();
      e.target.classList.toggle("active");
      this.expand = !this.expand;
      this.$emit("toggleMenu", this.expand);
    },

    clickNav(e) {
      let el = e.target.getAttribute("data-nav");
      if (el) {
        //$nuxt.$router.push('/'+el)
        location.href = "/" + el;
      }
      this.toggleMenu(e);
    },
    clickPrivacy(e) {
      location.href = "/privacy";
      this.toggleMenu(e);
    },
    clickTerms(e) {
      location.href = "/tnc";
      this.toggleMenu(e);
    },
    loginRoute() {
      if (!this.logged) {
        location.href = "/login";
      } else {
        location.href = "/wallet";
      }
    },
    logout() {
      localStorage.clear();
      this.expand = !this.expand;
      location.href = "/";
    },
    changeLanguage(language) {
      this.$store.commit("SET_LANGUAGE", language);
      location.reload();
    }
  },
  mounted() {
    this.isDark = this.$route.name != "index";
  }
};
</script>

<style lang="scss">
.profile-button {
  &.invisible {
    opacity: 0;
  }
  position: fixed;
  //   background-color: #b10017;
  background-color: #ffffff;
  text-align: center;
  color: black;
}
.profile-button-row {
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
.nav-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  z-index: 1;
  a {
    text-decoration: none;
    &.active {
      text-decoration: underline;
    }
  }
  .language-container {
    padding-left: 25%;
    padding-bottom: 30px;
  }
  .nav-button {
    z-index: 12;
  }
  .menu-container {
    width: 400px;
    height: auto;
    background: #282828;
    position: absolute;
    top: -120px;
    box-shadow: 0 0 0 1px black;
    border-radius: 20px;
    right: -50px;
    padding-bottom: 40px;
    color: #ffffff;
    box-shadow: -7px 4px 12px -1px rgba(0, 0, 0, 0.75);
    border-radius: 0px 0px 0px 20px !important;
    z-index: 11;
    .wallet-swiper {
      margin: 0px 0px;
      width: 80%;
      margin: auto;
      .description {
        padding: 15px;
        border-radius: 0px 0px 20px 20px;
      }
    }
    .body-options {
      width: 80%;
      margin: auto;
      margin-top: 25px;
      margin-bottom: 30px;
      .img-text {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img {
          margin-right: 10px;
        }
      }
    }
    .tnc-container {
      width: 80%;
      margin: auto;
      margin-top: 20px;
      p {
        color: #585858;
        margin-bottom: 15px;
        text-align: center;
        text-decoration: underline;
        &.logout {
          color: #ffffff;
          margin-top: 40px;
          cursor: pointer;
        }
      }
    }
  }
  @media only screen and (max-width: 700px) {
    .menu-container {
      right: 10px;
      top: -150px;
      margin-top: 20px;
      padding-top: 150px;
      height: 100%;
      min-height: 900px;
      .wallet-swiper {
        width: 305px;
        .wallet-swiper-item img {
          height: 290px !important;
          width: 305px;
        }
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .menu-container {
      right: -30px;
    }
  }
  @media only screen and (max-width: 320px) {
    .menu-container {
      right: -50px;
    }
  }
}
@media only screen and (max-width: 700px) {
  .mobile-height {
    height: 65px;
  }
  .hide-mobile {
    display: none !important;
  }
}
@media only screen and (max-width: 992px) {
  .mobile-height {
    height: 65px;
  }
}
</style>
