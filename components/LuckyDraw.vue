<template>
    <div class="container lucky-draw">
        <div class="draw">
            <div class="image">
                <img src="/develop/iphone.png" alt="">
            </div>
            <div class="text-box">
                <div class="text">
                    <div class="text-header">CONGRATULATIONS</div>
                    <div class="text-words">You have a chance of becoming the owner of our epic prize iPhone 12.We will announce our winners every Friday, starting from 17 Sep ‘21 onwards. Stay tuned for the announcements here and on Facebook Fanta Thailand</div>
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
        background-size: cover;
    }

    .draw{
        display: flex;
        margin: 0cm 5cm 0cm 5cm;
        position: relative;
        img{
            max-width: 275px;
            max-height: 275px;
            position: absolute;
            top: 15%;
        }
        .text-header{
            /* margin: 3cm 2cm 0 1cm; */
            text-align: center;
            color: white;
            font-size: 55px;
            font-family: "Hackney";
        }
        .text-words{
            text-align: center;
            color: white;
            font-size: 24px;
            font-family: "Avenir";
        }
    }
    .text-box{
        

    }

    .text{
        width: 80%;
        /* margin-bottom: 4cm;
        margin-left: 2cm;
        margin-top: -1cm; */
        margin: 2cm 0cm 3cm 7.5cm;
        
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

</style>