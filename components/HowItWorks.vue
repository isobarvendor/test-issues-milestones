<template>
  <div class="container campaign-section">
    <div class="header">{{ data.title }}</div>
    <div class="howitworks">
      <div
        v-for="(item, idx) in data.slides"
        :key="'steps' + idx"
        class="howitworks-item"
      >
        <div class="howitworks-number">{{ idx + 1 }}</div>
        <img v-if="$mq == 'sm'" :src="item.mobileImage[0].url" />
        <img v-else :src="item.desktopImage[0].url" />
        <div>{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HowItWorks",
  props: {
    data: Object
  }
};
</script>

<style>
.howitworks {
  text-align: center;
}
</style>
