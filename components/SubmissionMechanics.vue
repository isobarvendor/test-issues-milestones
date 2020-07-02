<template>
  <div class="container campaign-section">
      <div class="header">Be the lucky one</div>
      <Form />
      <Login />
  </div>
</template>

<script>
import Login from './SubmissionLogin'
import Form from './SubmissionForm'
export default {
  components:{
    Login,
    Form
  }
}
</script>

<style>

</style>