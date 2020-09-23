<template>

</template>

<script>

export default {

  created() {
    this.setToken();
  },
  methods: {
    async setToken() {
    this.$store.commit('SET_TOKEN',this.$route.query.token)
    sessionStorage.token=this.$route.query.token;
    this.$router.push('/account');
    },
  },
};
</script>

