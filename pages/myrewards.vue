<template>
  <div id="main" class="container myrewards black-red-border">
    <div class="wrapper">
      <div class="background-image">
        <img src="/img/landing/back-dots.png" width="100%" />
      </div>
      <div class="title">
        <h1>YOUR REWARDS</h1>
      </div>
      <div class="rewards-area">
        <div v-for="item in rewards" :key="item.id">
          <MyRewardItem :reward="item" v-if="item.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyRewardItem from "../components/MyRewardItem";
import * as _ from "lodash";
import moment from "moment";
import { GET_MY_PRIZE } from "@/store/action_types";
import { translation } from "@/constants/index";
export default {
  name: "myrewards",
  components: {
    MyRewardItem
  },
  data() {
    return {
      rewards: [],
      browserTitle: translation.browserTitle,
      metaData: translation.meta
    };
  },
  head() {
    return {
      title: this.browserTitle,
      meta: this.metaData
    };
  },
  props: {},
  mounted() {
    this.getMyPrize();
  },

  methods: {
    getMyPrize() {
      let configID = this.$config.configID.split(",");
      if (configID.length > 0) {
        let array = [];
        let showOnce = 0;
        for (let a = 0; a < configID.length; a++) {
          this.$store
            .dispatch(GET_MY_PRIZE, configID[a])
            .then(response => {
              // console.log(response);
              let vouchersData = response.data.vouchers;
              // console.log("original ======");
              // console.log(vouchersData);
              vouchersData = _.orderBy(vouchersData, "claimTimestamp", "desc");
              // coneole.log("sorted ======");
              // console.log(vouchersData);
              let res = _.map(vouchersData, (o, index) => {
                if (this.$config.prizeShowOnce.includes(o.prizeId)) {
                  showOnce++;
                }
                if (
                  showOnce == 1 ||
                  !this.$config.prizeShowOnce.includes(o.prizeId)
                ) {
                  let voucherCode = this.$config.prizeShowOnce.includes(
                    o.prizeId
                  )
                    ? null
                    : o.voucher;
                  if (
                    o.name.includes("Samsung") ||
                    o.name.includes("Playlist")
                  ) {
                    voucherCode = null;
                  }
                  return {
                    id: index,
                    title: o.name,
                    date: this.$config.prizeShowOnce.includes(o.prizeId)
                      ? null
                      : moment(o.claimTimestamp).format("DD/MM/YYYY - H:mm"),
                    link: o.redemptionLink,
                    image: o.imgUrl,
                    code: voucherCode,
                    audio:
                      o.redemptionLink && o.redemptionLink.includes(".mp3")
                        ? o.redemptionLink
                        : null,
                    description: o.redeemDescription
                  };
                } else {
                  return {
                    id: null,
                    title: null,
                    date: null,
                    link: null,
                    image: null,
                    code: null,
                    audio: null,
                    description: null
                  };
                }
              });
              // console.log("original ==============");
              // console.log(res);
              let newRes = _.orderBy(res, ["date"], ["desc"]);
              // console.log("sorted ==============");
              // console.log(newRes);
              this.rewards = [...this.rewards, ...[...array, ...res]];
            })
            .catch(error => {
              if (error.response && error.response.data.status == "401") {
                localStorage.clear();
                this.$store.commit("SET_TOKEN", null);
                this.$store.commit("SET_LOGIN_ACCOUNT", null);
                location.assign("/");
              }
            });
        }
      }
    }
  },
  computed: {
    configData() {
      return this.$store.getters.getCMSConfig;
    }
  }
};
</script>
<style scoped></style>
