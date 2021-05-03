
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
      myRewards:"My Rewards",
      winners:"Winners"
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
      acceptTerm:'I am 18 years and above. I hereby agree to the  <a href="/tnc">terms and conditions of this Promotion </a> and accept the <a href="/privacy">Privacy Policy</a>.',
      acceptPrivacy:'I agree to the collection, use, disclosure, or processing of my personal data in accordance of <a href="/privacy">Privacy Policy</a>.',
      declareAge:'I am below 18 years. I have the consent of my parent/guardian to participate based on the <a href="/tnc">terms and conditions</a> of this Promotion and accept the <a href="/privacy">Privacy Policy</a>.',
      enterCode:'Enter Unique Code',
      tooltipText:'Enter the code found under the cap/tab of your Coca Cola purchase here',
      phoneTooltip:"Please input the correct phone number so that Coca-Cola can contact you directly incase you are the winner",
      buttonText:'Submit now',
      uploadButton:'Upload unique code image',
      errorRequiredCode:'The code field is required',
      errorRequiredUpload:'The upload field is required',
      errorTerm:'Please accept our terms and conditions',
      errorPolicy:"Please accept our privacy policies",
      errorDeclare:"Please declare your age",
      errorPinCode:"Oops your pin code is invalid or already redeemed",
      errorPinCode1:"Oops your pin code is invalid or already redeemed",
      errorPinCode2:"Oops your pin code is invalid or already redeemed",
      errorPinCode3:"Oops your pin code is invalid or already redeemed",
      errorPinCode4:"Oops your pin code is invalid or already redeemed",
      errorAPI:"Oops something went wrong please try again",
      errorMaxPhone:"You’ve reached the maximum phone number length",
      errorNumberPhone:"Please enter a number",
      errorRequiredPhone:"The phone number is required",
      participateAgain:"Join Again",
      listenNow:"Listen now",
      redeemPrize:"Redeem Prize",
      continue:"Continue with",
      nextQuestion:"Next question",
      redeemAnswer:"Redeem Answer",
      submit:"Submit",
      nextPrize:"Participate in Lucky Draw",
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
    signInButton:"LOG MASUK <BR/><small>untuk menangi hadiah</small>",
    menu:{
      home:"Laman utama",
      privacy:"Polisi Privasi",
      terms:"Terma dan syarat",
      logout:"log keluar",
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
      hello:"Hai",
      siginHeader:"Log masuk atau  <br>daftar akaun untuk menyertai peraduan",
      name:"Name",
      email:"Email",
      phoneNumber:"Nombor telefon",
      acceptTerm:'Saya berumur 18 tahun dan ke atas. Saya bersetuju dengan <a href="/tnc">terma dan syarat promosi</a>, serta menerima <a href="/privacy">polisi privasi</a>.',
      acceptPrivacy:'I agree to the collection, use, disclosure, or processing of my personal data in accordance of <a href="/privacy">Privacy Policy</a>.',
      declareAge:'Saya berumur bawah 18 tahun. Saya mempunyai kebenaran ibu bapa/ penjaga untuk menyertai peraduan ini yang tertakluk kepada <a href="/tnc">terma dan syarat</a>, serta menerima <a href="/privacy">polisi privasi</a>.',
      enterCode:'Kod Unik',
      tooltipText:'Isikan kod unik di bawah penutup botol/ penutup sentap tin/ kad penyertaan peraduan Coca-Cola di sini',
      phoneTooltip:"Isikan nombor telefon yang betul supaya kami dapat menghubungi anda sekiranya anda memenangi hadiah.",
      buttonText:'Klik untuk seterusnya',
      uploadButton:'Muatnaik gambar kod unik',
      errorRequiredCode:'Kod perlu diisikan',
      errorRequiredUpload:'Gambar kod unik perlu dimuatnaikkan.',
      errorTerm:'Please accept our terms and conditions',
      errorPolicy:"Please accept our privacy policies",
      errorDeclare:"Please declare your age",
      errorPinCode:"Maaf. Kod unik anda tidak sah atau sudah ditebus.",
      errorPinCode1:"Maaf. Kod unik anda tidak sah atau sudah ditebus.",
      errorPinCode2:"Maaf. Kod unik anda tidak sah atau sudah ditebus.",
      errorPinCode3:"Maaf. Kod unik anda tidak sah atau sudah ditebus.",
      errorPinCode4:"Maaf. Kod unik anda tidak sah atau sudah ditebus.",
      errorAPI:"Oops something went wrong please try again",
      errorMaxPhone:"You’ve reached the maximum phone number length",
      errorNumberPhone:"Please enter a number",
      errorRequiredPhone:"Nombor telefon perlu diisikan.",
      participateAgain:"Kembali ke Penyertaan Peraduan",
      listenNow:"Listen now",
      redeemPrize:"Tebus Sekarang",
      continue:"Teruskan dengan",
      nextQuestion:"Next question",
      redeemAnswer:"Redeem Answer",
      submit:"Hantar",
      nextPrize:"Sertai Peraduan",
      luckyDrawSuccess:"Sila datang lagi untuk memenangi lebih hadiah menarik!"
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
      privacy:"Polisi Privasi",
      terms:"Terma dan syarat"
    }

  }
}


export const translation = language[process.env.language]



