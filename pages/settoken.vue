<template>

</template>

<script>
import { GET_TOKEN } from '@/store/action_types';
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
          this.$router.push("/");
       }
    }else{
      await this.$store.commit('SET_TOKEN',null)
      await this.$store.commit('SET_ERROR',null)
      await this.$store.dispatch(GET_TOKEN)
            .then((response)=>{
                 if(this.$store.state.token){
                      this.$router.push("/");
                  }
            })
       // console.log("token",this.$store.state.token);

    }

    },

  },
};
</script>

