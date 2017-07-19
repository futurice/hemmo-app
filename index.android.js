import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, { Component } from 'react';
import { setConfiguration } from './src/utils/configuration';
import { AppRegistry, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';

class Hemmo extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);

    if (__DEV__) {
      setConfiguration('API_ROOT', 'http://localhost:3001');
    } else {
      setConfiguration('API_ROOT', 'https://hemmo.pelastakaalapset.fi:3888');
    }
  }

  navigateBack = () => {
    const navigationState = store.getState().get('navigatorState');

    const currentStackScreen = navigationState.get('index');
    const currentTab = navigationState.getIn(['routes', 0, 'index']);

    if (currentTab !== 0 || currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
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
