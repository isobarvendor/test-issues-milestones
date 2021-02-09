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
         console.log(test)
        if (this.confirmStayInDirtyForm()) {
          // Cancel the event
          e.preventDefault()
          // Chrome requires returnValue to be set
          e.returnValue = ''
        }   
      },

     
  },
  mounted() {
     this.fetchData();
    
    
  },
  created(){
     if (process.client) {
      window.addEventListener('beforeunload', this.beforeWindowUnload)
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
