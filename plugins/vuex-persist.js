import VuexPersistence from 'vuex-persist';
import Crypto from 'crypto-js';
import Cookie from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const cookieName = 'KFOlCnqEu92Fr1MmYUtfABc4AMP6lbBP';

const storageKey = '1IiwiaWF0IjoxNjAwOTE1NTcxLCJleHAiOjE2MDA5MTkxNzF9.4vZOe';

// Get the encryption token from cookie or generate a new one.
const encryptionToken = Cookie.get(cookieName) || uuidv4();

// Store the encryption token in a secure cookie.
Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 });

export default ({ store }) => {
  new VuexPersistence({
    storage: {
      getItem: () => {
        const store = window.sessionStorage.getItem(storageKey);

        if (store) {
          try {
            // Decrypt the store retrieved from local storage
            // using our encryption token stored in cookies.
            const bytes = Crypto.AES.decrypt(store, encryptionToken);

            return JSON.parse(bytes.toString(Crypto.enc.Utf8));
          } catch (e) {
            // The store will be reset if decryption fails.
            window.sessionStorage.removeItem(storageKey);
          }
        }

        return null;
      },
      setItem: (key, value) => {
        // Encrypt the store using our encryption token stored in cookies.
        const store = Crypto.AES.encrypt(value, encryptionToken).toString();

        // Save the encrypted store in local storage.
        return window.sessionStorage.setItem(storageKey, store);
      },
      removeItem: () => window.sessionStorage.removeItem(storageKey),
    },
  }).plugin(store);
}
