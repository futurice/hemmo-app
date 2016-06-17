import {connect} from 'react-redux';
import SettingsView from './SettingsView';

export default connect(
  state => ({
    loading: state.getIn(['counter', 'loading']),
  })
)(SettingsView);
