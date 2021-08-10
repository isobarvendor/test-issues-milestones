<template>
    <div class='container prize' style="">
        <div class="header-title">
            <img src="/develop/banner.png">
            <div class="title">
                <p>PRIZES</p>
            </div>
        </div>
        <div class="prizes">
            <div v-for="(item,index) in prizes" :key="index">
                <div id="header">
                    <p>{{ item.header }}</p>
                </div>
                <div class="bigger-box">
                    <div class="image-box">
                        <img :src="item.image"/>
                    </div>
                    <div class="text-box">
                        <div id='text'>
                            <h3><strong>{{ item.title }}</strong></h3>
                            <div v-if="item.number" id="number">
                                <h4>{{ item.number }}</h4>
                            </div>
                            <div v-if="item.subtitle">
                                <h4 >{{ item.subtitle }}</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <v-dialog
                        v-model="item.dialog"
                        width="1500"
                        >
                        <template v-slot:activator="{ on }">
                            <!-- <v-btn
                            dark
                            v-on="on"
                            class="button"
                            >
                            Click Me
                            </v-btn> -->
                            <button class="button" 
                            v-on="on"><strong>View more</strong></button>
                        </template>

                        <v-card class="card">
                            
                            <div class='button-close'>
                                <img @click="item.dialog = false" src="/img/icons/close.png" alt="">
                            </div>
                            <div class="header">
                                <p style="color: whiter;">WIN ANY OF THESE ROV SKINS</p>
                                <!-- <button @click="item.dialog = false">Close</button> -->
                            </div>
                            <div class="images">
                                <div class="hidden-sm-and-down">
                                    <div v-for="(item, index) in final_images(4)" :key="index" class="image-row" >
                                        <div v-for="(item2, index2) in item" :key="index2" class="image">
                                            <img src="/develop/popup.png">
                                            <div>
                                                <p style="color: black;">{{ item2.title }}</p>
                                            </div>
                                        </div>
                                        <br>
                                    </div>
                                </div>
                                <div class="hidden-md-and-up">
                                    <div v-for="(item, index) in final_images(2)" :key="index" class="image-row" >
                                        <div v-for="(item2, index2) in item" :key="index2" class="image">
                                            <img src="/develop/popup.png" alt="">
                                            <div>
                                                <p>{{ item2.title }}</p>
                                            </div>
                                        </div>
                                        <br>
                                    </div>
                                </div>
                            </div>
                            

                            
                            
                            
                        </v-card>
                    </v-dialog>
                    
                </div>
            </div>
            
        </div>
            
        
    </div>
</template>

<script>

import * as _ from "lodash";
    export default {
        data(){
            return {
                prizes: [{header: "INSTANT WIN", title: "1.5 Million Fanta x ROV Boxes", number: "1,234,567 remaining", subtitle: null, image: "/develop/fanta-prize.png", dialog: false}, 
                        {header: "CHANCE TO WIN WEEKLY", title: "iPhone 12, 128GB", number: null, subtitle: "15 Prizes giveaway weekly", image: "/develop/iphone.png", dialog: false}],
                dialog: false,
                images: [{img: "/img/ROV.jpeg", title: "Some information about the ROV Skins"}, 
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"}, 
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"}, 
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"},
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"},
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"},
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"},
                {img: "/develop/popup.png", title: "Some information about the ROV Skins"}]
            }
        },
        methods: {
            final_images(num){
                return _.chunk(this.images, num);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .prize{
        background-image: url('/develop/background-prizes.png');
        background-size: cover;
    }

    .header-title{
        /* position: absolute;
        top: 0;
        right: 25%; */
        margin-top: 0;
        text-align: center;
        height: 230px;
        img{
            height: 240px;
        }
    }

    #header{
        text-align: center;
        font-family: "Hackney";
        font-size: 30px;
    }
    
    .bigger-box{
        margin: 0 1cm 0.5cm 1cm;
        padding-top: 1rem;
        background-color: #111E72;
        /* height: 400px;
        width: 300px; */
    }

    .prizes {
        /* padding-top: 2.2cm; */
        display: flex;
        justify-content: center;
    }

    .image-box{
        height: 260px;
        width: 260px;
        margin: auto;
    }

    .title{
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        p {
            font-size: 55px;
            font-family: "Hackney";
        }
    }

    .text-box{
        height: 80px;
        width: 260px;
        margin: auto;
        

    }

    #text{
        text-align: center;
        h3{
            font-family: "Avenir";
            font-size: 17px;
            color: white;
            margin-top: 8px;
            margin-bottom: 4px;
        }
    
        div{
            height: 34px;
            
            
            h4{
                font-family: "Avenir";
                margin: auto;
                color: white;
                font-weight: bold;
                padding-top: 3%;
                /* margin-top: 16px; */
            }
        }
        #number{
            height: 34px;
            /* margin: auto; */
            
            background: #F27C00;
            padding-bottom: 40px;
            
        }
    }

    .button {
        background-color: #73AA17;
        color: white;
        font-size: 14px;
        width: 300px;
        border-radius: 5px;
        margin: 0 1cm 1cm 1cm;
        text-align: center;
        height: 1cm;
        font-family: "Avenir";
        box-shadow: 3px 3px 5px #707070;
    }

    .card {
        position: relative;
        background-color: #F0E7DB;
        opacity: 0.93;
    }

    

    .card .button-close{
        position: absolute;
        right: 5%;
        top: 5%;
        
    }

    .images{
        padding-top: 2cm;
    }

    .header{
        /* text-align: center; */
        display: flex;
        justify-content: center;
        padding-top: 3rem;
        background-image: url('/develop/banner-popup.png');
        background-position: 50% 0%;
        background-size: 700px 200px;
        margin-bottom: 0;
        
    }

    .image-row{
        display: flex;
        justify-content: center;
        width: 60%;
        margin: auto;
        img{
            width: 228px;
            height: 261px;
        }
        div{
            font-size: 16px;
            text-align: center;
            margin-top: -1cm;
            margin-bottom: 1.5cm;
            p{
                width: 170px;
                margin: auto;
            }
            
        }
    }

    .image{
        width: 228px;
        height: 261px;
    }

</style>