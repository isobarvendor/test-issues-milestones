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
        <p>Please try again</p>
      </div>
    <Header  v-if="!loading" @toggleMenu="toggleMenu" />
  </div>
</template>

<script>
import { FETCH_CMS_DATA} from '@/store/action_types';
import Header from "~/components/Header";
export default {
  components: {
    Header,
  },
  data(){
    return {
      errorMessage:null,
      loading:false,
      hideAll:false
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
      this.$store.dispatch(FETCH_CMS_DATA, language).then(response=>{
        this.loading=false;
      }).catch(error=>{
        if(error){
            this.loading=false;
           this.errorMessage = "Oops something went wrong"
        }

      })
    },
    toggleMenu(expand){
      if(this.$vuetify.breakpoint.name=='xs'){
        this.hideAll=expand;
      }
    }
  },
  mounted() {
     this.fetchData();
  },

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
