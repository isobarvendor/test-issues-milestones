<template>
  <v-row
    :id="'link-' + reward.title"
    
    class=" mb-4 toggle-sound paused center list-reward"
  >
    <audio
      v-if="reward.audio"
      :ref="'audio' + reward.id"
      :src="reward.audio"
      preload
      loop
      id="audio"
      muted
    ></audio>
    <v-col cols="2">
      <img :src="reward.image" width="100%" />
    </v-col>
    <v-col cols="10">
      <h3>ROV Box</h3>
      <div v-if="reward.code" class="copy-button-reward">
        <input type="text" :class="'redeem-rewards redeem-reward-' + reward.id" readonly :value="reward.code" />
        <button @click="copy([reward.code, 'redeem-reward-' + reward.id])" class="copy_code-reward">
          <img class="image" src="/develop/copy.png" />{{button}}
        </button>
      </div>
      <p>{{ reward.date }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MyRewardItem",
  props: {
    reward: {}
  },
  data() {
    return {
      button: "Copy",
    };
  },
  computed: {},
  methods: {
    toggleSound(rewardId, sound) {
      if (!sound) return false;
      let audio = this.$refs["audio" + rewardId];
      if (
        audio.paused &&
        document.querySelector(".toggle-sound").classList.contains("paused")
      ) {
        audio.play();
        document.querySelector(".toggle-sound").classList.remove("paused");
      } else {
        audio.pause();
        document.querySelector(".toggle-sound").classList.add("paused");
      }
    },
    redeemLink(link, voucherCode) {
      if (link) {
        window.open(
          link + "?" + this.$config.voucherParameter + "=" + voucherCode,
          "_blank"
        );
      } else {
        return false;
      }
    },
    copy(value) {
      let testingCodeToCopy = document.querySelector('.' + value[1]);
      testingCodeToCopy.value = value[0]
      try {
        var successful = document.execCommand("copy");
        if (successful) {
          this.button = "Copied!";
        }
      } catch (err) {}
      /* testingCodeToCopy.setAttribute('type', 'hidden') */
      setTimeout(() => {
        this.successCopy = false;
      }, 2000);
      window.getSelection().removeAllRanges();
    },
  },
  mounted() {}
};
</script>

<style>
.list-reward {
  margin-bottom: 20px;
}
.list-reward p {
  padding-top: 5px;
}

.copy-button-reward {
  display: flex;
  margin: 8px 0;
}

.copy_code-reward {
  margin-left: -20px;
  text-align: center;
  background: #73aa17;
  height: 39px;
  width: 120px;
  border-radius: 4px;
  box-shadow: 3px 3px 5px #707070;
  color: white;
  font-family: "Avenir";
  padding-left: 1cm;
  padding-right: 0.2cm;
  position: relative;
}

.redeem-rewards {
  background: white;
  border-radius: 4px;
  border: 2px solid #73aa17;
  padding-right: 20px;
  width: 200%;
  height: 39px;
  box-shadow: 3px 3px 5px #707070;
  text-align: center;
}

.image {
  width: 20px;
  height: 26px;
  position: absolute;
  top: 20%;
  right: 70%;
}
</style>
