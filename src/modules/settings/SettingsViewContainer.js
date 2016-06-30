import {connect} from 'react-redux';
import SettingsView from './SettingsView';

export default connect(
  state => ({
    loading: state.getIn(['home', 'loading']),
    users: state.getIn(['home', 'users']),
    userImage: state.getIn(['settings', 'userImage']),
    currentUser: state.getIn(['home', 'currentUser'])
  })
)(SettingsView);
