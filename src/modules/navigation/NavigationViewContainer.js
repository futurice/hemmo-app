import {connect} from 'react-redux';
import {popRoute, pushRoute, navigationCompleted} from './NavigationState';
import NavigationView from './NavigationView';
import * as SettingsState from '../../modules/settings/SettingsState';

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS()
  }),
  dispatch => ({
    onNavigate(action) {
      // The "back" and "BackAction" actions are fired from NavigationExperimental when
      // the user swipes the screen back or uses the software back button, respectively.
      // We handle these and dispatch our custom back action to our Redux stack.
      //
      // Android back button is handled separately in index.android.js
      if (action.type === 'back' || action.type === 'BackAction') {
        console.log('TRYING TO GO BACK!!');
        dispatch(popRoute());
      } else if (action.type === 'animation-completed') {
        console.log('ANIMATION COMPLETED');
        dispatch(navigationCompleted());
      }
    },
    viewUserProfile(index) {
      dispatch(SettingsState.setCurrentUser(index));
      dispatch(pushRoute({key: 'Settings', index: 1}));
    }
  })
)(NavigationView);
