<template>
  <header>
    <a class="profile-button" :class="{'dark': isDark}" @click="toggleLog" v-if="showProfile">
        <img class="profile-image" src="/img/dummy_profile.jpg">
        <div class="profile-content">
            <template v-if="logged">Sign in</template>
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
    <a class="nav-button" @click="toggleMenu" v-if="showMenu">
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </a>
  </header>
</template>

<script>
export default {
    data(){
        return{
            logged:false,
            isDark:false,
            isReward:false
        }
    },
    watch:{
        $route(n,o){
            console.log(n)
        }
    },
    computed:{
        showProfile(){
            if(this.$route.name =='register'||this.$route.name =='login'){
                return false
            }
            else{
                return true;
            }
        },
        showMenu(){
            if(this.$route.name =='register'||this.$route.name =='rewardDetail'||this.$route.name =='login'){
                return false
            }
            else{
                return true;
            }
        }
    },
    methods:{
        toggleMenu(e){
            e.stopPropagation();
            e.target.classList.toggle('active')
        },
        toggleLog(e){
            e.stopPropagation();
            this.logged = !this.logged
        }
    }, 
    mounted(){
        this.isDark = this.$route.name!="index"
    }
};
</script>

<style>
</style>