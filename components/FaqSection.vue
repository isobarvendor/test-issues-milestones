<template>
<div class="faq-section">
    <SliderHeader>{{data.subTitle}}</SliderHeader>
    <div class="">
      <v-expansion-panels
        multiple
        class="accordions"
        dark
      >
        <v-expansion-panel v-for="(item, index) in data.helpQuestion" :key="'question-'+index">
          <v-expansion-panel-header>{{item.questions}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{item.answer}}
          </v-expansion-panel-content>
        </v-expansion-panel>
  
      </v-expansion-panels>
    </div>
    <SliderHeader>{{data.contactLabel}}</SliderHeader>
    <div class="contact-section"><p v-html="data.contactDescription"></p></div>
</div>
</template>

<script>
import SliderHeader from "@/components/WalletSliderHeader";
export default {
  name: "FaqSection",
  components: {
    SliderHeader
  },
  data() {
    return {
    };
  },
  props: {
    data: null,
    disabled: null
  },
  computed:{
  },
  methods:{
  },
  beforeMount() {},
  mounted(){

  }
};
</script>

<style lang="scss">
.faq-section{
    .accordions{
        margin: 65px auto;
        width: 80%;
        .v-expansion-panel-header__icon{
            margin-left: auto;
        }
        .v-expansion-panel{
            background: transparent;
            color: #ffffff;
            border-bottom: 1px solid #585858;
        }
    }
    .contact-section{
        margin-top: 30px;
        line-height: 24px;
    }
    a{
        color: #FFC529;
    }
    @media only screen and (max-width: 767px) {
        .slider-header .title{
            font-size: 16px
        }
        .accordions{
            width: 100%;
            font-size: 14px;
            margin-top: 40px;
            .v-expansion-panel-header{
                font-size: 14px;
            }
        }
        
    }  
}
</style>
