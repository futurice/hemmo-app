import React, {PropTypes} from 'react';
import {
  Navigator
} from 'react-native';
import AppRouter from '../AppRouter';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import HomeViewContainer from '../home/HomeViewContainer';

const NavigationView = React.createClass({
  propTypes: {
    router: PropTypes.func.isRequired,
    navigationState: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    viewUserProfile: PropTypes.func.isRequired
  },

  renderScene(route, navigator) {
    this.navigator = navigator;
    console.log('ROUTE ' + route.key);
    if (route.key === 'Home') {
      return <HomeViewContainer
        onNavigate={this.props.onNavigate}
        viewUserProfile={this.props.viewUserProfile}/>;
    }
    else if (route.key === 'Settings') {
      return <SettingsViewContainer onNavigate={this.props.onNavigate}/>;
    }
    return null;
  },

  render() {
    // TODO: Nimeä paremmin, vielä jotain testi nimiä käytössä
    var index = this.props.navigationState.index;
    var testi = this.props.navigationState.children;

    return (
      <Navigator
        initialRoute={{key: 'Home', index: 0}}
        renderScene={(route, nav) => this.renderScene(testi[index], nav)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  }
});

export default NavigationView;
