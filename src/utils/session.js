import { AsyncStorage } from 'react-native';

const SESSION_STORAGE_KEY = 'HemmoAppState:session';

export async function getSessionId() {
  return AsyncStorage.getItem(SESSION_STORAGE_KEY);
}

export async function setSessionId(id) {
  return AsyncStorage.setItem(SESSION_STORAGE_KEY, id);
}

export async function clearSessionId() {
  return AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}
