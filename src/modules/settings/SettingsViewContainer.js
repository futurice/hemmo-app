import {connect} from 'react-redux';
import SettingsView from './SettingsView';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading']),
  })
)(SettingsView);
