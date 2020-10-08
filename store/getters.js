import deepClone from 'deep-clone';

export default {
    getLoginAccount(state) {
        return deepClone(state.login);
    },
    getCMSContent(state) {
        return deepClone(state.CMSContent);
    },
    getCMSConfig(state) {
      return deepClone(state.config);
    },
    getListPrize(state) {
      return deepClone(state.listPrize);
    }
}
