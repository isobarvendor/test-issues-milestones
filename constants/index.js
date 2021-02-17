let env = {};

if(process.env.NODE_ENV=="development"){
    env = {
      origin:"https://th-uplift.aircovery.com"
    }
}else{
  env = {
    origin:""
  }

}


export const envs = env;
