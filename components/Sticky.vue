<template>
    <div class="container sticky">
      <div class="container smaller-box" @click="scroll" id="scrollToSubmission">
        <p>{{label}}</p>
      </div>
      <div class="container smaller-box" @click="goTo" id="redirectToRewards">
        <p>{{redirect}}</p>
      </div>
    </div>
</template>

<script>
    export default {
       name:"Sticky",
        props: {
          label: null,
          redirect: null
        },
        methods:{
            scroll() {
                this.$emit("scroll");
            },
            goTo(){
              const origin = window.location.origin;
              window.location.href = origin + "/myrewards"
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
    display: flex;
    z-index: 50;
    flex-direction: row;
  }

.smaller-box{
  width: 45%;
  margin: auto;
  background-color:#73aa17;
  z-index: 99;
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
