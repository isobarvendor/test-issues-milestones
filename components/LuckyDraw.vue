<template>
    <div class="container lucky-draw">
        <div class="draw">
            <div class="image">
                <img src="/develop/iphone.png" alt="">
            </div>
            <div class="text-box">
                <div class="text">
                    <div class="text-header"><p>CONGRATULATIONS</p></div>
                    <div class="text-words">You have a chance of becoming the owner of our epic prize iPhone 12. We will announce our winners every Friday, starting from 17 Sep ‘21 onwards. Stay tuned for the announcements here and on Facebook Fanta Thailand</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
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
        
        .text-header{
            /* margin: 3cm 2cm 0 1cm; */
            text-align: center;
            color: white;
            font-size: 5vw;
            font-family: "Hackney";
        }
        .text-words{
            text-align: center;
            color: white;
            font-size: 1.8vw;
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
        margin: 2cm 0cm 3cm 40%;
        
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

    @media (max-width: 1076px){
        .draw{
            margin-right: 30vw;
        }
    }

    @media (max-width: 834px){
        .draw{
            margin-right: 40vw;
            .image{
                margin-left: 10%;
            }
        }
        .text{
            width: 70%;
            margin-left: 60%;
        }
        
    }

     @media (max-width: 400px){
        .draw{
            margin-right: 20vw;
            margin-left: 0;
            .text-header{
                font-size: 7vw;
            }
            .image{
                margin-left: 5%
                
            }
            .text_words{
                p{
                    font-size: 25px;
                }
                
                
            }
            
            
        }

        
        img{
                width: 45%;
                height: 60%;
        }
        
        
    }

    

    

</style>