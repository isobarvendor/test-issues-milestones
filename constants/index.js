let env = {
  phoneCode:"+66",
  maxPhoneNumber:10
};


if(process.env.NODE_ENV=="development"){
    env = {
      ...env,
      origin:"https://th-uplift.aircovery.com",
    }
}else{
  env = {
    ...env,
    origin:"",
  }

}


export const envs = env;
