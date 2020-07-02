<template>
  <div id="main">
    <div class="wrapper">
      <Masthead />
      <CampaignPeriod />
      <Prizes />
      <HowItWorks />
      <SubmissionMechanics />
    </div>
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import Masthead from '../components/Masthead'
import CampaignPeriod from '../components/CampaignPeriod'
import Prizes from '../components/Prizes'
import HowItWorks from '../components/HowItWorks'
import SubmissionMechanics from '../components/SubmissionMechanics'
import Footer from '../components/Footer'
export default {
  head() {
    return {
      title: "Coke Campaign Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page description"
        }
      ],
      noscript: [],
      script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],
      css: []
    };
  }
}
</script>

<style>
</style>
