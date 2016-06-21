import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading']),
  })
)(HomeView);
