import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import * as UserState from '../../../modules/user/UserState';
import {getSize, getImage} from '../../../services/graphics';
import Hemmo from '../../../components/Hemmo';

import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';

var styles = require('./subStyles.js');

const SubActivityView = React.createClass({

  propTypes: {
    chosenMainActivity: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired,
    closeSubActivities: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired
  },

  closeSubActivities() {
    this.props.closeSubActivities();
  },

  chooseActivity(subActivity, subIndex) {
    this.props.dispatch(
      UserState.saveAnswer(this.props.activityIndex, 'sub', subIndex)
    );

    if (subActivity === 'Muuta') {
      this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
    }
    else {
      this.props.dispatch(NavigationState.pushRoute({key: 'Thumbs', allowReturn: true}));
    }
  },

  render() {
    var n = this.props.chosenMainActivity.get('subActivities').size;
    var ratio;
    var margin;

    if (n < 8) {
      ratio = 0.3; margin = 20;
    }
    else {ratio = 0.27;}

    const subActivityViews = this.props.chosenMainActivity.get('subActivities').map((subActivity, index) => (
      <View
        key={subActivity}
        style={styles.activityBlock}>
          <TouchableHighlight
            style={{borderRadius: getSize('ympyra_keski', ratio).height / 2}}
            onPress={this.chooseActivity.bind(this, subActivity, index)}>
            <Image
              source={getImage('ympyra_keski')}
              key={subActivity}
              style={[styles.activityCircle, getSize('ympyra_keski', ratio)]}>
                  <Text style={styles.activityFont}>
                    {subActivity}
                  </Text>
            </Image>
          </TouchableHighlight>
      </View>
    ));

    return (
      <Image source={getImage('tausta_levea')} style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{this.props.chosenMainActivity.get('key')}</Text>
        </View>
        <View style={styles.activityBar}>
          <View style={[styles.subActivities, {marginHorizontal: margin}]}>
            {subActivityViews}
          </View>
          <View style={styles.hemmo}>
            <Hemmo image={'hemmo_keski'} size={0.5}/>
          </View>
        </View>
        <TouchableOpacity onPress={this.closeSubActivities} style={[styles.closeButton, getSize('nappula_rasti', 0.1)]}>
          <Image
            source={getImage('nappula_rasti')}
            onPress={this.closeSubActivities}
            style={[getSize('nappula_rasti', 0.1)]}/>
        </TouchableOpacity>
      </Image>
    );
  }
});

export default SubActivityView;
