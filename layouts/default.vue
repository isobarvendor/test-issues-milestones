<template>
  <div>
    <Nuxt />
    <Header />
  </div>
</template>

<script>
import { FETCH_CMS_DATA} from '@/store/action_types';
import Header from "~/components/Header";
export default {
  components: {
    Header,
  },

  methods:{
    async fetchData(){
      let result = await this.$store.dispatch(FETCH_CMS_DATA);
    }
  },
   async created() {
     this.fetchData();
  },

};
</script>
<style lang="scss">
</style>
