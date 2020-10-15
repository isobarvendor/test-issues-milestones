<template>
  <div class="container campaign-section" v-if="cmsData">
      <Login :social="dataSocial" v-if="campaignType.campaignTypes.authentication=='register'&& !this.$store.state.login"  />
      <Form :data="dataForm" :cmsData="cmsData[0]"  v-if="campaignType.campaignTypes.authentication!='register'|| this.$store.state.login"  />

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
   props: {
        dataForm: null,
      },
  data() {
    return {

    }
  },
    computed:{
    campaignType(){
      return this.dataForm;
    },
    cmsData(){
      return this.$store.getters.getCMSContent;
    },
    dataSocial() {
      return {
        email: this.dataForm .socialMedia.Email,
        facebook: this.dataForm .socialMedia.Facebook,
        google: this.dataForm .socialMedia.Google,
        line: this.dataForm.socialMedia.Line,
      }
    }
  },

  methods: {

  },
}
</script>

<style>

</style>
