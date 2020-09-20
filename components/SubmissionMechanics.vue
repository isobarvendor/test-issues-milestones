<template>
  <div class="container campaign-section">
      <div class="header">Be the lucky one</div>
      <Form />
      <Login 
        :email="dataSocial.email"
        :facebook="dataSocial.facebook"
        :google="dataSocial.google"
        :line="dataSocial.line"
      />
  </div>
</template>

<script>
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
export default {
  components:{
    Login,
    Form
  },
  data() {
    return {
      dataSocial: {}
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let result = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaigns"
      );
      let config = await this.$axios.get(
        "https://ayo.aircovery.com/cms-api/campaign-configurations"
      );
      this.dataStatus = { status: result.status, message: result.statusText };
      this.dataSocial = { 
        email: config.data[0].socialMedia.Email, 
        facebook: config.data[0].socialMedia.Facebook,
        google: config.data[0].socialMedia.Google,
        line: config.data[0].socialMedia.Line,
      };
      this.data = result.data;
    },
  },
}
</script>

<style>

</style>