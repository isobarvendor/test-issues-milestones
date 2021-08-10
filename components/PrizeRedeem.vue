<template>
    <div class="container redeem">
        <div class="header-redeem">
            <p>THANK YOU FOR YOUR PARTICIPATION, <br />YOUR PRIZE IS READY.</p>
        </div>
        <div class="content">
            <div class="images">
                <img src="/develop/fanta.png" alt="">
                
            </div>
            <!-- <div class="text">
                <p>10 ROV</p>
                <p>AREA OF VALOUR BOXES</p>
            </div> -->
        </div>
        <div class="text">
                <p>Use this code and redeem your box in game!</p>
                
                <div class="copy-button">
                    <input type="text" id="code" value="something">
                    <button @click="copy"><img src="/develop/copy.png" >{{ button }}</button>
                </div>
        </div>
        <div class="link" @click="scroll">
            <p>SCROLL DOWN FOR LUCKY DRAW DETAILS</p>
            <div class="arrow">
                <img id="top" src="/develop/arrow.png" alt="">
                <img id="bottom" src="/develop/arrow.png" alt="">
            </div>
        </div>
        
    </div>
</template>

<script>
    import  VueScrollTo from 'vue-scrollto';
    export default {
        data(){
            return {
                button: "Copy"
            }
        },
        methods:{
            scroll(){
                this.$emit("scroll")
            },
            copy(){
                let testingCodeToCopy = document.querySelector('#code')
                testingCodeToCopy.setAttribute('type', 'text')
                testingCodeToCopy.select()
                try {
                    var successful = document.execCommand('copy');
                    if(successful){
                    this.button="Copied!";
                    }

                } catch (err) {

                }
                /* testingCodeToCopy.setAttribute('type', 'hidden') */
                setTimeout(() => {   this.successCopy=false; }, 2000);
                window.getSelection().removeAllRanges()
            },

        }
    }
</script>

<style lang="scss" scoped>
    .redeem{
        background-image: url('/develop/background-redeem.png');
        background-size: cover;
    }
    /* p {
        font-size: 10px;
        color: white;
    } */

    .header-redeem{
        text-align: center;
        margin-top: 1cm;
        p{
            font-size: 40px;
            font-family: "Hackney";
        }
    }

    .content{
        display: flex;
        /* background-size: 1700px 600px;
        margin-left: -3cm; */
        position: relative;
        img {
            width: 1690.91px;
            height: 418.35px;
        }
    }
    
    .images{
        display: flex;
        margin: 1cm auto 0 auto;
        /* position: absolute;
        top: 50%;
        left: 20%;
        transform: translate(-50%, -50%); */
        height: 250px;
        width: 250px;
    }

    .text{
        text-align: center;
        margin: 0cm 1cm 0 1cm;
        /* position: absolute;
        top: 40%;
        left: 70%;
        transform: translate(-50%, -50%); */
        padding-top: 1cm;
        p{
            font-size: 25px;
            
        }
        input[type="text"]{
            background: white;
            border-radius: 4px;
            border: 2px solid #73AA17;
            padding-right: 50px;
            width: 240px;
            height: 39px;
            box-shadow: 3px 3px 5px #707070;
            text-align: center;
        }
        button{
            margin-left: -50px;
            text-align: center;
            background: #73AA17;
            height: 39px;
            width: 125px;
            border-radius: 4px;
            box-shadow: 3px 3px 5px #707070;
            color: white;
            font-family: "Avenir";
            padding-left: 1cm;
            img{
                width: 20px;
                height: 26px;
                position: absolute;
                right: 44%;
            }
        }
    }

    .copy-button{
        display: flex;
        justify-content: center;
        position: relative;
    }

    .link {
        /* position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%); */
        position: relative;
        margin: 2rem 0 2.5rem 0;
        text-align: center;
        cursor: pointer;
        #top{
            width: 20.04px;
            height: 10.02px;
            position: absolute
        }
        #bottom{
            width: 20.04px;
            height: 10.02px;
            position: absolute;
            top: 80%;
        }
        p{
            font-family: "Hackney";
            font-size: 25px;
        }
        /* button{
        background-color: #73AA17;
        color: white;
        font-size: 14px;
        width: 340px;
        border-radius: 5px;
        margin: 0 1cm 1.3cm 1cm;
        text-align: center;
        align-items: center;
        height: 60px;
        font-family: "Avenir";
        box-shadow: 3px 3px 5px #707070;
        } */
    }

</style>