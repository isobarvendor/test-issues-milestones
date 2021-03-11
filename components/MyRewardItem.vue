<template>
        <v-row :id="'link-'+reward.title"  @click="reward.audio ? toggleSound(reward.id,reward.audio) : redeemLink(reward.link,reward.code)" class=" mb-4 toggle-sound paused center list-reward" >
              <audio
                v-if="reward.audio"
                :ref="'audio'+reward.id"
                :src="reward.audio"
                preload
                loop
                id="audio"
                muted
                ></audio>
            <v-col cols="3" >
                <img :src="reward.image" width="100%" />
            </v-col>
            <v-col cols="9">
                <h3>{{reward.title}}</h3>
                <p v-if="reward.code">Voucher Code : {{reward.code}}</p>
                <p>{{reward.date}}</p>
            </v-col>
        </v-row>
        <div v-html="reward.description" v-if="reward.description" class="description"/>
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
      }
    },
    computed:{

    },
    methods:{
        toggleSound(rewardId,sound) {
            if(!sound) return false;
            let audio = this.$refs['audio'+rewardId];
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
</style>
