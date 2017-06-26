import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './Navigator';

const mapStateToProps = state => ({
  navigatorState: state.get('navigatorState').toJS()
});

@connect(mapStateToProps)
class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  render() {
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigatorState
          })
        }
      />
    );
  }
}

export default NavigatorView;
