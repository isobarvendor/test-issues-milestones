<template>
  <div class="container howitworks">
      
    <v-row no-gutters>
        <v-col cols="4">
            <div class="ROV"><img src="/develop/ROV.png"/></div>
        </v-col>
        <v-col cols="4">
            <div class="iphone">
                <v-row no-gutters class="title"><img src="/develop/howitworks-header.png"/></v-row>
                <v-row no-gutters class="subtitle">
                    <img src="/develop/howitworks-subheader.png"/>
                </v-row>
                <v-row >
                    <img class="iphone-photo" src="/develop/howitworks-fanta.png"/>
                </v-row>
                <v-row>
                    <img class="iphone-subheader" src="/develop/howitworks-iphone-subheader.png" alt="">
                </v-row>
            </div>
        </v-col>
        <v-col cols="4">
            <div class="works">
                <v-row><p class="works-title">HOW IT WORKS</p></v-row>
                <v-row>
                    <ul>
                        <li v-for="(item, index) in works" :key="index">
                            <p> {{ item }} </p>
                        </li>
                    </ul>
                </v-row>
            </div>
            
        </v-col>
        
    </v-row>
  </div>
</template>

<script>
export default {
   name: "HowItWorksFanta",
 

  
  data(){
      return {
          works: ['Buy the specially marked Fanta packs', 'Look for the code under the Gold Cap of your Fanta bottle', 'Enter your details with the unique code to stand a chance to win EPIC prizes' ]
      }
  }
};
</script>

<style>
.howitworks{
    background-image: url('/develop/background-howto.png');
    background-size: 100% 100%;
}

p{
    color: white;
}

.howitworks{
  text-align: center;
}

/* .container{
    margin: 1cm
} */

img{
    max-height: 100%;
    max-width: 100%;
}

.works{
    margin-left: 50px;
    padding: 1.5cm;
}

.works li{
    padding: 1cm; 
    list-style: none;
}

.works-title{
    margin: auto
}

.iphone {
    padding: 1.1cm;
    margin-left: 50px;
}

.title{
    font-size: 30px;
}

.subtitle{
    font-size: 15px;
    padding: 0.5cm 0;
    
}

.iphone-photo{
    width: 189.85px;
    height: 147px;
    margin: auto;
    
    
}

.iphone-subheader{
    width: 154.88px;
    height:20.72px;
    margin: 0.5cm auto auto auto;
}

.ROV{
    height: 100%;
    width: 100%;
    margin: auto;
    align-content: center;
}

.ROV img{
    margin-top: 1cm;
    margin-left: 1.5cm;
    height: 619px;
    width: 409.54px;
}
</style>
