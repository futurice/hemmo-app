import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    loading: state.getIn(['home', 'loading']),
    kids: state.getIn(['home', 'kids']),
  })
)(HomeView);
