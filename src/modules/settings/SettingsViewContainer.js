import {connect} from 'react-redux';
import SettingsView from './SettingsView';

export default connect(
  state => ({
    loading: state.getIn(['home', 'loading']),
    kids: state.getIn(['home, kids']),
  })
)(SettingsView);
