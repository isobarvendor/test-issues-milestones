<template>
    <div class="container lucky-draw">
        <div class="draw">
            <div class="image">
                <img :src="cms.luckyWinner.image[0].url" alt="">
            </div>
            <div class="text-box">
                <div class="text">
                    <div class="all-text" v-html="data.attempts[0].FormHeading.Prize"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: null,
            cms: null
        }
    }
</script>

<style lang="scss" scoped>
    .lucky-draw{
        background-image: url('/develop/background-lucky-2.png');
        background-size: 100% 100%;
    }

    .draw{
        width: 95%;
        /* margin: 0cm 15vw 0cm 12vw; */
        position: relative;
        margin: auto;
        .image{
            width: 30%;
            margin-left: 8%;
            img{
                max-width: 70%;
                max-height: 70%;
                position: absolute;
                top: 18%;
            }
        }

        div >>> h4{
            /* margin: 3cm 2cm 0 1cm; */
            text-align: center;
            color: white;
            font-size: 4vw;
            font-family: "Hackney";
        }
        div >>> p{
            text-align: center;
            color: white;
            font-size: 1.65vw;
            font-family: "Avenir";
        }
    }
    .text-box{
        width: 60%;
        margin: auto;
    }

    .text{
        width: 80%;
        /* margin-bottom: 4cm;
        margin-left: 2cm;
        margin-top: -1cm; */
        margin: 1.5cm 0cm 3cm 40%;

    }

    /* .image{
        position: absolute;
        width: 350px;
        height: 350px;
        img{
            width: 100%;
            height: 100%;
        }

    } */

    @media (max-width: 1300px){
        .draw{

            .image{
                margin-left: 12%;
            }
        }
    }

    @media (max-width: 1076px){
        .draw{
            margin-right: 30vw;
            .image{
                margin-left: 11%;
            }
        }
    }

    @media (max-width: 834px){
        .draw{
            margin-right: 40vw;
            .image{
                margin-left: 15%;
            }
        }
        .text{
            width: 70%;
            margin-left: 55%;
            margin-bottom: 2cm;
        }
        img{
                width: 33%;
                height: 53%;
        }

    }

     @media (max-width: 600px){
        .draw{
            margin-right: 20vw;
            margin-left: 0;
            height: 280px;
            .image{
                margin-left: 5%

            }




        }



        img{
                width: 45%;
                height: 50%;
        }
        .text{
            margin-top: 1cm;
            padding-top: 0.5cm;
        }

    }





</style>
