import {connect} from 'react-redux';
import MainActivityView from './MainActivityView';

export default connect(
  state => ({
    showSubActivities: state.getIn(['activity', 'showSubActivities']),
    subActivities: state.getIn(['activity', 'subActivities'])
  })
)(MainActivityView);
