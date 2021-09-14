<template>
  <div >
  <div class="container howitworks hidden-sm-and-down">
    <div class="image-howitworks">
      <img :src="deskImg" />
    </div>
    
  </div>
  <div class=" hidden-md-and-up">
      <span><img id="image" :src="mobileImg" /></span>
  </div>
  </div>
</template>

<script>
export default {
  name: "HowItWorksFanta",
  props: {
    data: null
  },

  data() {
    return {
      deskImg: this.data.worksSection.DesktopImage[0].url,
      mobileImg: this.data.worksSection.MobileImage[0].url
    };
  }
};
</script>

<style>
.howitworks {
  background-image: url("/develop/background-howto.png");
  background-size: 100% 100%;
  
}

.howitworks .image-howitworks img{
  height: 100%;
  width: 100%;
  margin-bottom: -0.5%;
}

p {
  color: white;
}

.howitworks {
  text-align: center;
}

#image{
  max-height: 100%;
  max-width: 100%;
  display: block;
}



/* .container{
    margin: 1cm
} */

@media only screen and (max-width: 960px) {
  .mobile{
    width: 100vw;

  }
}


</style>
