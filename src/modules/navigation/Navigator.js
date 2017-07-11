import React from 'react';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import { StackNavigator, TabNavigator } from 'react-navigation';
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
import NavigationModal from '../../components/NavigationModal';

const HomeNavigator = StackNavigator(
  {
    Home: { screen: HomeViewContainer },
    Login: { screen: LoginViewContainer },
    Settings: { screen: SettingsViewContainer },
  }, {
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
  },
);

const FeedbackNavigator = TabNavigator(
  {
    Activity: { screen: ActivityViewContainer },
    // SubActivity: { screen: SubActivityViewContainer },
    ThumbVote: { screen: ThumbVoteViewContainer },
    Mood: { screen: MoodViewContainer },
    Record: { screen: RecordViewContainer },
    Ending: { screen: EndingViewContainer },
    // NewRound: { screen: NewRoundContainer },
  }, {
    initialRouteName: 'Activity',
    swipeEnabled: true,
    lazy: true,
    backBehavior: 'none',
    navigationOptions: {
      tabBarVisible: false,
    },
  },
);

const FeedbackNavigatorWithHeader = StackNavigator(
  {
    FeedbackWithHeader: {
      screen: FeedbackNavigator,
      navigationOptions: {
        header: <NavigationModal />,
      },
    },
  },
);

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeNavigator },
    Feedback: {
      screen: FeedbackNavigatorWithHeader,
    },
  }, { headerMode: 'none', initialRouteName: 'Home' },
);

export default AppNavigator;
