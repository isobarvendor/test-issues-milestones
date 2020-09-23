

//shared store are concatenated to the central store
//TO-DO: manage the shared store seperately by module
export default {

  SET_LOGIN_ACCOUNT:(state, data)=>{
        state.login = data;
    },


  SET_TOKEN:(state, data)=>{
    state.token = data;
},


};
