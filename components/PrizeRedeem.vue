<template>
  <div class="container redeem">
    <div class="header-redeem">
      <div v-html="config.attempts[0].FormHeading.thankYouMessage"></div>
    </div>
    <div class="content">
      <div class="images">
        <img src="develop/rov-background.png" alt="" />
      </div>
    </div>
    <div class="redeem-button" v-if="!showCode">
      <button @click="show" id="redeem_now">{{ translation.redeem }}</button
      ><br />
      <p>แลกรางวัลใน ROV ได้ตั้งแต่ 1 กันยายน ถึง 30 พฤศจิกายน 2564 เท่านั้น</p>
      <!-- <u @click="open">https://shortenanything.page.link/eNh4</u> -->
    </div>
    <div v-if="showCode">
      <div class="text-redeem">
        <p>กดคัดลอกโค้ดเพื่อแลกรางวัลได้เลย!</p>

        <div class="copy-button">
          <input type="text" id="redeem" readonly :value="voucher" />
          <button @click="copy" id="copy_code">
            <img src="/develop/copy.png" />{{ button }}</button
          ><br />
        </div>
         <p>ขั้นตอนการแลกรางวัล</p>
        <div class="list">
          <ol>
            <li>
              1. เปิด
              <u style="cursor: pointer;" @click="open">Application RoV</u>
              และทำการล็อคอินเข้าเกม
            </li>
            <li>2. กดไปที่เมนูกิจกรรมบน widget ขวาบนของหน้าล็อบบี้</li>
            <li>3. กดไปที่แถบประกาศเกมด้านบนของหน้ากิจกรรม</li>
            <li>4. กดไปที่แถบ 'แลกไอเทม' ด้านซ้ายมือ</li>
            <li>5. กดแลกไอเทม</li>
            <li>6. กรอกโค้ดที่ได้มาลงในช่อง</li>
            <li>7. กดยืนยันเพื่อรับไอเทมเป็นอันเสร็จสิ้น</li>
            <li>8. ไอเทมจะถูกส่งไปที่จดหมายในเกมภายใน 5 นาที</li>
          </ol>
        </div>
        <!--p>หมายเหตุ: ไอเทมจะถูกส่งไปที่จดหมายในเกมภายใน 5 นาที</p-->
      </div>
      <!-- <div id="link">
        <u @click="open">https://shortenanything.page.link/eNh4</u>
      </div> -->
    </div>
    <div class="content">
      <div class="images-second">
        <img src="develop/iphone-background.png" alt="" />
      </div>
    </div>
    <div class="text-redeem-second">
      <p id="second-message" v-html="config.attempts[0].FormHeading.Prize">

      </p>
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
import { translation } from "@/constants/index";
export default {
  props: {
    voucher: null,
    data: null,
    image: null,
    config: null
  },
  data() {
    return {
      button: "Copy",
      translation: translation.submissionText,
      showCode: false,
      instructions: []
    };
  },
  methods: {
    scroll() {
      this.$emit("scroll");
    },
    copy() {
      let testingCodeToCopy = document.querySelector("#redeem");
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
    },
    show() {
      this.showCode = !this.showCode;
    },
    open() {
      window.open("https://shortenanything.page.link/eNh4");
    }
  }
};
</script>

<style lang="scss" scoped>
.redeem {
  background-image: url("/develop/background-howto.png");
  background-size: 100% 100%;
  max-width: 1280px;
}
/* p {
        font-size: 10px;
        color: white;
    } */

.list {
  color: white;
  margin: 0 auto 16px auto;
  width: 33%;
  text-align: left;
  li {
    list-style: none;
  }
}

.header-redeem {
  text-align: center;
  margin-top: 3%;
  height: 20%;
  /* height: 20% */
  p {
    font-size: 325%;
    font-family: "Avenir";
  }
}

.content {
  margin: auto;
  /* background-size: 1700px 600px;
        margin-left: -3cm; */
  /* position: relative; */
  height: 40%;
}

.images {

  /* position: absolute;
        top: 50%;
        left: 20%;
        transform: translate(-50%, -50%); */
  height: 75%;
  width: 50%;
  align-items: center;

}

.images-second{

  /* position: absolute;
        top: 50%;
        left: 20%;
        transform: translate(-50%, -50%); */
  height: 75%;
  width: 50%;
  align-items: center;
}

.redeem-button {
  text-align: center;
  margin-bottom: 20px;
  button {
    background-color: #73aa17;
    color: white;
    font-size: 100%;
    width: 30%;
    border-radius: 5px;
    margin: 1cm auto 0.5cm auto;
    text-align: center;
    height: 5vh;
    font-family: "Avenir";
    box-shadow: 3px 3px 5px #707070;
  }
  u {
    cursor: pointer;
    color: white;
  }
  p {
    font-family: "SiamSquare";
    font-size: 20px;
  }
}

#link {
  margin-top: 1rem;
  cursor: pointer;
  color: white;
  text-align: center;
}

.text-redeem {
  font-family: "SiamSquare" !important;
  text-align: center;
  /* position: absolute;
        top: 40%;
        left: 70%;
        transform: translate(-50%, -50%); */
  height: 10%;
  width: 100%;

  p {
    font-size: 150%;
    font-family: "SiamSquare" !important;
    margin-bottom: 1cm;
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
      right: 65%;
    }
  }
}

.text-redeem-second {
  font-family: "SiamSquare" !important;
  text-align: center;
  /* position: absolute;
        top: 40%;
        left: 70%;
        transform: translate(-50%, -50%); */
  height: 10%;
  width: 100%;
  margin-bottom: 0.5cm;
  p {
    font-size: 150%;
    font-family: "SiamSquare" !important;

  }

}

.copy-button {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.link {
  display: none;
  /* position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%); */

  margin: 0 0 2rem 0;
  text-align: center;
  cursor: pointer;
  p {
    font-family: "Avenir";
    font-size: 200%;
  }
  #top {
    height: 3%;
    width: 3%;
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



@media screen and (max-width: 1034px) {

}

@media screen and (max-width: 736px) {
  .header-redeem {
    height: 12%;
    margin-top: 7%;
    p {
      font-size: 26px;
    }
  }
  /* .content{
      height: 35%;
    } */

  .text-redeem {
    font-size: 15px;
    input[type="text"] {
      width: 45%;
    }
    button {
      width: 30%;
      img {
        right: 70%;
      }
    }

  }
  .link {
    #top {
      width: 3%;
      height: 3%;
    }
  }
  .redeem-button {
    button {
      margin: 0 auto 0.7cm auto;
    }
  }
}

@media screen and (max-width: 400px) {
  .text-redeem-second{
    margin-bottom: 1cm;
  }
  .text-redeem {
    button {
      width: 30%;

    }
  }
  .header-redeem {
    p {
      font-size: 225%;
      font-family: "Avenir";
    }
  }
  .link {
    margin-top: 2.5rem;
    p {
      font-size: 150%;
    }
    #top {
      width: 5%;
      height: 5%;
    }
  }
  .list {
    width: 100%;
  }
  .redeem-button {
    button {
      margin: 0 auto 0.7cm auto;
      height: 6vh;
    }
  }
}
</style>
