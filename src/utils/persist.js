import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist-immutable';

const persistConfig = {
  storage: AsyncStorage,

  // blacklisted reducers, useful when debugging to recover from broken state
  blacklist: [
    // 'user',
    // 'navigatorState',
  ],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
