import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Navigator
} from 'react-native';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import HomeViewContainer from '../home/HomeViewContainer';
import ActivityViewContainer from '../activity/main/ActivityViewContainer';
import ThumbVoteViewContainer from '../activity/thumbs/ThumbVoteViewContainer';
import RecordViewContainer from '../activity/record/RecordViewContainer';
import MoodViewContainer from '../moods/MoodViewContainer';
import NewRound from '../NewRoundContainer';
import EndingView from '../EndingViewContainer';

var routesWithKeys = [
  {'key': 'Home', 'route': <HomeViewContainer/>},
  {'key': 'Settings', 'route': <SettingsViewContainer/>},
  {'key': 'Activity', 'route': <ActivityViewContainer/>},
  {'key': 'Record', 'route': <RecordViewContainer/>},
  {'key': 'Thumbs', 'route': <ThumbVoteViewContainer/>},
  {'key': 'NewRound', 'route': <NewRound/>},
  {'key': 'Moods', 'route': <MoodViewContainer/>},
  {'key': 'End', 'route': <EndingView/>}
];

const NavigationViewContainer = React.createClass({
  propTypes: {
    router: PropTypes.func.isRequired,
    navigationState: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  //TODO: Move to AppRouter somehow
  renderScene(route, navigator) {
    this.navigator = navigator;

    for (var i = 0; i < routesWithKeys.length; i++) {
      if (routesWithKeys[i].key === route.key) {
        return routesWithKeys[i].route;
      }
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
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }
});

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS()
  }),
  dispatch => ({
    onNavigate(action) {
      // The "back" and "BackAction" actions are fired from NavigationExperimental when
      // the user swipes the screen back or uses the software back button, respectively.
      // We handle these and dispatch our custom back action to our Redux stack.
      //
      // Android back button is handled separately in index.android.js
      if (action.type === 'back' || action.type === 'BackAction') {
        dispatch(popRoute());
      } else if (action.type === 'animation-completed') {
        dispatch(navigationCompleted());
      }
    }
  })
)(NavigationViewContainer);
