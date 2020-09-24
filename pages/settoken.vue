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
    if(this.$route.query.from=="home"){
       this.$router.push('/');
    }else{
        this.$router.push('/account');
    }

    },
  },
};
</script>

