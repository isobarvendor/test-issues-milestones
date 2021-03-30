<template>
      <div>
        <v-row :id="'link-'+reward.title"  @click="reward.audio ? toggleSound(reward.id,reward.audio) : redeemLink(reward.link,reward.code)" class=" mb-4 toggle-sound paused center list-reward" >

            <v-col cols="3" >
                <img :src="reward.image" width="100%" />
            </v-col>
            <v-col cols="9">
                <h3>{{reward.title}}</h3>
                <p v-if="reward.code">Voucher Code : {{reward.code}}</p>
                <p>{{reward.date}}</p>
            </v-col>
        </v-row>
        <div class="audio-area">
          <audio controls v-if="playSound">
                <source :src="audio" type="audio/mpeg">
              </audio>
        </div>
        <div v-html="reward.description" class="description"/>
      </div>
</template>

<script>
export default {
    name:"MyRewardItem",
    props:{
      reward:{}
    },
    data(){
      return {
        playSound:false,
        audio:null
      }
    },
    computed:{

    },
    methods:{
        toggleSound(rewardId,sound) {
          this.audio=sound;
          this.playSound=true;
      },
      redeemLink(link,voucherCode){
        if(link){
          window.open(link+"?"+this.$config.voucherParameter+"="+voucherCode,"_blank");
        }else{
          return false;
        }

      }
    },
    mounted(){

    }
}
</script>

<style>
.list-reward{
    margin-bottom:20px;
}
.list-reward p {
    padding-top: 5px;
}
.audio-area{
  max-width: 360px;
  margin: auto;
}
.audio-area audio{
  width: 100%;
  margin: auto;
}
</style>
