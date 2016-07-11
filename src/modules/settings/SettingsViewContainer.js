import {connect} from 'react-redux';
import SettingsView from './SettingsView';

export default connect(
  state => ({
    loading: state.getIn(['home', 'loading']),
    users: state.getIn(['user', 'users']),
    currentUser: state.getIn(['user', 'currentUser'])
  })
)(SettingsView);
