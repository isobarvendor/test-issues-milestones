<template>
  <div class="container campaign-section redbox-withwhiteborder submission-section" v-if="cmsData">
      <div class="divider">
        <img src="/img/landing/coke line divider.png" width="100%" />
      </div>
      <!--Login :social="dataSocial" v-if="campaignType.campaignTypes.authentication=='register'&& !this.$store.state.login"   /-->
      <!--Form :data="dataForm" :cmsData="cmsData[0]"  v-if="campaignType.campaignTypes.authentication!='register'|| this.$store.state.login"  /-->
      <Login :social="dataSocial" v-if="false"   />
      <Form :data="dataForm" :cmsData="cmsData[0]" />

  </div>
</template>

<script>
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
export default {
  name: "SubmissionMechanics",
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
