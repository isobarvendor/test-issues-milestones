<template>

</template>

<script>
import Cookie from 'js-cookie'
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
        let token = Cookie.get('tok_x_e_b');
        console.log("token",token);
        if(!token){
          token=this.$route.query.token;
        }
       await this.$store.commit('SET_TOKEN',token)
       if(this.$store.state.token){
         Cookie.remove('tok_x_e_b')
          window.location.assign("/");
       }
    }

    },

  },
};
</script>

