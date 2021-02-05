<template>
        <v-row  @click="toggleSound(reward.id,reward.audio)" class="mb-4 toggle-sound paused center list-reward" >
              <audio
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
            <v-col cols="6">
                <h3>{{reward.title}}</h3>
                <p>{{reward.date}}</p>
            </v-col>
        </v-row>
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
