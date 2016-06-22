import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    kids: state.getIn(['home', 'kids']),
  })
)(HomeView);
