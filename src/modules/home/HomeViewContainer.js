import {connect} from 'react-redux';
//import {pushRoute} from '../../modules/navigation/NavigationState';
import HomeView from './HomeView';

export default connect(
  state => ({
    users: state.getIn(['home', 'users']),
    currentUser: state.getIn(['home', 'currentUser'])
  })
)(HomeView);
