import {connect} from 'react-redux';
import MainActivityView from './MainActivityView';

export default connect(
  state => ({
    showSubActivities: state.getIn(['activity', 'showSubActivities']),
    chosenActivity: state.getIn(['activity', 'chosenActivity']),
    currentViewIndex: state.getIn(['navigationState', 'index'])
  })
)(MainActivityView);
