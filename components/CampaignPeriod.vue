<template>
  <div class="container campaign-section">
    <p>Participation Period</p>
    <p class="campaign-period">{{startdate}} – {{enddate}}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      startdate: null,
      enddate: null
    };
  },
  props: {
    data: null
  },
  beforeMount() {
    this.startdate = moment(this.data.fromDate).format("ll");
    this.enddate = moment(this.data.toDate).format("ll");
  }
};
</script>

<style>
</style>