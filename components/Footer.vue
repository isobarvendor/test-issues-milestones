<template>
  <footer>
      <div class="container">
        <p v-html="footerText"></p>
        <p>
          <a href="">Privacy Policy</a>
          <a href="">Terms and conditions</a>
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
        footerText:''
      }
    },
    mounted(){
      var text = this.data.footerText;
      this.footerText = text.replace(/The Coca-Cola Company/g, 'The&nbsp;Coca&#8209;Cola&nbsp;Company');
    }
}
</script>

<style>

</style>