
import GeneralAPI from '../api/general';
import NGPSAPI from '../api/ngps';
import {
  LOGIN,
  SIGNUP,
  GET_ACCOUNT,
  GET_LIST_PRIZE,
  GET_LIST_WALLET,
  ACCEPT_VOUCHER,
  REJECT_VOUCHER,
  SUBMIT_FORM,
  UPLOAD_FILE,
  DELETE_FILE
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
          //need to remove if already have UUID in API
          if(!response.data.UUID){
            response.data['UUID']='447bde09-2c67-4591-805b-f0f748d41a7d'
          }
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
        NGPSAPI.getListPrize(data)
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


  [GET_LIST_WALLET]: ({ commit, state, getters }, payload) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (moduleState.listWallet) {
        return resolve(moduleState.listWallet)
      } else {
        NGPSAPI.getListWallet(payload.request,payload.token)
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

  [SUBMIT_FORM]: ({ commit, state, getters }, payload) => {

    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (state.token) {
        NGPSAPI.submitLogin(payload.request,payload.type, state.token)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      } else {
        NGPSAPI.submitNonLogin(payload.request,payload.type)
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
        NGPSAPI.uploadFile(data)
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

  [UPLOAD_FILE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        NGPSAPI.uploadFile(data)
        .then(response => {
          commit('SET_FILE_AMAZON', response.data.filePath);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });

    });
  },

  [DELETE_FILE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        NGPSAPI.deleteFile(data)
        .then(response => {
          commit('SET_FILE_AMAZON', null);
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
        NGPSAPI.rejectVoucher(data)
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
