import { StackNavigator } from 'react-navigation';
import HomeViewContainer from '../home/HomeViewContainer';
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
  Settings: { screen: SettingsViewContainer },
  Activity: { screen: ActivityViewContainer },
  SubActivity: { screen: SubActivityViewContainer },
  ThumbVote: { screen: ThumbVoteViewContainer },
  RecordView: { screen: RecordViewContainer },
  MoodView: { screen: MoodViewContainer },
  NewRound: { screen: NewRoundContainer },
  Ending: { screen: EndingViewContainer },
};

const routerConfig = {
  headerMode: 'none',
};

const AppNavigator = StackNavigator(routes, routerConfig);

export default AppNavigator;
