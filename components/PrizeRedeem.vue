<template>
  <div class="container redeem">
    <div class="header-redeem">
      <p>THANK YOU FOR YOUR PARTICIPATION, <br />YOUR PRIZE IS READY.</p>
    </div>
    <div class="content">
      <div class="images">
        <img src="/develop/fanta.png" alt="" />
      </div>
    </div>
    <div class="text-redeem">
      <p>Use this code and redeem your box in game!</p>

      <div class="copy-button">
        <input type="text" id="code" value="something" />
        <button @click="copy">
          <img src="/develop/copy.png" />{{ button }}
        </button>
      </div>
    </div>
    <div class="link" @click="scroll">
      <p>SCROLL DOWN FOR LUCKY DRAW DETAILS</p>
      <div class="arrow">
        <img id="top" src="/develop/arrow.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import VueScrollTo from "vue-scrollto";
export default {
  data() {
    return {
      button: "Copy"
    };
  },
  methods: {
    scroll() {
      this.$emit("scroll");
    },
    copy() {
      let testingCodeToCopy = document.querySelector("#code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();
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
    }
  }
};
</script>

<style lang="scss" scoped>
.redeem {
  background-image: url("/develop/background-redeem.png");
  background-size: 100% 100%;
  max-width: 1280px;
}
/* p {
        font-size: 10px;
        color: white;
    } */

.header-redeem {
  text-align: center;
  margin-top: 3%;
  height: 20%;
  /* height: 20% */
  p {
    font-size: 325%;
    font-family: "Hackney";
  }
}

.content {
  display: flex;
  /* background-size: 1700px 600px;
        margin-left: -3cm; */
  /* position: relative; */
  height: 40%;
  img {
    width: 100%;
    height: 100%;
  }
}

.images {
  display: flex;
  margin: 1cm auto 0 auto;
  /* position: absolute;
        top: 50%;
        left: 20%;
        transform: translate(-50%, -50%); */
  height: 80%;
  width: 20%;
}

.text-redeem {
  text-align: center;
  /* position: absolute;
        top: 40%;
        left: 70%;
        transform: translate(-50%, -50%); */
  height: 10%;
  width: 100%;
  p {
    font-size: 150%;
  }
  input[type="text"] {
    background: white;
    border-radius: 4px;
    border: 2px solid #73aa17;
    padding-right: 50px;
    width: 20%;
    height: 39px;
    box-shadow: 3px 3px 5px #707070;
    text-align: center;
  }
  button {
    margin-left: -50px;
    text-align: center;
    background: #73aa17;
    height: 39px;
    width: 125px;
    border-radius: 4px;
    box-shadow: 3px 3px 5px #707070;
    color: white;
    font-family: "Avenir";
    padding-left: 1cm;
    position: relative;
    img {
      width: 20px;
      height: 26px;
      position: absolute;
      top: 20%;
      right: 70%;
    }
  }
}

.copy-button {
  display: flex;
  justify-content: center;
}

.link {
  /* position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%); */
  position: relative;
  margin: 4rem 0 2.5rem 0;
  text-align: center;
  cursor: pointer;
  #top {
      /* width: 2.5%;
      height: 5%; */
  }
  p {
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

@media screen and (max-width: 736px) {
    .header-redeem {
        p {
        font-size: 250%;
        }
    }
    .images{
        height: 70%;
        width: 30%;
    }
    .text-redeem{
        font-size: 80%;
        input[type="text"]{
            width: 45%;
        }
        button{
            width: 20%;
            img{
              right: 60%;
            }
        }
    }
    .link{
        #top{
            width: 7%;
            height: 14%;
        }
    } 
    /* .text-redeem{
        width: 50%;
        p {
            font-size: 100px;
        }
        input[type="text"] {
            background: white;
            border-radius: 4px;
            border: 2px solid #73aa17;
            padding-right: 50px;
            width: 50%;
            height: 39px;
            box-shadow: 3px 3px 5px #707070;
            text-align: center;
        }
        button {
            margin-left: -50px;
            text-align: center;
            background: #73aa17;
            height: 39px;
            width: 125px;
            border-radius: 4px;
            box-shadow: 3px 3px 5px #707070;
            color: white;
            font-family: "Avenir";
            padding-left: 1cm;
            img {
            width: 20px;
            height: 26px;
            position: absolute;
            right: 44%;
            }
        }
    }
    .link{
        #top{
            width: 7%;
            height: 14%;
        }
    } */
}

@media screen and (max-width: 400px){
  .images{
        height: 70%;
        width: 40%;
    }
}


</style>
