<template>
  <footer>
      <div class="container">
        <p>{{data.footerText}}</p>
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
    }
}
</script>

<style>

</style>