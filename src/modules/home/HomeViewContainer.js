import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    users: state.getIn(['settings', 'users']),
    currentUser: state.getIn(['settings', 'currentUser']),
    shouldHide: state.getIn(['home', 'shouldHide']),
    currentViewIndex: state.getIn(['navigationState', 'index'])
  })
)(HomeView);
