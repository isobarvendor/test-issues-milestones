
import GeneralAPI from '../api/general';
import NPGSAPI from '../api/npgs';
import {
  LOGIN,
  SIGNUP,
  GET_ACCOUNT,
  GET_LIST_PRIZE,
  GET_LIST_WALLET,
  ACCEPT_VOUCHER,
  REJECT_VOUCHER,
  INSTA_WIN,
  ALWAYS_WIN
} from './action_types';

export default {
  [LOGIN]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        GeneralAPI.login(data)
        .then(response => {
          commit('SET_TOKEN', response.data.accessToken);
          return resolve(response);
        })
        .catch(error => {
          return reject(error);
        });
    });
  },
  [GET_ACCOUNT]: ({ commit, state, getters }, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.login) {
        return resolve(moduleState.login)
      } else {
        GeneralAPI.getAccount(token)
        .then(response => {

          commit('SET_LOGIN_ACCOUNT', response.data);
          return resolve(response);
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
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }
    });
  },

  [GET_LIST_PRIZE]: ({ commit, state, getters }, data, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.listPrize) {
        return resolve(moduleState.listPrize)
      } else {
        NPGSAPI.getListPrize(data)
        .then(response => {
          commit('SET_LIST_PRIZE', response.data);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }
    });
  },


  [GET_LIST_WALLET]: ({ commit, state, getters }, data, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.listWallet) {
        return resolve(moduleState.listWallet)
      } else {
        NPGSAPI.getListWallet(data)
        .then(response => {
          commit('SET_LIST_WALLET', response.data);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }
    });
  },

  [INSTA_WIN]: ({ commit, state, getters }, data, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.instaWin) {
        return resolve(moduleState.instaWin)
      } else {
        NPGSAPI.instaWinAPI(data)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }
    });
  },


  [ALWAYS_WIN]: ({ commit, state, getters }, data, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.alwaysWin) {
        return resolve(moduleState.alwaysWin)
      } else {
        NPGSAPI.alwaysWinAPI(data)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }
    });
  },

  [ACCEPT_VOUCHER]: ({ commit, state, getters }, data, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        NPGSAPI.acceptVoucher(data)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });

    });
  },

  [REJECT_VOUCHER]: ({ commit, state, getters }, data, token) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        NPGSAPI.rejectVoucher(data)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  },


  /*[SET_GLOBAL_ERROR_DIALOG]:({commit, state}, status)=>{
    commit('SET_GLOBAL_ERROR_DIALOG', status);
  }
  */
};
