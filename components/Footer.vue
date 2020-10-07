<template>
  <footer>
      <div class="container">
        <p v-html="footerText"></p>
        <p>
          <a href="/privacy">Privacy Policy</a>
          <a href="/tnc">Terms and conditions</a>
        </p>
      </div>
    </footer>
</template>

<script>
export default {
    name:"Footer",
    props:{
      data:null
    },
    data(){
      return {
      }
    },
    computed:{
      footerText(){
        if(this.data){
          var text = this.data.copyright.copyright;
          return text.replace(/The Coca-Cola Company/g, 'The&nbsp;Coca&#8209;Cola&nbsp;Company');
        }

      }
    },
    mounted(){

    }
}
</script>

<style>

</style>
