<template>
    <div class="container sticky">
      <div class="container smaller-box" @click="scroll">
        <p>Participate Now</p>
      </div>
    </div>
</template>

<script>
    export default {
        methods:{
            scroll() {
                this.$emit("scroll");
            }
        }
    }
</script>

<style lang="scss" scoped>
.sticky{
  display: none;
}

.smaller-box{
  display: none;
}
@media only screen and (max-width: 500px) {
  .sticky{
    background-color: #111E72;
    position: fixed;
    bottom: 0;
    height: 70px;
    display: block;
    z-index: 99;
  }

.smaller-box{
  width: 90%;
  margin: auto;
  background-color:#73aa17;
  z-index: 999;
  bottom: 1;
  position: relative;
  height: 45px;
  display: block;
  p{
    margin: auto;
    text-align: center;
  }
}
}
</style>