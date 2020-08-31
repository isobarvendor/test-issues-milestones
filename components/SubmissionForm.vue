<template>
  <form>
    <div>
      <input type="text" name="name" placeholder="Name"/>
    </div>
    <div>
      <input type="email" name="email" placeholder="Email"/>
    </div>

    <div class="row top">
      <div class="checkbox">
        <label for="form_tnc">
          <input type="checkbox" name="tnc" id="form_tnc" checked>
          <span></span>
        </label>
      </div>
      <div>I accept the <a href="">Terms and Conditions</a> of this this redemption.</div>
    </div>
    

    <div class="row top">
      <div class="checkbox">
        <label for="form_pp">
          <input type="checkbox" name="privacy" id="form_pp" checked>
          <span></span>
        </label>
      </div>
      <div>I accept the <a href="">Privacy Policy</a> of this redemption.</div>
    </div>

  </form>    
</template>

<script>
export default {
    name:"Form"
}
</script>

<style>

</style>