

//shared store are concatenated to the central store
//TO-DO: manage the shared store seperately by module
export default {

  SET_LOGIN_ACCOUNT:(state, data)=>{
        state.login = data;
    },

  SET_TOKEN:(state, data)=>{
      state.token = data;
  },

  SET_LIST_PRIZE:(state, data)=>{
    state.listPrize = data;
  },
  SET_LIST_WALLET:(state, data)=>{
    state.listWallet = data;
  },
  SET_INSTA_WIN:(state, data)=>{
    state.instaWin = data;
  },
  SET_ALWAYS_WIN:(state, data)=>{
    state.alwaysWin = data;
  },



};
