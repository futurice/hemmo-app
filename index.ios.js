import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import {setConfiguration} from './src/utils/configuration';
import Orientation from 'react-native-orientation';


import React from 'react';
import {AppRegistry} from 'react-native';

const Hemmo = React.createClass({

  componentWillMount() {
    setConfiguration('API_ROOT', 'https://hemmo.pelastakaalapset.fi:3888');
    Orientation.lockToLandscape();
    // setConfiguration('API_ROOT', 'http://localhost:3001');
  },

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('Hemmo', () => Hemmo);
