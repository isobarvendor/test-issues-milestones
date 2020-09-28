<template>
  <div v-if="dataStatus.status == 200" id="main" class="register">
    <div class="wrapper">
      <div class="container">
        <Registration :data="data ? data[0].signUp : null"/>
      </div>

    </div>
  </div>
  <div v-else-if="dataStatus.status >= 500">
    Status: {{dataStatus.status}}
    <br />
    {{dataStatus.message}}
  </div>
</template>

<script>
import Registration from '@/components/Registration'
export default {
  data(){
    return{
      dataStatus:{},
      data:null,
    }
  },
  head() {
    return {
      title: "Coke Campaign Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description"
        }
      ],
      noscript: [],
      script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],
      css: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let result = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaigns"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.data = result.data;
    },
  },
};
</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
  html, body{
    background: $body-bg-color-wallet;
    @media only screen and (max-width: 767px) {
      .register{
      }
    }
  }
</style>