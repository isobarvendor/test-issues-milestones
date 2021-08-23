<template>
  <footer>
      <div class="footer">

        <p v-html="footerText" class="footer-text"></p>
        <p>
          <a href="/privacy">{{footer.privacy}}</a>
          <a href="/tnc">{{footer.terms}}</a>
        </p>
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
 .footer{
    @include column;
    position: relative;
    max-width: 1280px !important;
    overflow: hidden;
    width: 100%;
    padding: 1.4em 1.4em;
    background-color: #111E72;
    @include breakpoint(md){
      padding: 0 2em;
    }
 }
</style>
