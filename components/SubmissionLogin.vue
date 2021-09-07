<template>
  <div class="login-box column center mechanics">
    <p class="text-center" v-html="submissionText.siginHeader"></p>
    <a
      class="social-button fb"
      id="login_fb"
      v-on:click="redirectTo('facebook')"
      v-if="social.facebook"
      ><i class="ic ic-fb" /><span
        >{{ submissionText.continue }} Facebook</span
      ></a
    >
    <a
      class="social-button line"
      v-on:click="redirectTo('line')"
      v-if="social.line"
      ><i class="ic ic-line" /><span
        >{{ submissionText.continue }} LINE</span
      ></a
    >
    <a
      class="social-button google"
      id="login_google"
      v-on:click="redirectTo('google')"
      v-if="social.google"
      ><i class="ic ic-google" /><span
        >{{ submissionText.continue }} Google</span
      ></a
    >
    <a class="social-button email" href="/login" v-if="social.email"
      ><i class="ic ic-email" /><span
        >{{ submissionText.continue }} email</span
      ></a
    >
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { translation } from "@/constants/index";
export default {
  name: "Login",
  props: {
    data: null,
    social: null
  },
  data() {
    return {
      submissionText: translation.submissionText
    };
  },
  methods: {
    redirectTo(source) {
      location.href =
        "/api/oauth2/authorize/" +
        source +
        "?redirect_uri=" +
        window.location.origin +
        "/settoken";
    }
  },
  mounted() {
//     if (location.protocol !== 'https:') {
//     location.replace(`https:${location.href.substring(location.protocol.length)}`);
// }
  },
  computed: {
    errorMessage() {
      return this.$store.state.errorLogin;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.error {
  color: #000;
  margin-top: 30px;
}
</style>
