<template>

</template>

<script>

export default {

  mounted() {
    this.setToken();
  },
  methods: {
    async setToken() {
    if(this.$route.query.error){
       this.$store.commit('SET_TOKEN',null)
      this.$store.commit('SET_ERROR',this.$route.query.error)
    }else{
      this.$store.commit('SET_ERROR',null)
       this.$store.commit('SET_TOKEN',this.$route.query.token)
    }
        this.$router.push({ path: '/' })
    },
  },
};
</script>

