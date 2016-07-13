import React, {PropTypes} from 'react';
import {
  Navigator
} from 'react-native';
import AppRouter from '../AppRouter';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import FeedbackViewContainer from '../feedback/FeedbackViewContainer';
import HomeViewContainer from '../home/HomeViewContainer';
import ActivityViewContainer from '../activity/ActivityViewContainer';

const NavigationView = React.createClass({
  propTypes: {
    router: PropTypes.func.isRequired,
    navigationState: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  //TODO: Move to AppRouter somehow
  renderScene(route, navigator) {
    this.navigator = navigator;
    if (route.key === 'Home') {
      return <HomeViewContainer onNavigate={this.props.onNavigate}/>;
    }
    else if (route.key === 'Settings') {
      return <SettingsViewContainer onNavigate={this.props.onNavigate}/>;
    }
    else if (route.key === 'Activity') {
      return <ActivityViewContainer onNavigate={this.props.onNavigate}/>;
    }
    else if (route.key === 'Feedback') {
      return <FeedbackViewContainer onNavigate={this.props.onNavigate}/>;
    }
    return null;
  },

  render() {
    var index = this.props.navigationState.index;
    var routes = this.props.navigationState.children;

    /* TODO: Add animation */
    return (
      <Navigator
        initialRoute={{key: 'Home', index: 0}}
        renderScene={(route, nav) => this.renderScene(routes[index], nav)}
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
