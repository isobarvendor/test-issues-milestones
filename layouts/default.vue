<template>
  <div  :class="contentClass"  >
      <v-progress-circular
      :width="5"
      color="white"
      indeterminate
        class="center-screen"
      v-if="loading"
    ></v-progress-circular>
    <Nuxt v-if="!errorMessage&&!loading&&!hideAll" />
     <div class="center-text" v-else-if="!loading&&!hideAll">
        <h1>{{errorMessage}}</h1>
        <p>{{globalError.tryagain}}</p>
      </div>
    <Header  v-if="!loading" @toggleMenu="toggleMenu" />
  </div>
</template>

<script>
import { FETCH_CMS_DATA , GET_CLIENT_INFO} from '@/store/action_types';
import {translation} from "@/constants/index"
import Header from "~/components/Header";
export default {
  components: {
    Header,
  },
  data(){
    return {
      errorMessage:null,
      loading:false,
      hideAll:false,
      globalError:translation.globalError
    }
  },
  computed:{
     contentClass(){
       let cmsContent=this.$store.getters.getCMSContent;
        if(cmsContent&&cmsContent[0].Theme){
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

    async fetchData(){
      this.loading=true;
      let language = this.$store.state.language;
      await this.$store.dispatch(FETCH_CMS_DATA, language).then(response=>{
        this.loading=false;
      }).catch(error=>{
        if(error){
            this.loading=false;
           this.errorMessage =this.globalError.errorAPI
        }

      })
    },
    toggleMenu(expand){
      if(this.$vuetify.breakpoint.name=='xs'){
        this.hideAll=expand;
      }
    },
    beforeRouteLeave (to, from, next) {
  // If the form is dirty and the user did not confirm leave,
  // prevent losing unsaved changes by canceling navigation
      if (this.confirmStayInDirtyForm()){
        next(false)
      } else {
        // Navigate to next view
        next()
      }
    },
    confirmLeave() {
        return window.confirm('Do you really want to leave? you have unsaved changes!')
      },

      confirmStayInDirtyForm() {
        return this.form_dirty && !this.confirmLeave()
      },
       beforeWindowUnload(e) {
        if (this.confirmStayInDirtyForm()) {
          // Cancel the event
          e.preventDefault()
          // Chrome requires returnValue to be set
          e.returnValue = ''
        }
      },
     IPtoNum(ip){
        return Number(
          ip.split(".")
            .map(d => ("000"+d).substr(-3) )
            .join("")
        );
      }

  },
  async mounted() {
     await this.fetchData();

      /*this.$store.dispatch(GET_CLIENT_INFO).then(response =>{
        const ranges = [
            ["49.213.64.0", "49.213.127.255"],
            ["42.1.64.0","42.1.127.255"],
            ["27.3.106.0","27.3.143.255"],
            ["61.28.224.0","61.28.255.255"],
            ["27.2.112.0","27.2.143.255"],
          ];

         // const ip = "49.213.127.200";
          const ip = response.ip;
          const inRange = ranges.some(
            ([min,max]) => this.IPtoNum(min) < this.IPtoNum(ip) &&   this.IPtoNum(max) > this.IPtoNum(ip)
          );
          this.$store.commit("SET_BAN_CITY",inRange);
         // console.log(response.ip);
       }).catch(error=>{

       })*/

  },
  created(){
     if (process.client) {
      window.addEventListener('beforeunload', this.beforeWindowUnload)
      let serverhost= window.location.href;
          let correctURL=serverhost.replace('www.','')
           let httpsURL=serverhost.replace('http:','https:')
          if(serverhost.match(/www/g)){
            location.assign(correctURL);
          }
            if(serverhost.match(/http:/g)){
            location.assign(httpsURL);
          }

     }
  }





};


</script>
<style lang="scss">
@import 'assets/scss/variables.scss';
  .center-screen{
     margin: auto;
    position: absolute;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;

  }
  .center-text{
    text-align: center;
    margin-top: 200px;
  }

</style>
