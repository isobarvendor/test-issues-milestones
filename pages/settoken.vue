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
      await this.$store.commit('SET_TOKEN',null)
      await this.$store.commit('SET_ERROR',this.$route.query.error)
       if(this.$store.state.errorLogin){
          window.location.assign("/");
       }
    }else{
      await this.$store.commit('SET_ERROR',null)
        let token = getCookie("tok_x_e_b");
       await this.$store.commit('SET_TOKEN',token)
       if(this.$store.state.token){
          document.cookie = "tok_x_e_b" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          window.location.assign("/");
       }
    }

    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  },
};
</script>

