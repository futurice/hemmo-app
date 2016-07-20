import React, {PropTypes} from 'react';
import {
  Navigator
} from 'react-native';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import HomeViewContainer from '../home/HomeViewContainer';
import ActivityViewContainer from '../activity/main/ActivityViewContainer';
import ThumbVoteViewContainer from '../activity/thumbs/ThumbVoteViewContainer';
import RecordViewContainer from '../activity/record/RecordViewContainer';
import EmotionViewContainer from '../emotions/EmotionViewContainer';
import NewRound from '../activity/NewRound';
import EndingView from '../EndingView';

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
    else if (route.key === 'Record') {
      return <RecordViewContainer/>;
    }
    else if (route.key === 'Thumbs') {
      return <ThumbVoteViewContainer/>;
    }
    else if (route.key === 'NewRound') {
      return <NewRound/>;
    }
    else if (route.key === 'Emotions') {
      return <EmotionViewContainer/>;
    }
    else if (route.key === 'End') {
      return <EndingView/>;
    }
    return null;
  },

  render() {
    var index = this.props.navigationState.index;
    var routes = this.props.navigationState.children;

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
