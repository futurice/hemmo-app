import {connect} from 'react-redux';
import MainActivityView from './MainActivityView';

export default connect(
  state => ({
    chosenActivity: state.getIn(['activity', 'chosenActivity'])
  })
)(MainActivityView);
