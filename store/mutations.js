

//shared store are concatenated to the central store
//TO-DO: manage the shared store seperately by module
export default {

  SET_LOGIN_ACCOUNT:(state, data)=>{
        state.login = data;
    },

  SET_TOKEN:(state, data)=>{
      state.token = data;
  },
  SET_ERROR:(state, data)=>{
    state.errorLogin = data;
},
  SET_LIST_PRIZE:(state, data)=>{
    state.listPrize = data;
  },
  SET_LIST_WALLET:(state, data)=>{
    state.listWallet = data;
  },
  SET_FILE_AMAZON:(state, data)=>{
    state.fileUploaded = data;
  },
  SET_AUTHENTICATION:(state,data)=>{
    state.authentication = data
  }



};
