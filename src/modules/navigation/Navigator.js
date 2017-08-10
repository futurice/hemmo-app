import React from 'react';
import { StackNavigator } from 'react-navigation';
import BackButton from './BackButton';
import FeedbackMenu from './FeedbackMenu';
import HomeViewContainer from '../HomeViewContainer';
import LoginViewContainer from '../LoginViewContainer';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import ActivityViewContainer from '../ActivityViewContainer';
import FreeWordViewContainer from '../FreeWordViewContainer';
import RecordViewContainer from '../RecordViewContainer';
import WriteViewContainer from '../WriteViewContainer';
import MoodViewContainer from '../MoodViewContainer';
import EndingViewContainer from '../EndingViewContainer';

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeViewContainer,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  Settings: {
    screen: SettingsViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  FeedbackMenu: {
    screen: FeedbackMenu,
    navigationOptions: {
      header: null,
    },
  },
  Activity: {
    screen: ActivityViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  Mood: {
    screen: MoodViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  FreeWord: {
    screen: FreeWordViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  Record: {
    screen: RecordViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  Write: {
    screen: WriteViewContainer,
    navigationOptions: {
      headerLeft: <BackButton />,
    },
  },
  Ending: {
    screen: EndingViewContainer,
    navigationOptions: {
      headerLeft: null,
    },
  },
});

export default AppNavigator;
