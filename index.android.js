import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {setConfiguration} from './src/utils/configuration';
import {AppRegistry, BackAndroid} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

class Hemmo extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);

    if (__DEV__) {
      setConfiguration('API_ROOT', 'http://localhost:3001');
    } else {
      setConfiguration('API_ROOT', 'https://hemmo.pelastakaalapset.fi:3888');
    }
  }

  navigateBack = () => {
    const navigationState = store.getState().get('navigationState');

    if (navigationState.get('index') === 0) {
      return false;
    }

    /* Check if returning from current page is allowed */
    let currentPageIndex = navigationState.get('index');
    let allowReturn = navigationState.getIn(['children', currentPageIndex, 'allowReturn']);

    if (allowReturn === false) {
      return true;
    }

    store.dispatch(NavigationStateActions.popRoute());
    return true;
  };

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Hemmo', () => Hemmo);
