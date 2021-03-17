<template>
  <footer>
      <div class="container">

        <p v-html="footerText" class="footer-text"></p>
        <!--p>
          <a href="/privacy">{{footer.privacy}}</a>
          <a href="/tnc">{{footer.terms}}</a>
        </p-->
      </div>
    </footer>
</template>

<script>
import {translation} from "@/constants/index"
export default {
    name:"Footer",
    props:{
      data:null
    },
    data(){
      return {
        footer:translation.footer,
      }
    },
    computed:{
      footerText(){
        if(this.data){
          var text = this.data.copyright.copyright;
          return text;
        }

      }
    },
    mounted(){


    }
}
</script>

<style>

</style>
