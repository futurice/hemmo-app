import React, { Component } from 'react';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { StackRouter, addNavigationHelpers } from 'react-navigation';
import HomeViewContainer from '../home/HomeViewContainer';
import LoginViewContainer from '../login/LoginViewContainer';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import ActivityViewContainer from '../activity/main/ActivityViewContainer';
import SubActivityViewContainer from '../activity/sub/SubActivityViewContainer';
import ThumbVoteViewContainer from '../activity/thumbs/ThumbVoteViewContainer';
import RecordViewContainer from '../activity/record/RecordViewContainer';
import MoodViewContainer from '../moods/MoodViewContainer';
import NewRoundContainer from '../NewRoundContainer';
import EndingViewContainer from '../EndingViewContainer';

const routes = {
  Home: { screen: HomeViewContainer },
  Login: { screen: LoginViewContainer },
  Settings: { screen: SettingsViewContainer },
  Activity: { screen: ActivityViewContainer },
  SubActivity: { screen: SubActivityViewContainer },
  ThumbVote: { screen: ThumbVoteViewContainer },
  Record: { screen: RecordViewContainer },
  Mood: { screen: MoodViewContainer },
  NewRound: { screen: NewRoundContainer },
  Ending: { screen: EndingViewContainer },
};

const routerConfig = {
  headerMode: 'none',
  initialRouteName: 'Home',
  transitionConfig: () => ({
    screenInterpolator: (sceneProps) => {
      // Disable the transition animation when resetting to the home screen
      if (
        sceneProps.index === 0 &&
        sceneProps.scene.route.routeName !== 'Home' &&
        sceneProps.scenes.length > 2
      ) return null;

      // Otherwise, use the usual horizontal animation
      return CardStackStyleInterpolator.forHorizontal(sceneProps);
    },
  }),
};

const Router = StackRouter(routes, routerConfig);

class AppNavigator extends Component {
  static router = Router;

  render() {
    const { state, dispatch } = this.props.navigation;
    const { routes, index } = state;

    // Figure out what to render based on the navigation state and the router:
    const Screen = Router.getComponentForState(state);

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch, state: routes[index] };
    // If we want, we can also tinker with the dispatch function here, to limit
    // or augment our children's actions

    // Assuming our children want the convenience of calling .navigate() and so on,
    // we should call addNavigationHelpers to augment our navigation prop:
    childNavigation = addNavigationHelpers(childNavigation);

    return <Screen navigation={childNavigation} />;
  }
}

export default AppNavigator;
