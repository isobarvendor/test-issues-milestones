let env = {
  phoneCode:"+84",
  maxPhoneNumber:10,

  cdsTrackingClientId:'7cd60679-4231-4c85-b228-0d8c1ed22c28'
};


if(process.env.NODE_ENV=="development"){
  //for development environment
    env = {
      ...env,
      origin:"https://th-uplift.aircovery.com",
        //config for hardcode
      config:{
        configID:["1e0b8kkwap0rj","22mf8kkqk551f"],
        lotID:[445590,445586],
     },
      pixelUrl:"https://beta.apac.realtime-sdk.gcds.coke.com/"
    }
}else{
  //production environment
  env = {
    ...env,
    origin:"",
      //config for hardcode
    config:{
      configID:["1e0b8kkwap0rj","22mf8kkqk551f"],
      lotID:[445590,445586],
   },
    pixelUrl:"https://beta.apac.realtime-sdk.gcds.coke.com/"
  }

}


export const envs = env;
