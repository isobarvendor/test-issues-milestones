
let language =
{
  en:{
    browserTitle:"Turn Up Your Rhythm",
    meta: [
      {
        hid: "Turn Up Your Rhythm",
        name: "Turn Up Your Rhythm",
        content: "Home page Coke - Turn Up Your Rhythm"
      }
    ],
    periodDescription:"",
    signInButton:"SIGN IN <BR/><small>to win prizes</small>",
    menu:{
      home:"Home",
      privacy:"Privacy",
      terms:"Terms",
      logout:"Logout",
      myRewards:"My Rewards"
    },
    countdown:{
      days:"DAYS",
      hrs:"HRS",
      mins:"MINS",
      secs:"SECS",
    },
    submissionText:{
      header:"Enter your code",
      hello:"Hello",
      siginHeader:"Sign in or register a Coca-Cola <br>account to enter the draw",
      name:"Name",
      email:"Email",
      phoneNumber:"Phone Number",
      acceptTerm:'I accept the <a href="/tnc">Terms and Conditions</a> of this this redemption.',
      acceptPrivacy:'I accept the <a href="/privacy">Privacy Policy</a> of this redemption.',
      declareAge:'I declare that I am above 13  years old.',
      enterCode:'Enter Unique Code',
      tooltipText:'Enter the code found under the cap/tab of your Coca Cola purchase here',
      phoneTooltip:"Please input the correct phone number so that Coca-Cola can contact you directly incase you are the winner",
      buttonText:'Collect your prize',
      errorTerm:'Please accept our terms and conditions',
      errorPolicy:"Please accept our privacy policies",
      errorDeclare:"Please declare that you are above 13  years old",
      errorPinCode:"Oops your pin code is invalid or already redeemed",
      errorPinCode1:"Oops your pin code is invalid or already redeemed",
      errorPinCode2:"Oops your pin code is invalid or already redeemed",
      errorPinCode3:"Oops your pin code is invalid or already redeemed",
      errorPinCode4:"Oops your pin code is invalid or already redeemed",
      errorAPI:"Oops something went wrong please try again",
      errorMaxPhone:"You reach maximum phone number length",
      errorRequiredPhone:"The phone number is required",
      participateAgain:"Participate again",
      listenNow:"Listen now",
      redeemPrize:"Redeem Prize",
      continue:"Continue with"
    },
    winnerText:{
      header:"WINNER LIST",
      nowinner:"Coming soon"
    },
    globalError:{
      errorAPI:"Oops something went wrong",
      tryagain:"Please try again"
    },
    footer:{
      privacy:"Privacy Policy",
      terms:"Terms and conditions"
    }

  },
  id:{
    browserTitle:"Hidupkan Rentakmu",
    meta: [
      {
        hid: "Hidupkan Rentakmu",
        name: "Hidupkan Rentakmu",
        content: "Home page Coke - Turn Up Your Rhythm"
      }
    ],
    periodDescription:"Dengan membeli COCA-COLA 250ml atau 390ml PET kamu bisa dapat akses VIP Joox atau COKE PET 250 gratis dan hadiah seru lainnya. Cukup ikuti langkah di bawah untuk ikutan dan menangkan hadiahmu!",
    signInButton:"LOG MASUK <BR/><small>untuk menangi hadiah</small>",
    menu:{
      home:"Halaman utama",
      privacy:"Privacy Policy",
      terms:"Terms and conditions",
      logout:"logout",
      myRewards:"Hadiah anda"
    },
    countdown:{
      days:"DAYS",
      hrs:"HRS",
      mins:"MINS",
      secs:"SECS",
    },
    submissionText:{
      header:"Enter your code",
      hello:"Hello",
      siginHeader:"Sign in or register a Coca-Cola <br>account to enter the draw",
      name:"Name",
      email:"Email",
      phoneNumber:"Phone Number",
      acceptTerm:'I accept the <a href="/tnc">Terms and Conditions</a> of this this redemption.',
      acceptPrivacy:'I accept the <a href="/privacy">Privacy Policy</a> of this redemption.',
      declareAge:'I declare that I am above 13  years old.',
      enterCode:'Enter Unique Code',
      tooltipText:'Enter the code found under the cap/tab of your Coca Cola purchase here',
      phoneTooltip:"Please input the correct phone number so that Coca-Cola can contact you directly incase you are the winner",
      buttonText:'Collect your prize',
      errorTerm:'Please accept our terms and conditions',
      errorPolicy:"Please accept our privacy policies",
      errorDeclare:"Please declare that you are above 13  years old",
      errorPinCode:"Oops your pin code is invalid or already redeemed",
      errorPinCode1:"Oops your pin code is invalid or already redeemed",
      errorPinCode2:"Oops your pin code is invalid or already redeemed",
      errorPinCode3:"Oops your pin code is invalid or already redeemed",
      errorPinCode4:"Oops your pin code is invalid or already redeemed",
      errorAPI:"Oops something went wrong please try again",
      errorMaxPhone:"You reach maximum phone number length",
      errorRequiredPhone:"The phone number is required",
      participateAgain:"Participate again",
      listenNow:"Listen now",
      redeemPrize:"Tukarkan sekarang",
      continue:"Continue with",
      luckyDrawHeader:"Terima kasih atas partisipasinya!",
      luckyDrawSubHeader:"Pemenang “Undian Mingguan” akan diumumkan di laman microsite Coke Music Indonesia:<BR/> <a href='https://CokeURL.com/CokeMusicWIN'>https://CokeURL.com/CokeMusicWIN</a> selama Periode Promosi.",
      luckyDrawSuccess:"Kamu berkesempatan memenangkan hadiah menarik lainnya pada undian mingguan",
      luckyDrawFooter:"Lihat hadiah lain yang bisa kalian menangkan.",
      prizeBarcodeHeader:"<h1>Tunjukkan kode ini ke kasir<BR/> Alfamart/Indomaret untuk tukarkan<BR/> dengan COCA-COLA 250ml PET gratis.</h1>"
    },
    winnerText:{
      header:"SENARAI PEMENANG",
      nowinner:"Coming soon"
    },
    globalError:{
      errorAPI:"Oops something went wrong",
      tryagain:"Please try again"
    },
    footer:{
      privacy:"Privacy Policy",
      terms:"Terms and conditions"
    }

  }



}


export const translation = language[process.env.language]



