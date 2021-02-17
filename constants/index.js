let env = {};

if(process.env.NODE_ENV=="development"){
  //for development environment
    env = {
      origin:"https://th-uplift.aircovery.com",
      //config for hardcode
      config:{
           configID:["1e0b8kkwap0rj","22mf8kkqk551f"],
           lotID:[445590,445586],
        }
    }
}else{
  //production environment
  env = {
    origin:"",
    config:{
      configID:["1e0b8kkwap0rj","22mf8kkqk551f"],
      lotID:[445590,445586],
   }
  }

}


export const envs = env;
