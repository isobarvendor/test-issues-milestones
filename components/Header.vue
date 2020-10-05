<template>
  <header>
    <a class="profile-button" :class="[{'dark': isDark},{'invisible':!showProfile}]">
        <img class="profile-image" src="/img/dummy_profile.jpg">
        <div class="profile-content" @click="loginRoute">
            <template v-if="!logged">Sign in</template>
            <template v-else>
                <div class="column center">
                    <div class="user-coins">288</div>
                    <div>coins</div>
                </div>
                <div class="column center">
                    <div><img src="/img/ic-coin.svg"></div>
                    <div>Get coins</div>
                </div>
            </template>
        </div>
    </a>
    <div class="nav-container">
        <a class="nav-button" @click="toggleMenu" v-if="showMenu">
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </a>
        <v-expand-transition>
            <v-card v-show="expand" class="mx-auto">
            <div class="menu-container">
                <div class="wallet-desktop" >
                    <div class="wallet-swiper">
                        <div class="wallet-swiper-item">
                        <img src="/img/rewards/jersey.png"
                        />
                        </div>
                        <div class="description bg">
                            <div class="name">Win a dream premier league experience in England</div>
                        </div>
                    </div>
                </div>
                <div class="body-options">
                    <div class="img-text" v-if="config ? config.Reward.Reward : true">
                        <img src="/img/icons/reward.png"  />
                        <div>
                            <a data-nav="rewards" @click="clickNav">Rewards Catalogue</a>
                        </div>
                    </div>
                    <div class="img-text" v-if="config ? config.Wallet.Wallet : true">
                        <img src="/img/icons/wallet.png"/>
                        <div>
                            <a data-nav="wallet" @click="clickNav">My Wallet</a>
                        </div>
                    </div>
                    <div class="img-text" v-if="logged">
                        <img src="/img/icons/account.png"/>
                        <div>
                            <a data-nav="account" @click="clickNav">Account Details</a>
                        </div>
                    </div>
                    <div class="img-text">
                        <img src="/img/icons/help.png"/>
                        <div>
                            <a data-nav="help" @click="clickNav">Wallet Help & Support</a>
                        </div>
                    </div>
                </div>
                <div class="tnc-container">
                    <p><a @click="clickPrivacy">Privacy Policy</a></p>
                    <p><a @click="clickTerms">Terms & Conditions</a></p>
                    <p v-if="logged"  class="logout" @click="logout">Log out</p>
                </div>

            </div>
        </v-card>
        </v-expand-transition>
    </div>
  </header>
</template>

<script>
export default {
    data(){
        return{
            isDark:false,
            isReward:false,
            expand: false
        }
    },
    watch:{
        $route(n,o){

        }
    },
    computed:{
      config(){
        return  this.$store.state.config
      },
        showProfile(){
            if(this.$route.name =='register'||this.$route.name =='login'||this.$store.state.config && this.$store.state.config.campaignTypes.authentication !='register'){
                return false
            }
            else{
                return true;
            }
        },
        ifRegister(){
            if (this.$store.state.authentication =='register'){
                return true;
            }
            else{
                return false;
            }
        },
        showMenu(){
            if(this.$route.name =='register'||this.$route.name =='rewardDetail'||this.$route.name =='login'||this.$route.name =='winners'){
                return false
            }
            else{
                return true;
            }
        },
        logged(){
           return this.$store.state.login
        }

    },
    methods:{
        toggleMenu(e){
            e.stopPropagation();
            e.target.classList.toggle('active');
            this.expand = !this.expand;
        },
        toggleLog(e){
            e.stopPropagation();
            this.logged = !this.logged
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
            location.href='/login';
        },
        logout(){
          sessionStorage.clear();
          this.expand = !this.expand;
          location.href="/";

        }
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
}
.nav-container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    z-index: 1;
    .nav-button{
        z-index: 9;
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
                }
            }
        }

    }
    @media only screen and (max-width: 767px) {
        .menu-container{
            right: -20px;
            top: 0px;
            margin-top: 35px;
            .wallet-swiper{
                width: 90%;
                .wallet-swiper-item img{
                    height: auto;
                }
            }
        }
    }
}
</style>
