<template>
  <div class="slider-header">
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletSliderHeader",
};
</script>
<style lang="scss">
.wallet{
  @media only screen and (max-width: 767px) {
    .slider-header{
      .title{
        font-size: 20px;
      }
    }
  }
}
</style>
