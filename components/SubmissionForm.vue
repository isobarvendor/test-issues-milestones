<template>
  <form>

    <div>
      <input type="text" name="name" placeholder="Name"/>
    </div>
    <div>
      <input type="email" name="email" placeholder="Email"/>
    </div>
    <div>
      <input type="number" name="code" placeholder="10-digit code"/>
    </div>

    <br>

    <div class="row top">
      <div class="col d-flex">
        <div class="checkbox">
          <label for="form_tnc">
            <input type="checkbox" name="tnc" id="form_tnc">
            <span></span>
          </label>
        </div>
        <div>I accept the <a href="">Terms and Conditions</a> of this this redemption.</div>
      </div>
    </div>
    
    <div class="row top">
      <div class="col d-flex">
        <div class="checkbox">
          <label for="form_pp">
            <input type="checkbox" name="privacy" id="form_pp">
            <span></span>
          </label>
        </div>
        <div>I accept the <a href="">Privacy Policy</a> of this redemption.</div>
      </div>
    </div>

    <v-btn class="get-code">Get code</v-btn>

  </form>    
</template>

<script>
export default {
    name:"Form"
}
</script>

<style scoped>
  .d-flex {
    display: flex;
    align-items: center;
  }
  .get-code {
    display: block;
    width: 100%;
    margin: 25px 0;
  }
</style>