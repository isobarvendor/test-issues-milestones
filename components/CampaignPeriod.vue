<template>
  <div class="container campaign-section">
    <p>{{this.data.Title}}</p>
    <p class="campaign-period">{{startdate}} – {{enddate}}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {

    };
  },
  computed:{
    startdate (){
        return this.data && moment(this.data.fromDate).format("ll")
    },
    enddate (){
      return this.data && moment(this.data.toDate).format("ll");
    }
  }
  ,
  props: {
    data: null
  },
  beforeMount() {

  }
};
</script>

<style>
</style>
