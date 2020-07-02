<template>
  <div class="container campaign-section">
      <div class="header">How it works</div>
      <div class="howitworks">
        <div v-for="i in 5" :key="'steps'+i" class="howitworks-item">
          <div class="howitworks-number">{{i}}</div>
          <img src="/img/step_dummy.svg">
          <div>Buy $10 worth of Coca-Cola</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>