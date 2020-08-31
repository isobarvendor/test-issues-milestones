<template>
  <header>
    <a class="profile-button" :class="{'dark': isDark}" @click="toggleLog">
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
    <a class="nav-button" @click="toggleMenu">
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
            isDark:false
        }
    },
    watch:{
        $route(n,o){
            console.log(n)
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