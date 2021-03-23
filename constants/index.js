
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
      acceptTerm:'I am 18 years and above. I hereby agree to the  terms of this Promotion and accept the Privacy Policy.',
      acceptPrivacy:'I agree to the collection, use, disclosure, or processing of my personal data in accordance of Privacy Policy.',
      declareAge:'I am below 18 years. I have the consent of my parent/guardian to participate based on the terms and conditions of this Promotion and accept the Privacy Policy.',
      enterCode:'Enter Unique Code',
      tooltipText:'Enter the code found under the cap/tab of your Coca Cola purchase here',
      phoneTooltip:"Please input the correct phone number so that Coca-Cola can contact you directly incase you are the winner",
      buttonText:'Submit now',
      errorTerm:'Please accept our terms and conditions',
      errorPolicy:"Please accept our privacy policies",
      errorDeclare:"Please declare your age and you are agree with terms and condition",
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
      continue:"Continue with",
      nextQuestion:"Next question",
      redeemAnswer:"Redeem Answer",
      submit:"Submit",
      nextPrize:"Next Prize",
      luckyDrawSuccess:"YOU HAVE SUCCESSFULLY ENROLLED IN THE WEEKLY LUCKY DRAW!"
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
  my:{
    browserTitle:"Hidupkan Rentakmu",
    meta: [
      {
        hid: "Hidupkan Rentakmu",
        name: "Hidupkan Rentakmu",
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
      acceptTerm:'Saya berumur 18 tahun dan ke atas. Saya bersetuju dengan terma dan syarat promosi, serta menerima dasar polisi.',
      acceptPrivacy:'I agree to the collection, use, disclosure, or processing of my personal data in accordance of Privacy Policy.',
      declareAge:'Saya berumur bawah 18 tahun. Saya mempunyai kebenaran ibu bapa/ penjaga untuk menyertai peraduan ini yang tertakluk kepada terma dan syarat, serta menerima dasar polisi.',
      enterCode:'Kod unik',
      tooltipText:'Enter the code found under the cap/tab of your Coca Cola purchase here',
      phoneTooltip:"Please input the correct phone number so that Coca-Cola can contact you directly incase you are the winner",
      buttonText:'Klik untuk seterusnya',
      errorTerm:'Please accept our terms and conditions',
      errorPolicy:"Please accept our privacy policies",
      errorDeclare:"Please declare your age and you are agree with terms and condition",
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
      redeemPrize:"Tebus Sekarang",
      continue:"Continue with",
      nextQuestion:"Next question",
      redeemAnswer:"Redeem Answer",
      submit:"Submit",
      nextPrize:"Next Prize",
      luckyDrawSuccess:"YOU HAVE SUCCESSFULLY ENROLLED IN THE WEEKLY LUCKY DRAW!"
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

  }
}


export const translation = language[process.env.language]



