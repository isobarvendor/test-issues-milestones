<template>
  <div  id="main" class="container myrewards black-red-border">
    <div class="wrapper">
            <div class="background-image">
                <img src="/img/landing/back-dots.png" width="100%" />
            </div>
            <div class="title">
                <h1>YOUR REWARDS</h1>
            </div>
            <div class="rewards-area">
                <div v-for="item in rewards" :key="item.id">
                    <MyRewardItem :reward="item" />
                </div>
            </div>

      </div>
  </div>
</template>


<script >
import MyRewardItem from '../components/MyRewardItem'



export default {
  name:"myrewards",
  components:{
    MyRewardItem
  },
  data(){
    return{
        rewards:[
            {id: 1 , image:"/img/landing/week 1 prize.png", title:"prize 1", audio : null, date:'02/02/2021 - 16:02' },
             {id: 2 , image:"/img/landing/week 2 prize.png", title:"prize 2", audio : null, date:'02/02/2021 - 16:02' },
              {id: 3 , image:"/img/landing/week 3 prize.png", title:"prize 3", audio :"/img/sample.mp3", date:'02/02/2021 - 16:02' },
        ]
    }
  },
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
      /*script: [
        {
          hid: "anime",
          src: "/js/anime.min.js"
        }
      ],*/
      css: []
    };
  },
  props: {

  },
  mounted(){
  
  },

  methods:{
 


  },
  computed: {

  },

}
</script>
<style scoped>
 

    
</style>