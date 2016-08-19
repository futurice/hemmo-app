import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React from 'react';
import {setConfiguration} from './src/utils/configuration';
import {AppRegistry, BackAndroid} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

const Hemmo = React.createClass({

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
    // setConfiguration('API_ROOT', 'http://hemmo-backend.herokuapp.com');
    setConfiguration('API_ROOT', 'http://localhost:3001');
  },

  navigateBack() {
    const navigationState = store.getState().get('navigationState');

    if (navigationState.get('index') === 0) {
      return false;
    }

    /* Check if returning from current page is allowed */
    var currentPageIndex = navigationState.get('index');
    var allowReturn = navigationState.getIn(['children', currentPageIndex, 'allowReturn']);
    if (allowReturn === false) {
      return true;
    }

    store.dispatch(NavigationStateActions.popRoute());
    return true;
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
