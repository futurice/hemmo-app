import React from 'react';
import { StackNavigator } from 'react-navigation';
import FeedbackMenu from './FeedbackMenu';
import HomeViewContainer from '../HomeViewContainer';
import LoginViewContainer from '../LoginViewContainer';
import SettingsViewContainer from '../settings/SettingsViewContainer';
import ActivityViewContainer from '../ActivityViewContainer';
import FreeWordViewContainer from '../FreeWordViewContainer';
import MoodViewContainer from '../MoodViewContainer';
import EndingViewContainer from '../EndingViewContainer';
import NavigationModal from './NavigationModal';
import BackButton from './BackButton';
import Hemmo from './Hemmo';

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeViewContainer },
    Login: { screen: LoginViewContainer },
    Settings: { screen: SettingsViewContainer },
    FeedbackMenu: { screen: FeedbackMenu },
    Activity: { screen: ActivityViewContainer },
    Mood: { screen: MoodViewContainer },
    FreeWord: { screen: FreeWordViewContainer },
    Ending: { screen: EndingViewContainer },
  },
  {
    navigationOptions: ({ navigation }) => ({
      // Only show navigation modal button in feedback menu screen
      headerLeft:
        navigation.state.routeName === 'FeedbackMenu'
          ? <NavigationModal />
          : undefined,
      headerRight: <Hemmo navigation={navigation} />,
      headerStyle: { backgroundColor: '#FFFFFF' },
    }),
  },
);

export default AppNavigator;
