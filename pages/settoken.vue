<template>

</template>

<script>
import { GET_TOKEN } from '@/store/action_types';
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
      await this.$store.dispatch(GET_TOKEN)
            .then((response)=>{
            })
        console.log("token",this.$store.state.token);
        if(!this.$store.state.token){
          token=this.$route.query.token;
          await this.$store.commit('SET_TOKEN',token)
        }
       if(this.$store.state.token){
         Cookie.remove('tok_x_e_b')
          window.location.assign("/");
       }
    }

    },
  },
};
</script>

