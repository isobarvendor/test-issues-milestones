import GeneralAPI from "../api/general";
import NGPSAPI from "../api/ngps";
import CMSAPI from "../api/cms";

import {
  LOGIN,
  SIGNUP,
  GET_ACCOUNT,
  GET_LIST_PRIZE,
  GET_LIST_WALLET,
  SUBMIT_FORM,
  UPLOAD_FILE,
  DELETE_FILE,
  FETCH_CMS_DATA,
  REDEEM_PRIZE,
  GET_LIST_WINNERS,
  CHECK_ATTEMPT,
  GET_MY_PRIZE,
  GET_GRIVY_PRIZE,
  GET_PHONE,
  CHECK_MIXCODE
} from "./action_types";

export default {
  [LOGIN]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      GeneralAPI.login(data)
        .then(response => {
          commit("SET_TOKEN", response.data.accessToken);
          return resolve(response);
        })
        .catch(error => {
          return reject(error);
        });
    });
  },
  [REDEEM_PRIZE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      NGPSAPI.redeemPrize(data, state.token)
        .then(response => {
          commit("SET_REDEEM_PRIZE", response.data);
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
      if (!state.login) {
        GeneralAPI.getAccount(token)
          .then(response => {
            commit("SET_LOGIN_ACCOUNT", response.data);
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
          return resolve(response);
        })
        .catch(error => {
          //  console.error(error);
          return reject(error);
        });
    });
  },

  [GET_LIST_PRIZE]: ({ commit, state, getters }, prizeConfig) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

      NGPSAPI.getListPrize(prizeConfig)
        .then(response => {
          // commit('SET_LIST_PRIZE', response.data);
          return resolve(response);
        })
        .catch(error => {
          // console.error(error);
          return reject(error);
        });
    });
  },

  [GET_LIST_WALLET]: ({ commit, state, getters }) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

      NGPSAPI.getListWallet(state.token)
        .then(response => {
          commit("SET_LIST_WALLET", response.data);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  },
  [GET_MY_PRIZE]: ({ commit, state, getters }, campaign) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

      NGPSAPI.getMyPrize(state.token, campaign)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  },
  [GET_GRIVY_PRIZE]: ({ commit, state, getters }) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

      NGPSAPI.getGrivyPrize(state.token)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  },

  [GET_LIST_WINNERS]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

      CMSAPI.getWinners({ count: data.count, params: data.params }, state.token)
        .then(response => {
          // commit('SET_LIST_WINNERS', response.data);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  },

  [SUBMIT_FORM]: ({ commit, state, getters }, request) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      //if (state.token) {
      NGPSAPI.submitLogin(request, state.token)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      /*} else {
        NGPSAPI.submitNonLogin(request)
        .then(response => {
          //commit('SET_LOGIN_ACCOUNT', messages);
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
      }*/
    });
  },

  [CHECK_ATTEMPT]: ({ commit, state, getters }) => {
    return new Promise((resolve, reject) => {
      NGPSAPI.checkUserAttempt(state.token)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          return reject(error);
        });
    });
  },

  [GET_PHONE]: ({ commit, state, getters }) => {
    return new Promise((resolve, reject) => {
      NGPSAPI.getUserPhone(state.token)
        .then(response => {
          let phone = response.data.phoneNumber;
          let loginAccount = state.login;
          //console.log(loginAccount);
          loginAccount = { ...state.login, phone: phone };
          // console.log(loginAccount);
          commit("SET_LOGIN_ACCOUNT", loginAccount);
          return resolve(response);
        })
        .catch(error => {
          return reject(error);
        });
    });
  },

  [UPLOAD_FILE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      NGPSAPI.uploadFile(data.request, data.type, state.token)
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

  [FETCH_CMS_DATA]: ({ commit, state, getters }, language) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;
      CMSAPI.getCMSContent()
        .then(result => {
          let content = result.data.filter(o => {
            return o.Language.Language == language;
          });
          commit("SET_CMS_CONTENT", content);
          CMSAPI.getCMSConfig()
            .then(config => {
              commit("SET_CONFIG", config.data);
              resolve(result);
            })
            .catch(error => {
              return reject(error);
            });
        })
        .catch(error => {
          return reject(error);
        });
    });
  },
  [CHECK_MIXCODE]: ({ commit, state, getters }, data) => {
    return new Promise((resolve, reject) => {
      const moduleState = state;

      NGPSAPI.checkMixCode(state.token, data)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          console.error(error);
          return reject(error);
        });
    });
  }

  /*[SET_GLOBAL_ERROR_DIALOG]:({commit, state}, status)=>{
    commit('SET_GLOBAL_ERROR_DIALOG', status);
  }
  */
};
