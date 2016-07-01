import {connect} from 'react-redux';
//import {pushRoute} from '../../modules/navigation/NavigationState';
import HomeView from './HomeView';

export default connect(
  state => ({
    users: state.getIn(['settings', 'users']),
    currentUser: state.getIn(['settings', 'currentUser'])
  })
)(HomeView);
