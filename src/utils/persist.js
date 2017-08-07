import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist-immutable';

const persistConfig = {
  storage: AsyncStorage,
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
