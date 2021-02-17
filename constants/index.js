let env = {
  phoneCode:"+66",
  maxPhoneNumber:10,
  cdsTrackingClientId:'7cd60679-4231-4c85-b228-0d8c1ed22c28'
};


if(process.env.NODE_ENV=="development"){
    env = {
      ...env,
      origin:"https://th-uplift.aircovery.com",
      pixelUrl:"https://beta.apac.realtime-sdk.gcds.coke.com/"
    }
}else{
  env = {
    ...env,
    origin:"",
    pixelUrl:"https://beta.apac.realtime-sdk.gcds.coke.com/"
  }

}


export const envs = env;
