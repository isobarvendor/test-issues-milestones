
import GeneralAPI from '../api/general';
import NGPSAPI from '../api/ngps';
import CMSAPI from '../api/cms';
import {
  LOGIN,
  SIGNUP,
  GET_ACCOUNT,
  GET_LIST_PRIZE,
  GET_LIST_WALLET,
  SUBMIT_FORM,
  UPLOAD_FILE,
  DELETE_FILE,
  FETCH_CMS_DATA
} from './action_types';
import { EffectCoverflow } from 'swiper/js/swiper.esm';

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
      if ( !state.login) {
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

        GeneralAPI.signup(data)
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

  [GET_LIST_PRIZE]: ({ commit, state, getters }) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

        NGPSAPI.getListPrize()
        .then(response => {
          commit('SET_LIST_PRIZE', response.data);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });

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

  [SUBMIT_FORM]: ({ commit, state, getters }, request) => {

    return new Promise((resolve, reject) => {
      const moduleState = state;
      if (state.token) {
        NGPSAPI.submitLogin(request, state.token)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      } else {
        NGPSAPI.submitNonLogin(request)
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

  [UPLOAD_FILE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        NGPSAPI.uploadFile(data.request,data.type)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
         // console.error(error);
          return reject(error);
        });

    });
  },

  [DELETE_FILE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
        NGPSAPI.deleteFile(data)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });

    });
  },

  [FETCH_CMS_DATA]: ({ commit, state, getters },language) => {
    return new Promise((resolve, reject) =>{
      const moduleState = state;
      CMSAPI.getCMSContent().then((result) => {
        let content=result.data.filter((o)=>{
            return o.Language.Language==language
        })
        commit('SET_CMS_CONTENT',content)
         CMSAPI.getCMSConfig().then((config) => {
            commit('SET_CONFIG',config.data[0])
            resolve(result)
         }).catch(error => {
          return reject(error);
        });
      })
      .catch(error => {
        return reject(error);
      });


    });
  },


  /*[SET_GLOBAL_ERROR_DIALOG]:({commit, state}, status)=>{
    commit('SET_GLOBAL_ERROR_DIALOG', status);
  }
  */
};
