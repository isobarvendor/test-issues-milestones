
import GeneralAPI from '../api/general';

import {LOGIN, SIGNUP} from './action_types';

export default {


  [LOGIN]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      console.log(moduleState)
      if (moduleState.login) {
        return resolve(moduleState.login)
      } else {
        GeneralAPI.login(data)
        .then(messages => {
          commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(messages);
        })
        .catch(error => {

          return reject(error);
        });
      }
    });
  },
  [SIGNUP]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.login) {
        return resolve(moduleState.login)
      } else {
        GeneralAPI.signup(data)
        .then(messages => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(messages);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }
    });
  },


  /*[SET_GLOBAL_ERROR_DIALOG]:({commit, state}, status)=>{
    commit('SET_GLOBAL_ERROR_DIALOG', status);
  }
  */
};
