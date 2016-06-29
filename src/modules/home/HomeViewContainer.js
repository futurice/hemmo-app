import {connect} from 'react-redux';
//import {pushRoute} from '../../modules/navigation/NavigationState';
import HomeView from './HomeView';

export default connect(
  state => ({
    kids: state.getIn(['home', 'kids']),
    currentUser: state.getIn(['home', 'currentUser'])
  })
)(HomeView);
