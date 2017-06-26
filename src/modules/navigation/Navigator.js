import {StackNavigator} from 'react-navigation';

import SettingsViewContainer from '../settings/SettingsViewContainer';
import HomeViewContainer from '../home/HomeViewContainer';
import ActivityViewContainer from '../activity/main/ActivityViewContainer';
import SubActivityViewContainer from '../activity/sub/SubActivityViewContainer';
import ThumbVoteViewContainer from '../activity/thumbs/ThumbVoteViewContainer';
import RecordViewContainer from '../activity/record/RecordViewContainer';
import MoodViewContainer from '../moods/MoodViewContainer';
import NewRoundContainer from '../NewRoundContainer';
import EndingViewContainer from '../EndingViewContainer';

const AppNavigator = StackNavigator({
  Settings: {screen: SettingsViewContainer},
  Home: {screen: HomeViewContainer},
  Activity: {screen: ActivityViewContainer},
  SubActivity: {screen: SubActivityViewContainer},
  ThumbVote: {screen: ThumbVoteViewContainer},
  RecordView: {screen: RecordViewContainer},
  MoodView: {screen: MoodViewContainer},
  NewRound: {screen: NewRoundContainer},
  Ending: {screen: EndingViewContainer}
});

export default AppNavigator;
