import {Map} from 'immutable';

let configuration = Map();

export function setConfiguration(name, value) {
  console.log('Configuring!');
  configuration = configuration.set(name, value);
  console.log('configuration ' + configuration);
}

export function setAll(properties) {
  configuration = configuration.merge(properties);
}

export function unsetConfiguration(name) {
  configuration = configuration.delete(name);
}

export function getConfiguration(key) {
  if (!configuration.has(key)) {
    throw new Error('Undefined configuration key: ' + key);
  }

  return configuration.get(key);
}
