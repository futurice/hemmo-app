import React from 'react';
import { StackNavigator } from 'react-navigation';
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
  Home: { screen: HomeViewContainer, navigationOptions: { header: null } },
  Login: { screen: LoginViewContainer },
  Settings: { screen: SettingsViewContainer },
  FeedbackMenu: { screen: FeedbackMenu, navigationOptions: { header: null } },
  Activity: { screen: ActivityViewContainer },
  Mood: { screen: MoodViewContainer },
  FreeWord: { screen: FreeWordViewContainer },
  Record: { screen: RecordViewContainer },
  Write: { screen: WriteViewContainer },
  Ending: { screen: EndingViewContainer },
});

export default AppNavigator;
