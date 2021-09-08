<template>

</template>

<script>

export default {

  async mounted() {
    await this.setToken();
  },
  methods: {
    async setToken() {
    if(this.$route.query.error){
      await this.$store.commit('SET_TOKEN',null)
      await this.$store.commit('SET_ERROR',this.$route.query.error)
        if(this.$store.state.errorLogin)
      {
         this.$router.push("/")
      }
    }else{
      await this.$store.commit('SET_ERROR',null)
      await this.$store.commit('SET_TOKEN',this.$route.query.token)
      if(this.$store.state.token)
      {
         this.$router.push("/")
      }
    }

    },
  },
};
</script>

