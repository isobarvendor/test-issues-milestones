<template>
  <div class="container howitworks">
    <div class="image">
      <img class="hidden-sm-and-down" :src="deskImg" />
      <img class="hidden-md-and-up" :src="mobileImg" />
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

.howitworks .image img{
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

/* .container{
    margin: 1cm
} */

img {
  max-height: 100%;
  max-width: 100%;
}

.works {
  margin-left: 50px;
  padding: 1.5cm;
}

.works li {
  padding: 1cm;
  list-style: none;
}

.works-title {
  margin: auto;
}

.iphone {
  padding: 1.1cm;
  margin-left: 50px;
}

.title {
  font-size: 30px;
}

.subtitle {
  font-size: 15px;
  padding: 0.5cm 0;
}

.iphone-photo {
  width: 189.85px;
  height: 147px;
  margin: auto;
}

.iphone-subheader {
  width: 154.88px;
  height: 20.72px;
  margin: 0.5cm auto auto auto;
}

.ROV {
  height: 100%;
  width: 100%;
  margin: auto;
  align-content: center;
}

.ROV img {
  margin-top: 1cm;
  margin-left: 1.5cm;
  height: 619px;
  width: 409.54px;
}
</style>
